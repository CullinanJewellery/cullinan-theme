# Builds the Shopify product import file (CSV) for every finished piece (2026-11-22).
# Owner, 2026-11-22: upload all ready pieces, active, names from docs/product-names.md, descriptions like
# moonmagic's (one short paragraph to the customer, then "Детайли"). Only confirmed facts (CLAUDE.md
# "Facts the site may state"; weights and stones from docs/weights-and-sizes.md); unknown values are left out.
# Photos are already in Shopify Files (tools/upload-copies.cjs, uploaded 2026-11-22) and are referenced by URL.
# Existing products keep their handle (and price); new ones get a Latin handle.
# Usage: python -X utf8 tools/products-csv.py [handle ...]  -> tools/out/products.csv (only those handles if given)
import csv, os, sys

CDN = 'https://cdn.shopify.com/s/files/1/1071/8553/7364/files/'
UPLOAD = os.path.join(os.path.dirname(__file__), '..', '_upload')
FILES = set(os.listdir(UPLOAD)) if os.path.isdir(UPLOAD) else set()

M = {  # material value (exact, Cyrillic К), colour value, file-name metal
    'y': ('14К жълто злато', 'жълто злато', 'zhalto'),
    'w': ('14К бяло злато', 'бяло злато', 'byalo'),
    'r': ('14К розово злато', 'розово злато', 'rozovo'),
    'yw': ('14К жълто и бяло злато', 'жълто злато', 'zhalto-byalo'),
    'rw': ('14К розово и бяло злато', 'розово злато', 'rozovo-byalo'),
}
GOLD = ['y', 'w', 'r']
SIZES = ['53', '54', '55', '56', '57', '58', '59', '60']
MADE = {'Пръстен': 'Изработен на ръка в нашето ателие', 'Кръст': 'Изработен на ръка в нашето ателие',
        'Висулка': 'Изработена на ръка в нашето ателие', 'Гривна': 'Изработена на ръка в нашето ателие',
        'Брошка': 'Изработена на ръка в нашето ателие', 'Игла за вратовръзка': 'Изработена на ръка в нашето ателие',
        'Обеци': 'Изработени на ръка в нашето ателие'}
CATEGORY = {'Пръстен': 'Apparel & Accessories > Jewelry > Rings',
            'Кръст': 'Apparel & Accessories > Jewelry > Charms & Pendants',
            'Висулка': 'Apparel & Accessories > Jewelry > Charms & Pendants',
            'Обеци': 'Apparel & Accessories > Jewelry > Earrings',
            'Гривна': 'Apparel & Accessories > Jewelry > Bracelets'}

P = []  # products


def add(handle, title, kind, files, text, details=(), weight=None, stone=None, stone_count=None,
        stone_size=None, dims=None, metals=GOLD, sizes=None, stones=None, price=0, tags=(), opt=None,
        chain=None, extra_opt=None):
    """files: file-name stem before the metal, e.g. '01-prasten-s-topcheta'.
    stones: list of (value, stem) when the stone is an option (stem replaces files for that stone)."""
    P.append(dict(handle=handle, title=title, kind=kind, files=files, text=text, details=list(details),
                  weight=weight, stone=stone, stone_count=stone_count, stone_size=stone_size, dims=dims,
                  metals=metals, sizes=sizes, stones=stones, price=price, tags=list(tags),
                  opt=opt or {}, chain=chain if chain is not None else kind in ('Висулка', 'Кръст'),
                  extra_opt=extra_opt))


NAME_DAY = 'Подарък и за имен ден на 17 септември – Вяра, Надежда, Любов и София.'

# ---------------------------------------------------------------- rings
add('пръстен-с-топчета', 'Мъниста', 'Пръстен', '01-prasten-s-topcheta',
    'Редица златни мъниста, които обикалят пръста без край. Мъниста е за жената, която обича простите неща, '
    'направени добре – пръстен за всеки ден, който с времето става част от вас.',
    weight='1,30', sizes=['52'] + SIZES, opt={'size': 'Изберете вашия размер'})
