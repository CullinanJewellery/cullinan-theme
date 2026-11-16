/*
  Policy pages (/policies/*), 2026-11-16, owner: "make it look good ... the font the same as ours".

  Shopify renders a policy as one title and plain paragraphs, so the owner's text arrives as <p> blocks whose first
  line is the section heading and whose other lines are joined by <br>. This script, run straight after the content
  (no flash), rebuilds that into:
    - a blush header band: eyebrow, title, „Последна актуализация“;
    - a table of contents (sticky on computers, a drop-down on phones) when there are three or more headings;
    - sections with real headings, bullet and numbered lists, linked emails and websites;
    - a closing block from the <template id="cj-policy-extra"> printed by layout/theme.liquid.
  Without JavaScript the page stays Shopify's own, which is readable.

  A line is a heading when it is short (up to 80 characters), has no colon, does not end in punctuation and does not
  start with "- ". "## " in front (Markdown pasted by mistake) is dropped. A long line with no end punctuation is a
  hard-wrapped line and is joined to the next one.
*/
(function () {
  var container = document.querySelector('.shopify-policy__container');
  var rte = container && container.querySelector('.shopify-policy__body .rte');
  if (!rte || container.dataset.cjPolicy) return;
  container.dataset.cjPolicy = '1';

  var titleEl = container.querySelector('.shopify-policy__title h1');
  var title = titleEl ? titleEl.textContent.trim() : document.title;

  var END = /[.;:,!?…][)»“"]?$/;
  var isList = function (s) { return /^[-–•]\s+/.test(s); };
  var isNum = function (s) { return /^\d+\.\s+\S/.test(s); };
  var isHeading = function (s) {
    s = s.replace(/^##\s*/, '');
    return s.length > 0 && s.length <= 80 && s.indexOf(':') === -1 && !END.test(s) && !isList(s);
  };

  // 1. Paragraphs into logical lines.
  var blocks = [];
  Array.prototype.forEach.call(rte.children, function (p) {
    var parts = p.innerHTML.split(/<br\s*\/?>/i).map(function (h) {
      var d = document.createElement('div');
      d.innerHTML = h;
      return d.textContent.replace(/\s+/g, ' ').trim();
    }).filter(Boolean);
    if (!parts.length) return;
    var lines = [];
    parts.forEach(function (s) {
      var prev = lines[lines.length - 1];
      var wrapped = prev && prev.length > 80 && !END.test(prev) && !isList(s) && !isNum(s);
      var listCont = prev && (isList(prev) || isNum(prev)) && !isHeading(prev) && !END.test(prev) && !isList(s) && !isNum(s) && !isHeading(s);
      if (wrapped || listCont) lines[lines.length - 1] = prev + ' ' + s;
      else lines.push(s);
    });
    blocks.push(lines);
  });

  // 2. Lines into sections.
  var meta = '';
  var sections = [];
  var current = { heading: null, num: null, items: [] };
  var pushSection = function () {
    if (current.heading || current.items.length) sections.push(current);
  };
  blocks.forEach(function (lines, bi) {
    lines.forEach(function (line, li) {
      if (/^Последна актуализация/i.test(line)) { meta = line; return; }
      var raw = line.replace(/^##\s*/, '');
      var startsBlock = li === 0;
      if (isHeading(line) && (startsBlock || /^##/.test(line))) {
        // A first line that only repeats the page title is dropped.
        if (bi === 0 && raw.toLowerCase() === title.toLowerCase() && !sections.length && !current.items.length) return;
        pushSection();
        var m = raw.match(/^(\d+)\.\s+(.*)$/);
        current = { heading: m ? m[2] : raw, num: m ? m[1] : null, items: [] };
        return;
      }
      if (isList(line)) {
        var last = current.items[current.items.length - 1];
        var text = line.replace(/^[-–•]\s+/, '');
        if (last && last.type === 'ul') last.lines.push(text);
        else current.items.push({ type: 'ul', lines: [text] });
        return;
      }
      if (isNum(line)) {
        var lastO = current.items[current.items.length - 1];
        var mm = line.match(/^(\d+)\.\s+(.*)$/);
        if (lastO && lastO.type === 'ol') lastO.lines.push(mm[2]);
        else current.items.push({ type: 'ol', start: mm[1], lines: [mm[2]] });
        return;
      }
      current.items.push({ type: 'p', text: line, newBlock: startsBlock });
    });
  });
  pushSection();
  if (!sections.length) return;

  // 3. Text with links.
  var esc = function (s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  var linkify = function (s) {
    return esc(s)
      .replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g, '<a href="mailto:$1">$1</a>')
      .replace(/\b((?:https?:\/\/)?www\.[A-Za-z0-9.-]+\.[a-z]{2,}(?:\/[^\s<)]*)?)/g, function (u) {
        var href = /^https?:/.test(u) ? u : 'https://' + u;
        return '<a href="' + href + '" target="_blank" rel="noopener">' + u + '</a>';
      })
      .replace(/(^|[\s(])(https?:\/\/(?!www\.)[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  };
  var slug = function (i) { return 'razdel-' + (i + 1); };

  // 4. Build.
  var html = '';
  var withToc = sections.filter(function (s) { return s.heading; }).length >= 3;
  sections.forEach(function (s, i) {
    html += '<section class="cj-policy__section"' + (s.heading ? ' id="' + slug(i) + '"' : '') + '>';
    if (s.heading) {
      html += '<h2 class="cj-policy__heading">' +
        (s.num ? '<span class="cj-policy__num">' + (s.num.length < 2 ? '0' + s.num : s.num) + '</span>' : '') +
        esc(s.heading) + '</h2>';
    }
    s.items.forEach(function (it) {
      if (it.type === 'p') html += '<p>' + linkify(it.text) + '</p>';
      else if (it.type === 'ul') html += '<ul class="cj-policy__list">' + it.lines.map(function (l) { return '<li>' + linkify(l) + '</li>'; }).join('') + '</ul>';
      else html += '<ol class="cj-policy__steps"' + (it.start && it.start !== '1' ? ' style="--cj-start:' + it.start + '"' : '') + '>' +
        it.lines.map(function (l) { return '<li>' + linkify(l) + '</li>'; }).join('') + '</ol>';
    });
    html += '</section>';
  });

  var toc = '';
  if (withToc) {
    toc = '<nav class="cj-policy__toc" aria-label="Съдържание"><details class="cj-policy__toc-details">' +
      '<summary class="cj-policy__toc-label">Съдържание</summary><ol class="cj-policy__toc-list">';
    sections.forEach(function (s, i) {
      if (s.heading) toc += '<li><a href="#' + slug(i) + '">' + esc(s.heading) + '</a></li>';
    });
    toc += '</ol></details></nav>';
  }

  var extraTpl = document.getElementById('cj-policy-extra');
  var extra = extraTpl ? extraTpl.innerHTML : '';

  var page = document.createElement('div');
  page.className = 'cj-policy' + (withToc ? ' cj-policy--toc' : '');
  page.innerHTML =
    '<header class="cj-policy__hero color-scheme-2 gradient"><div class="page-width">' +
      '<p class="cj-policy__eyebrow">Поръчки и условия</p>' +
      '<h1 class="cj-policy__title">' + esc(title) + '</h1>' +
      (meta ? '<p class="cj-policy__meta">' + esc(meta) + '</p>' : '') +
    '</div></header>' +
    '<div class="cj-policy__layout page-width">' + toc +
      '<article class="cj-policy__article">' + html + '</article>' +
    '</div>' + extra;

  container.replaceWith(page);

  // 5. Table of contents: open on computers, closed on phones; the section in view is marked.
  var details = page.querySelector('.cj-policy__toc-details');
  if (details) {
    var mq = window.matchMedia('(min-width: 990px)');
    var sync = function () { details.open = mq.matches; };
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    page.querySelectorAll('.cj-policy__toc-list a').forEach(function (a) {
      a.addEventListener('click', function () { if (!mq.matches) details.open = false; });
    });
    if ('IntersectionObserver' in window) {
      var links = {};
      page.querySelectorAll('.cj-policy__toc-list a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          Object.keys(links).forEach(function (k) { links[k].classList.toggle('is-active', k === e.target.id); });
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      page.querySelectorAll('.cj-policy__section[id]').forEach(function (s) { io.observe(s); });
    }
  }
})();
