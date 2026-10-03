/*
  Keeps the hidden colour option in step with the material the shopper can see
  (snippets/product-variant-picker.liquid, 2026-10-03).

  The colour row is not drawn on a product whose material names its colours, but the
  colour is still part of every variant. Each visible value carries the ids of both
  ("materialId,colourId" in data-option-value-id), so a pick always asks Shopify for
  the matching variant. The one case that leaves it alone is the page's own first
  paint: Shopify loads the first available variant, and nothing says its colour is the
  one its material stands for. The bracelet loads on "14К жълто злато" with a rose
  colour, so a shopper who changed nothing would put a variant in the bag that reads
  yellow gold in the picker and rose in the cart.

  The picker prints the colour the loaded variant has (data-hidden-selected-value-id).
  When that is not the colour the checked material stands for, this asks for the right
  variant the way a click would: one change event on <variant-selects>, which Dawn's
  own <product-info> answers by fetching the variant and redrawing the page. The event
  goes to <variant-selects> itself, not to the radio, so <option-menu> never sees it
  and does not open the list. It runs once per page load: if Shopify had no variant for
  the pair, asking again would only loop.
*/

(() => {
  let done = false;

  function sync() {
    if (done) return;
    const root = document.querySelector('variant-selects[data-hidden-selected-value-id]');
    if (!root) return;

    const checked = Array.from(root.querySelectorAll('fieldset input:checked')).find((input) =>
      (input.dataset.optionValueId || '').includes(',')
    );
    if (!checked) return;

    const wanted = checked.dataset.optionValueId.split(',')[1];
    if (!wanted || wanted === root.dataset.hiddenSelectedValueId) return;

    done = true;
    root.dispatchEvent(new Event('change', { bubbles: true }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(sync, 0));
  } else {
    setTimeout(sync, 0);
  }
})();