add('пръстен-с-топки', 'Зърна', 'Пръстен', '02-prasten-s-granulatsiya',
    'Ситни златни зърна, подредени едно до друго – старата техника на гранулацията в нежен, съвременен пръстен. '
    'Носете го самостоятелно или до любимите си пръстени.',
    weight='1,00', sizes=SIZES, price=111)
add('пръстен-с-топчета-и-камъни', 'Роса', 'Пръстен', '03-prasten-s-kamacheta',
    'Пет искрящи камъчета между златни мъниста, като капки роса сутрин. Роса е малък повод за радост всеки път, '
    'когато погледнете ръката си.',
    stone='Циркон', stone_count=5, stone_size='2 мм', sizes=SIZES, tags=['Циркон'])
add('пръстен-с-камъче', 'Искра', 'Пръстен', '04-prasten-s-edin-kamak',
    'Един камък, една искра. Чист и ясен пръстен за жената, която няма нужда от много, за да бъде забелязана.',
    stone='Циркон', stone_count=1, stone_size='3,5 мм', sizes=SIZES, tags=['Циркон'],
    opt={'size': 'Размер', 'metal': 'Материал'})
add('спираловиден-пръстен', 'Вихър', 'Пръстен', '05-prasten-spirala',
    'Златото се извива около камъка като лек вихър и го прегръща от двете страни. Пръстен с движение, '
    'който стои живо на ръката.',
    stone='Циркон', stone_count=1, stone_size='2,5 мм', sizes=SIZES, price=200, tags=['Циркон'])
add('двоен-пръстен', 'Заедно', 'Пръстен', '10-prasten-s-dve-halki',
    'Две линии, които се срещат в един камък. Заедно е подарък за двама – за годишнина, за обещание '
    'или за спомен от един ден.',
    details=['Централен циркон: 2,75 мм', 'Странични циркони: 1,25 мм'], weight='2,10', stone='Циркон',
    stone_size='2,75 мм и 1,25 мм', sizes=SIZES, tags=['Циркон'])
add('sazvezdie-prasten', 'Съзвездие', 'Пръстен', '11-prasten-s-kamak-v-sredata',
    'Една ярка звезда и малките светлини около нея. Съзвездие е подарък за момент, който искате да запомните – '
    'или напомняне, че и вие светите.',
    details=['Централен циркон: 3,5 мм', 'Странични циркони: 1,5 мм и 1,25 мм'], stone='Циркон',
    stone_size='3,5 мм, 1,5 мм и 1,25 мм', sizes=SIZES, tags=['Циркон'])
add('korona-prasten', 'Корона', 'Пръстен', None,
    'Шест тънки зъба държат камъка високо, като малка корона. Изберете бял, зелен или червен камък – '
    'според това кой цвят разказва за вас.',
    stones=[('Бял циркон', '22-prasten-s-shest-zaba'), ('Зелен камък', '22-prasten-s-shest-zaba-zelen-kamak'),
            ('Червен камък', '22-prasten-s-shest-zaba-cherven-kamak')],
    stone_count=1, sizes=SIZES, tags=['Циркон'])

# ---------------------------------------------------------------- crosses (old handles; see changelog for the match)
add('подсечен-кръст', 'Вяра', 'Кръст', '08-gladak-krast',
    'Гладко полирано злато и чисти линии – кръст без излишна украса. Вяра е за всеки ден и за важните дни: '
    'за кръщене, за рожден ден или за самата вас. ' + NAME_DAY,
    dims='Дължина: 23,9 мм', price=340)
add('малък-кръст', 'Надежда', 'Кръст', '09-malak-krast',
    'Малък кръст с изящни ръбове, които улавят светлината. Надежда е нежен знак, който се носи близо до сърцето – '
    'подходящ и за първия кръст на едно дете. ' + NAME_DAY,
    dims='Дължина: 21 мм', price=160)
add('м-кръст', 'Любов', 'Кръст', '06-krast-s-kant',
    'Разширяващи се рамена, очертани с тънък златен кант. Любов е подарък, който казва повече от думи – '
    'за майка, дъщеря или приятелка. ' + NAME_DAY,
    dims='Дължина: 22,6 мм с халкичката')
add('кръст-две-лица', 'София', 'Кръст', '07-dvustranen-krast',
    'Два образа в един кръст: от едната страна Разпятието, от другата – Богородица. София е мъдростта '
    'вярата да е винаги с вас. ' + NAME_DAY,
    details=['Двустранен'], weight='1,68', dims='Дължина: 25 мм', price=300)
add('molitva-krast', 'Молитва', 'Кръст', '23-novi-krastove-pravoslaven-krast',
    'Православен кръст в класическата си форма, изработен в злато. Молитва е за онези, за които вярата '
    'е нещо лично и тихо.', weight='1,66')
add('spasi-i-sahrani-krast', 'Спаси и съхрани', 'Кръст', '23-novi-krastove-razpyatie',
    'Разпятие с надписа „Спаси и сохрани“ на гърба – молитва, която носите със себе си. Плътен, солиден кръст, '
    'направен да остане за цял живот.', weight='5,80')
add('blyasak-krast', 'Блясък', 'Кръст', '23-novi-krastove-krast-s-sharka',
    'Ситна гравирана шарка покрива рамената и улавя светлината при всяко движение. Блясък е кръст, '
    'който искри без нито един камък.', weight='1,40')

# ---------------------------------------------------------------- zodiacs
Z = [  # sign, genitive, people, openwork handle, openwork price, coin handle, coin price, file slug, openwork weight, coin weight
    ('Овен', 'Овена', 'смелите, които първи правят крачката', 'овен-ажур', 253, 'овен-монета', 200, 'oven', '1,47', '0,80'),
    ('Телец', 'Телеца', 'верните и постоянните', 'телец-ажур', 0, 'телец-монета', 0, 'telets', '1,50', '0,82'),
    ('Близнаци', 'Близнаците', 'любопитните, с лек дух', 'близнаци-ажурен', 260, 'близнаци-монета', 140, 'bliznatsi', '1,45', '0,98'),
    ('Рак', 'Рака', 'хората, за които домът и близките са на първо място', 'rak-azhur', 0, 'rak-moneta', 0, 'rak', '1,28', None),
    ('Лъв', 'Лъва', 'хората с голямо и щедро сърце', 'лъв-ажурен', 222, 'лъв-ажур', 200, 'lav', '1,38', '0,87'),
    ('Дева', 'Девата', 'хората, които обичат нещата да са направени както трябва', 'дева-ажур', 243, 'дева-монета', 0, 'deva', '1,48', '0,81'),
    ('Везни', 'Везните', 'хората, които търсят хармония във всичко', 'везни-ажур', 200, None, 0, 'vezni', '1,30', None),
    ('Скорпион', 'Скорпиона', 'страстните и дълбоките натури', 'скорпион-ажурен', 261, 'скорпион-монета', 0, 'skorpion', '1,35', '0,75'),
    ('Стрелец', 'Стрелеца', 'свободните духом, винаги на път', 'стрелец-ажур', 0, 'стрелец-монета', 0, 'strelets', '1,40', '0,87'),
    ('Козирог', 'Козирога', 'упоритите, които стигат до върха', 'козирог-ажур', 245, 'козирог-монета', 200, 'kozirog', None, '0,80'),
    ('Водолей', 'Водолея', 'мечтателите с нови идеи', 'водолек-ажур', 233, None, 0, 'vodoley', '1,53', None),
    ('Риби', 'Рибите', 'нежните души, които мечтаят', 'риби-ажурен', 264, 'риби-монета', 200, 'ribi', '1,61', '0,90'),
]
for sign, gen, people, oh, op, ch, cp, slug, ow, cw in Z:
    add(oh, f'{sign} – ажур', 'Висулка', f'12-zodii-{slug}-azhuren',
        f'Знакът на {gen} – за {people}. Знакът стои в средата на ажурна рамка с мотив меандър, през която минава '
        'светлината. Личен знак и красив подарък за рожден ден.', weight=ow, price=op, tags=['Зодии', sign])
    if ch:
        add(ch, f'{sign} – монета', 'Висулка', f'12-zodii-{slug}-moneta',
            f'Малък плътен медальон със знака на {gen} – за {people}. Носете го всеки ден, самостоятелно '
            'или заедно с друга висулка.', weight=cw, price=cp, tags=['Зодии', sign])

# ---------------------------------------------------------------- pendants (13)
V = '13-novi-visulki-'
add('angel-visulka', 'Ангел', 'Висулка', V + 'angel',
    'Малък ангел пазител, който да е винаги до вас. Подарък за кръщене, за рожден ден или за човек, '
    'за когото се грижите.', weight='1,17')
add('bogoroditsa-azhurna', 'Богородица – ажурна', 'Висулка', V + 'bogoroditsa-azhurna',
    'Образът на Богородица в ажурна златна рамка, през която минава светлината. Закрила, която се носи '
    'до сърцето.', weight='1,40')
add('bogoroditsa-golyam-medalyon', 'Богородица – голям медальон', 'Висулка', V + 'bogoroditsa-golyam-medalyon',
    'Плътен медальон с образа на Богородица, с ясни и дълбоки детайли. Бижу, което може да се предава '
    'от майка на дъщеря.', weight='3,30')
add('bogoroditsa-malak-medalyon', 'Богородица – малък медальон', 'Висулка', V + 'bogoroditsa-malak-medalyon',
    'Малък медальон с образа на Богородица – дискретен и подходящ за всеки ден.', weight='0,84')
add('bogoroditsa-s-oreol', 'Богородица – с ореол', 'Висулка', V + 'bogoroditsa-s-oreol',
    'Богородица, обградена от сияещ ореол. Нежен знак на вяра и закрила за жената, която я носи.')
add('detelina-visulka', 'Детелина', 'Висулка', V + 'detelina',
    'Детелината – стар знак за късмет. Малък подарък с голямо пожелание.', weight='1,15')
add('kolibri-visulka', 'Колибри', 'Висулка', V + 'kolibri',
    'Колибрито – малко, бързо и винаги в движение. Висулка за жената, която носи радост навсякъде, '
    'където отиде.', weight='1,70')
add('pchela-visulka', 'Пчела', 'Висулка', V + 'pchela',
    'Пчелата – знак за труд, сладост и дом. Малко златно бижу с много характер.', weight='1,43')
add('darvo-beli-lista', 'Дърво – бели листа', 'Висулка', V + 'darvo-s-beli-lista',
    'Дървото на живота с листа в бяло злато. Знак за корени, растеж и семейство.', weight='1,56')
add('darvo-vazel', 'Дърво – възел', 'Висулка', V + 'darvo-s-vazel',
    'Дървото на живота, чиито клони се преплитат във възел – връзката, която държи едно семейство заедно.',
    weight='0,88')
add('darvo-sartsa', 'Дърво – сърца', 'Висулка', V + 'darvo-sas-sartsa',
    'Дървото на живота, разцъфнало в малки сърца. Подарък за майка, баба или за човек, който пази '
    'семейството цяло.', weight='1,33')
add('kurshum-visulka', 'Куршум', 'Висулка', '27-visulka-kurshum',
    'Смела, плътна висулка с връх, покрит с искрящи циркони. За мъж или жена с характер.',
    weight='4,50', stone='Циркон', dims='Дължина: около 4–4,5 см', tags=['Циркон'])

# ---------------------------------------------------------------- sets
SETS = [
    # name, folder stem, kinds -> (weight, extra details), stone, text per kind, tags
    ('Луна', 'luna', '14-komplekt-s-perla', 'Перла', ['Перла'], {
        'visulka': ('1,14', 'Бяла перла, обгърната от злато – спокойна и светла като луната. Носете я сама или с '
                            'обеците и пръстена от комплекта Луна.'),
        'obetsi': ('2,40', 'Две бели перли в злато, които осветяват лицето. Част от комплекта Луна – с висулка '
                           'и пръстен.'),
        'prasten': ('1,90', 'Бяла перла, държана от три тънки златни зъба, като цвете, което се разтваря. Част от '
                            'комплекта Луна.')}),
    ('Жар', 'zhar', '15-komplekt-s-cherven-kamak', 'Червен циркон', ['Циркон'], {
        'visulka': ('1,20', 'Червен камък в цвят рубин, топъл като жар. Част от комплекта Жар – с обеци и пръстен.'),
        'obetsi': ('3,70', 'Два червени камъка в цвят рубин, които дават цвят на лицето. Част от комплекта Жар.'),
        'prasten': (None, 'Червен камък в цвят рубин върху тънка златна халка – малко огън за всеки ден. Част от '
                          'комплекта Жар.')}),
    ('Листопад', 'listopad', '16-komplekt-s-lista', None, [], {
        'visulka': (None, 'Златни листа, някои в бяло, с малки искрящи камъчета – есенен вятър, уловен в злато. '
                          'Част от комплекта Листопад.'),
        'obetsi': (None, 'Златни листа с малки искрящи камъчета, които се движат с вас. Част от комплекта '
                         'Листопад.'),
        'prasten': (None, 'Венец от златни и бели листа с малки искрящи камъчета около пръста. Част от комплекта '
                          'Листопад.')}),
    ('Цвят', 'tsvyat', '17-komplekt-s-venchelistche', None, [], {
        'visulka': ('1,35', 'Златни венчелистчета, които се разтварят около един искрящ камък. Част от комплекта '
                            'Цвят – с обеци и пръстен.'),
        'obetsi': ('3,16', 'Златни венчелистчета около искрящ камък – нежни обеци за всеки ден. Част от комплекта '
                           'Цвят.'),
        'prasten': ('2,20', 'Двата края на халката се разминават и обгръщат искрящ камък като венчелистчета. Част от '
                            'комплекта Цвят.')}),
    ('Капка', 'kapka', '18-komplekt-s-kamak-v-obkov', None, [], {
        'visulka': ('0,70', 'Един камък в гладък златен обков – чист и спокоен като капка вода. Част от комплекта '
                            'Капка – с обеци и пръстен.'),
        'obetsi': ('1,65', 'Малки обеци с камък в гладък златен обков – за всеки ден и за всеки повод. Част от '
                           'комплекта Капка.'),
        'prasten': (None, 'Камък в гладък златен обков върху тънка халка – просто и красиво. Част от комплекта '
                          'Капка.')}),
]
KIND = {'visulka': ('Висулка', 'висулка'), 'obetsi': ('Обеци', 'обеци'), 'prasten': ('Пръстен', 'пръстен')}
for name, slug, stem, stone, tags, parts in SETS:
    for part, (w, text) in parts.items():
        kind, word = KIND[part]
        add(f'{slug}-{part}', f'{name} – {word}', kind, f'{stem}-{part}', text, weight=w, stone=stone,
            sizes=SIZES if part == 'prasten' else None, tags=tags + ['Комплекти'])
for part, w in (('visulka', '3,00'), ('obetsi', '3,95'), ('prasten', '2,70')):
    kind, word = KIND[part]
    text = {'visulka': 'Златен кръг и бял полумесец около искрящ камък – две орбити, които се срещат. Част от '
                       'комплекта Орбита – с обеци и пръстен.',
            'obetsi': 'Кръг и полумесец около искрящ камък, в две злата. Обеци, които се забелязват. Част от '
                      'комплекта Орбита.',
            'prasten': 'Кръг и полумесец в две злата обгръщат искрящ камък. Пръстен с характер, част от комплекта '
                       'Орбита.'}[part]
    add(f'orbita-{part}', f'Орбита – {word}', kind, f'21-komplekt-s-kragove-{part}', text, weight=w,
        metals=['yw', 'w', 'rw'], sizes=SIZES if part == 'prasten' else None, tags=['Комплекти'])
for part, w in (('visulka', '1,65'), ('obetsi', None)):
    kind, word = KIND[part]
    text = {'visulka': 'Цвете с осем венчелистчета и камък в средата – мотив, познат от българската шевица и резба. '
                       'Изберете бял, зелен или червен камък.',
            'obetsi': 'Малки цветя с осем венчелистчета и камък в средата. Изберете бял, зелен или червен камък – '
                      'и към тях висулката Розетка.'}[part]
    s = f'25-komplekt-tsvete-{part}'
    add(f'rozetka-{part}', f'Розетка – {word}', kind, None, text, weight=w,
        stones=[('Бял камък', s + '-byal-kamak'), ('Зелен камък', s + '-zelen-kamak'),
                ('Червен камък', s + '-cherven-kamak')], tags=['Комплекти'])

# ---------------------------------------------------------------- red cord bracelets (gold only)
RC = [('01-dve-sartsa', 'две сърца', 'две сърца, които вървят заедно', '0,65', None),
      ('02-malak-krast', 'малък кръст', 'вярата, винаги с вас', '0,46', None),
      ('03-krast-s-mrezha', 'кръст с мрежа', 'закрила, изплетена в злато', '0,64', None),
      ('04-krast-s-kamak', 'кръст с камък', 'вяра с малка искра', '0,74', 'Циркон'),
      ('05-darvo-na-zhivota', 'дърво на живота', 'корените и семейството', '0,74', None),
      ('06-dalag-gladak-krast', 'дълъг кръст', 'простата сила на вярата', '0,98', None),
      ('07-krast-s-dvoyna-liniya', 'кръст с двойна линия', 'пътят, който извървявате', '0,94', None),
      ('08-plochka', 'плочка', 'знак, който е само ваш', '0,85 / 1,05', None),
      ('09-krast-s-shiroki-ramena', 'кръст с широки рамена', 'опора в трудни дни', '0,74', None),
      ('10-sartse', 'сърце', 'любов, която се носи на китката', '0,56', None),
      ('11-bezkraynost', 'безкрайност', 'нещо, което е завинаги', '0,61', None),
      ('12-stapki', 'стъпки', 'първите стъпки – подарък за млада майка', '0,63', None),
      ('13-tsvete-s-kamak', 'цвете', 'цвете, което никога не вехне', '0,71', 'Циркон'),
      ('14-azhuren-krast', 'ажурен кръст', 'лека, ажурна вяра', '0,60', None)]
for stem, word, meaning, w, stone in RC:
    extra = None
    dims = None
    if stem == '08-plochka':
        extra = ('Плочка', ['18 мм', '21 мм'])
        dims = 'Плочка: 18,3 мм или 21,3 мм'
    add(f'cherven-konets-{stem[3:]}', f'Червен конец – {word}', 'Гривна', f'19-grivni-s-cherven-konets-{stem}',
        f'Червеният конец от векове се връзва за здраве и закрила. Златният знак върху него казва нещо лично: '
        f'{meaning}.', weight=w, stone=stone, dims=dims, extra_opt=extra,
        tags=['Червен конец'] + (['Циркон'] if stone else []))

# ---------------------------------------------------------------- others
add('dantela-grivna', 'Дантела', 'Гривна', '20-azhurna-grivna',
    'Ажурна златна гривна, изплетена като дантела. Бижу, което се забелязва, изработено изцяло на ръка.',
    weight='12,00')
add('pandelka-broshka', 'Панделка', 'Брошка', '24-broshki-pandelka-s-kamak',
    'Златна панделка с един искрящ камък – като завършек на подарък. Закачете я на сако, палто или шал.',
    weight='2,80', dims='Дължина: около 5 см', stone_count=1)
add('roza-broshka', 'Роза', 'Брошка', '24-broshki-roza',
    'Златна роза с бял полумесец от шест искрящи камъчета. Брошка, която прави и най-простото палто празнично.',
    weight='3,00', dims='Дължина: около 5 см', stone_count=6)
add('igla-za-vratovrazka', 'Игла за вратовръзка', 'Игла за вратовръзка', '26-igla-za-vratovrazka',
    'Изчистена златна игла с един циркон – за мъжа, който обръща внимание на детайла. Подарък за сватба, '
    'кръщене или важен ден.', stone='Циркон', stone_count=1, tags=['Циркон'])


# ---------------------------------------------------------------- build
def photos(stem, metal):
    tag = M[metal][2]
    out = sorted(f for f in FILES if f.startswith(f'{stem}-{tag}-') and f[len(stem) + len(tag) + 2:][:2].isdigit())
    return out


def body(p):
    lines = ['Злато 14К (585), с проба' if p['metals'] == GOLD else 'Злато 14К (585) в два цвята, с проба']
    if p['stone'] and not p['stone_size']:
        lines.append(f"Камък: {p['stone'].lower() if p['stone'] != 'Циркон' else 'циркон'}"
                     + (f" ({p['stone_count']})" if p['stone_count'] and p['stone_count'] > 1 else ''))
    elif p['stone']:
        if not p['details']:
            n = p['stone_count']
            lines.append(f"{'Циркони' if n and n > 1 else 'Циркон'}: {p['stone_size']}"
                         + (f' ({n} броя)' if n and n > 1 else ''))
    if p['stones']:
        lines.append('Камък по избор: ' + ', '.join(v[0].lower() + v[1:] for v, _ in p['stones']))
    lines += p['details']
    if p['weight']:
        lines.append(f"Тегло: {p['weight']} г")
    if p['dims']:
        lines.append(p['dims'])
    if p['kind'] == 'Гривна' and p['files'] and 'cherven-konets' in p['files']:
        lines.append('Златен знак на червен конец')
    lines.append(MADE[p['kind']])
    if p['chain']:
        lines.append('Продава се без верижка')
    lines.append('Пристига в кутия, с индивидуален сертификат')
    return f"<p>{p['text']}</p>\n<p><strong>Детайли</strong></p>\n<ul>\n" + \
        ''.join(f'<li>{l}</li>\n' for l in lines) + '</ul>'


HEAD = ['Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags', 'Published', 'Status',
        'Option1 Name', 'Option1 Value', 'Option1 Linked To', 'Option2 Name', 'Option2 Value', 'Option2 Linked To',
        'Option3 Name', 'Option3 Value', 'Option3 Linked To', 'Variant SKU', 'Variant Price',
        'Variant Inventory Policy', 'Variant Fulfillment Service', 'Variant Requires Shipping', 'Variant Taxable',
        'Variant Image', 'Image Src', 'Image Position', 'Image Alt Text',
        'Метал (product.metafields.custom.metal)', 'Проба (product.metafields.custom.proba)',
        'Тегло (г) (product.metafields.custom.weight_g)', 'Камък (product.metafields.custom.stone)',
        'Брой камъни (product.metafields.custom.stone_count)',
        'Размер на камъка (product.metafields.custom.stone_size)', 'Размери (product.metafields.custom.dimensions)']
COLOR_LINK = ''  # a CSV cannot link Color to shopify.color-pattern (the import fails or ignores it); the theme hides Color by name


def rows(p):
    o = p['opt']
    opts = []  # (name, values, linked)
    if p['sizes']:
        opts.append((o.get('size', 'Ring size'), p['sizes'], ''))
    if p['extra_opt']:
        opts.append((p['extra_opt'][0], p['extra_opt'][1], ''))
    if p['stones']:
        opts.append(('Камък', [s for s, _ in p['stones']], ''))
    opts.append((o.get('metal', 'Jewelry material'), [M[m][0] for m in p['metals']], ''))
    color = len(opts) < 3  # Shopify allows three options; Корона (size, stone, metal) has no colour row
    if color:
        opts.append(('Color', None, COLOR_LINK))  # values follow the material
    # variants
    combos = [[]]
    for name, vals, _ in opts[:-2 if color else -1]:
        combos = [c + [v] for c in combos for v in vals]
    variants = []
    stems = dict(p['stones']) if p['stones'] else None
    for c in combos:
        for m in p['metals']:
            mv = [M[m][0], M[m][1]] if color else [M[m][0]]
            stone_val = next((v for v in c if stems and v in stems), None)
            stem = stems[stone_val] if stone_val else p['files']
            ph = photos(stem, m)
            variants.append((c + mv, ph[0] if ph else ''))
    # images: by stone, then metal; alt = the material value
    imgs = []
    for stem in ([s for _, s in p['stones']] if p['stones'] else [p['files']]):
        for m in p['metals']:
            for f in photos(stem, m):
                imgs.append((f, M[m][0]))
    assert imgs, p['handle']
    out = []
    n = max(len(variants), len(imgs))
    for i in range(n):
        r = dict.fromkeys(HEAD, '')
        r['Handle'] = p['handle']
        if i == 0:
            r.update({'Title': p['title'], 'Body (HTML)': body(p), 'Vendor': 'Cullinan Jewelry',
                      'Product Category': CATEGORY.get(p['kind'], ''), 'Type': p['kind'], 'Tags': ', '.join(p['tags']),
                      'Published': 'TRUE', 'Status': 'active',
                      'Метал (product.metafields.custom.metal)': 'Злато 14К',
                      'Проба (product.metafields.custom.proba)': '585',
                      'Тегло (г) (product.metafields.custom.weight_g)': p['weight'] or '',
                      'Камък (product.metafields.custom.stone)': (p['stone'] or ''),
                      'Брой камъни (product.metafields.custom.stone_count)': str(p['stone_count'] or ''),
                      'Размер на камъка (product.metafields.custom.stone_size)': p['stone_size'] or '',
                      'Размери (product.metafields.custom.dimensions)': (p['dims'] or '').replace('Дължина: ', '')})
            for k, (name, _, link) in enumerate(opts, 1):
                r[f'Option{k} Name'] = name
                r[f'Option{k} Linked To'] = link
        if i < len(variants):
            vals, vimg = variants[i]
            for k, v in enumerate(vals, 1):
                r[f'Option{k} Value'] = v
            r.update({'Variant Price': f"{p['price']:.2f}", 'Variant Inventory Policy': 'continue',
                      'Variant Fulfillment Service': 'manual', 'Variant Requires Shipping': 'TRUE',
                      'Variant Taxable': 'FALSE', 'Variant Image': CDN + vimg if vimg else ''})
        if i < len(imgs):
            r.update({'Image Src': CDN + imgs[i][0], 'Image Position': str(i + 1), 'Image Alt Text': imgs[i][1]})
        out.append(r)
    return out


if __name__ == '__main__':
    only = set(sys.argv[1:])
    handles = [p['handle'] for p in P]
    assert len(handles) == len(set(handles)), 'duplicate handle'
    os.makedirs(os.path.join(os.path.dirname(__file__), 'out'), exist_ok=True)
    path = os.path.join(os.path.dirname(__file__), 'out', 'products.csv')
    n = 0
    with open(path, 'w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, HEAD)
        w.writeheader()
        for p in P:
            if only and p['handle'] not in only:
                continue
            w.writerows(rows(p))
            n += 1
    print(n, 'products ->', path)
