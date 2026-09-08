/* ==============================================
   LUQMA — WhatsApp Restaurant Ordering Demo
   Complete application logic
   ============================================== */

'use strict';

/* ─────────────────────────────────────────────
   DOM References
   ───────────────────────────────────────────── */
const chatEl     = document.getElementById('conversation');
const screenEl   = document.getElementById('screen');
const backEl     = document.getElementById('back');
const resetEl    = document.getElementById('resetChat');
const timeEl     = document.getElementById('deviceTime');
const batLvlEl   = document.getElementById('batteryLevel');
const batTxtEl   = document.getElementById('batteryText');

/* ─────────────────────────────────────────────
   Product Catalog
   ───────────────────────────────────────────── */
const PRODUCTS = [
  { id: 'burger',        name: 'Burger',        nameAr: 'برجر',         price: 23,   type: 'burger',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=85' },
  { id: 'pizza',         name: 'Pizza',         nameAr: 'بيتزا',        price: 16,   priceRange: '16–23', type: 'pizza',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=85' },
  { id: 'cola',          name: 'Cola',          nameAr: 'كولا',         price: 3,    type: 'drink',
    img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=500&q=85' },
  { id: 'pepsi',         name: 'Pepsi',         nameAr: 'بيبسي',        price: 3,    type: 'drink',
    img: 'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=500&q=85' },
  { id: 'sprite',        name: 'Sprite',        nameAr: 'سبرايت',       price: 3,    type: 'drink',
    img: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=500&q=85' },
  { id: 'dew',           name: 'Mountain Dew',  nameAr: 'ماونتن ديو',   price: 3,    type: 'drink',
    img: 'assets/mountain-dew.png' },
  { id: 'kenza',         name: 'Kenza',         nameAr: 'كينزا',        price: 2.5,  type: 'drink',
    img: 'assets/kenza.png' },
  { id: 'water',         name: 'Water',         nameAr: 'ماء',          price: 1,    type: 'simple',
    img: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=85' },
  { id: 'fries',         name: 'Fries',         nameAr: 'بطاطس',        price: 5,    type: 'simple',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85' },
  { id: 'special-fries', name: 'Special Fries', nameAr: 'بطاطس خاصة',   price: 15,   type: 'simple',
    img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=85' },
  { id: 'salad',         name: 'Salad',         nameAr: 'سلطة',         price: 14,   type: 'simple',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=85' },
  { id: 'ranch-sauce',   name: 'Ranch Sauce',   nameAr: 'صوص رانش',     price: 2.5,  type: 'simple',
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=85' },
  { id: 'garlic-sauce',  name: 'Garlic Sauce',  nameAr: 'صوص ثوم',      price: 2.5,  type: 'simple',
    img: 'https://images.unsplash.com/photo-1472476442910-2a035643b3e9?auto=format&fit=crop&w=500&q=85' },
  { id: 'spicy-sauce',   name: 'Spicy Sauce',   nameAr: 'صوص حار',      price: 2.5,  type: 'simple',
    img: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=85' },
];

/* ─────────────────────────────────────────────
   Burger Customization Options
   ───────────────────────────────────────────── */
const BURGER_OPTS = {
  cheese: [
    { id: 'none',    name: 'No cheese',     nameAr: 'بدون جبن',    price: 0 },
    { id: 'regular', name: 'Regular cheese', nameAr: 'جبن عادي',    price: 0, def: true },
    { id: 'extra',   name: 'Extra cheese',   nameAr: 'جبن إكسترا',  price: 2 },
  ],
  spice: [
    { id: 'mild',    name: 'Mild',    nameAr: 'خفيف' },
    { id: 'regular', name: 'Regular', nameAr: 'عادي',  def: true },
    { id: 'max',     name: 'Max',     nameAr: 'حار' },
  ],
  addons: [
    { id: 'extra-patty', name: 'Extra beef patty', nameAr: 'قطعة لحم إضافية', price: 5.5 },
  ],
  removals: [
    { id: 'no-tomato', name: 'No tomato', nameAr: 'بدون طماطم' },
    { id: 'no-onion',  name: 'No onion',  nameAr: 'بدون بصل' },
    { id: 'no-sauce',  name: 'No sauce',  nameAr: 'بدون صوص' },
  ],
};

/* ─────────────────────────────────────────────
   Pizza Customization Options
   ───────────────────────────────────────────── */
const PIZZA_OPTS = {
  flavors: [
    { id: 'pepperoni',     name: 'Pepperoni',     nameAr: 'بيبروني',   def: true },
    { id: 'margherita',    name: 'Margherita',    nameAr: 'مارغريتا' },
    { id: 'chicken-ranch', name: 'Chicken Ranch', nameAr: 'دجاج رانش' },
    { id: 'four-cheese',   name: 'Four Cheese',   nameAr: 'أربع أجبان' },
  ],
  sizes: [
    { id: 'small',  name: 'Small',  nameAr: 'صغير', price: 16 },
    { id: 'medium', name: 'Medium', nameAr: 'وسط',  price: 19, def: true },
    { id: 'large',  name: 'Large',  nameAr: 'كبير', price: 23 },
  ],
  spice: [
    { id: 'mild',    name: 'Mild',    nameAr: 'خفيف' },
    { id: 'regular', name: 'Regular', nameAr: 'عادي',  def: true },
    { id: 'max',     name: 'Max',     nameAr: 'حار' },
  ],
  addons: [
    { id: 'mozzarella', name: 'Mozzarella', nameAr: 'موزاريلا', price: 3 },
    { id: 'sausage',    name: 'Sausage',    nameAr: 'سجق',      price: 4 },
    { id: 'chicken',    name: 'Chicken',    nameAr: 'دجاج',     price: 5 },
    { id: 'olives',     name: 'Olives',     nameAr: 'زيتون',    price: 2 },
  ],
};

/* ─────────────────────────────────────────────
   Drink Ice Options
   ───────────────────────────────────────────── */
const ICE_OPTS = [
  { id: 'regular', name: 'Regular ice', nameAr: 'ثلج عادي', def: true },
  { id: 'no-ice',  name: 'No ice',      nameAr: 'بدون ثلج' },
  { id: 'extra',   name: 'Extra ice',   nameAr: 'ثلج إكسترا' },
];

/* ─────────────────────────────────────────────
   Application State
   ───────────────────────────────────────────── */
let cart = [];            // { cartId, productId, qty, options, unitPrice }
let nextCartId = 1;
let lang = null;          // 'ar' | 'en'
let mode = 'welcome';    // welcome | language | catalog | items | customize | cart | checkout | payment | done
let editingCartId = null; // cart item id being edited, or null

/* ─────────────────────────────────────────────
   Utility Helpers
   ───────────────────────────────────────────── */
const getProduct = (id) => PRODUCTS.find(p => p.id === id);
const pName = (p) => lang === 'ar' ? p.nameAr : p.name;
const oName = (o) => lang === 'ar' ? o.nameAr : o.name;
const ar = () => lang === 'ar';
const t = (arText, enText) => ar() ? arText : enText;
const dir = () => ar() ? 'rtl' : 'ltr';

function money(n) {
  const num = Number(n);
  if (num === Math.floor(num)) return num + ' SAR';
  return num.toFixed(2) + ' SAR';
}

function now() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/* ─────────────────────────────────────────────
   Cart Helpers
   ───────────────────────────────────────────── */
function getSimpleCartItem(productId) {
  return cart.find(c => c.productId === productId);
}

function productCartQty(productId) {
  return cart.filter(c => c.productId === productId).reduce((sum, c) => sum + c.qty, 0);
}

function cartTotalItems() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

function cartTotalPrice() {
  return cart.reduce((sum, c) => sum + c.unitPrice * c.qty, 0);
}

function calcBurgerPrice(options) {
  let price = 23;
  const cheese = BURGER_OPTS.cheese.find(o => o.id === options.cheese);
  if (cheese) price += (cheese.price || 0);
  if (options.addons) {
    for (const aid of options.addons) {
      const addon = BURGER_OPTS.addons.find(a => a.id === aid);
      if (addon) price += (addon.price || 0);
    }
  }
  // Spice and removals are free
  return price;
}

function calcPizzaPrice(options) {
  const size = PIZZA_OPTS.sizes.find(s => s.id === options.size);
  let price = size ? size.price : 19;
  if (options.addons) {
    for (const aid of options.addons) {
      const addon = PIZZA_OPTS.addons.find(a => a.id === aid);
      if (addon) price += (addon.price || 0);
    }
  }
  // Flavor and spice are free
  return price;
}

/* ─────────────────────────────────────────────
   Device Status Bar
   ───────────────────────────────────────────── */
function updateDeviceStatus() {
  timeEl.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (navigator.getBattery) {
    navigator.getBattery().then(b => {
      const lvl = Math.round(b.level * 100);
      batTxtEl.textContent = '';
      batLvlEl.style.width = lvl + '%';
      batLvlEl.classList.toggle('charging', b.charging);
    });
  } else {
    batLvlEl.style.width = '85%';
  }
}

/* ─────────────────────────────────────────────
   Chat Bubble
   ───────────────────────────────────────────── */
function bubble(html, type = 'incoming') {
  const el = document.createElement('div');
  el.className = 'bubble ' + type;
  el.innerHTML = html + '<span class="meta">' + now() + (type === 'outgoing' ? ' ✓✓' : '') + '</span>';
  chatEl.appendChild(el);
  requestAnimationFrame(() => {
    chatEl.scrollTop = chatEl.scrollHeight;
  });
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2200);
}

/* ─────────────────────────────────────────────
   Screen: Composer (initial text input)
   ───────────────────────────────────────────── */
function showComposer() {
  mode = 'welcome';
  screenEl.innerHTML =
    '<form class="composer" onsubmit="return false">' +
      '<button type="button" class="emoji-btn" aria-label="Emoji">☺</button>' +
      '<input id="msgInput" autocomplete="off" placeholder="Type a message">' +
      '<button type="button" class="send-btn" aria-label="Send">➤</button>' +
    '</form>';

  const input = screenEl.querySelector('#msgInput');
  const sendBtn = screenEl.querySelector('.send-btn');

  function handleSend(e) {
    e.preventDefault();
    e.stopPropagation();
    const text = input.value.trim();
    if (!text) return;
    bubble(text, 'outgoing');
    input.value = '';
    showLanguagePrompt();
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSend(e);
  });

  setTimeout(function() { input.focus(); }, 100);
}

/* ─────────────────────────────────────────────
   Screen: Language Prompt
   ───────────────────────────────────────────── */
function showLanguagePrompt() {
  mode = 'language';
  bubble(
    '<b>أهلاً بك في لقمة 👋</b><br>' +
    'وش اللغة اللي تفضلها؟<br><br>' +
    '<b>Welcome to Luqma 👋</b><br>' +
    'Which language do you prefer?' +
    '<div class="lang-btns">' +
      '<button data-lang="ar">العربية</button>' +
      '<button data-lang="en">English</button>' +
    '</div>'
  );
}

/* ─────────────────────────────────────────────
   Screen: Welcome + Catalog Card
   ───────────────────────────────────────────── */
function showWelcome() {
  mode = 'catalog';
  const pizza = getProduct('pizza');
  bubble(t(
    '<b>أهلاً بك في لقمة 👋</b><br>تفضل هذا المنيو واختار اللي تشتهيه.',
    '<b>Hi! Welcome to Luqma 👋</b><br>Browse our menu below.'
  ));
  bubble(
    '<div class="catalog-card">' +
      '<img src="' + pizza.img + '" alt="Menu">' +
      '<div class="catalog-info">' +
        '<b>' + t('كل المنتجات', 'All Products') + '</b>' +
        '<small>' + PRODUCTS.length + ' ' + t('منتج', 'items') + '</small>' +
        '<p>' + t('تصفح جميع المنتجات من هنا.', 'Browse all our products here.') + '</p>' +
        '<button data-action="open-catalog">' + t('عرض المنتجات', 'View items') + '</button>' +
      '</div>' +
    '</div>'
  );
}

/* ─────────────────────────────────────────────
   Screen: Product Catalog
   ───────────────────────────────────────────── */
function showCatalog() {
  mode = 'items';
  var rows = '';

  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];
    var qty = productCartQty(p.id);
    var hasCustom = (p.type !== 'simple');
    var priceText = p.priceRange
      ? t('من ' + money(p.price), 'From ' + money(p.price))
      : money(p.price);

    if (hasCustom) {
      rows +=
        '<article class="product-row">' +
          '<img src="' + p.img + '" alt="' + p.name + '">' +
          '<div class="product-info">' +
            '<b>' + pName(p) + '</b>' +
            '<small>' + priceText + '</small>' +
          '</div>' +
          '<div class="product-actions">' +
            (qty > 0 ? '<span class="qty-badge">' + qty + '</span>' : '') +
            '<button class="add-btn" data-customize="' + p.id + '">' + t('إضافة +', 'Add +') + '</button>' +
          '</div>' +
        '</article>';
    } else {
      rows +=
        '<article class="product-row">' +
          '<img src="' + p.img + '" alt="' + p.name + '">' +
          '<div class="product-info">' +
            '<b>' + pName(p) + '</b>' +
            '<small>' + priceText + '</small>' +
          '</div>' +
          '<div class="qty-controls">' +
            '<button data-simple-minus="' + p.id + '">−</button>' +
            '<strong>' + qty + '</strong>' +
            '<button data-simple-plus="' + p.id + '">+</button>' +
          '</div>' +
        '</article>';
    }
  }

  screenEl.innerHTML =
    '<div class="catalog-panel" dir="' + dir() + '">' +
      '<div class="panel-header">' +
        '<b>' + t('كل المنتجات', 'All Products') + '</b>' +
        '<span>' + cartTotalItems() + ' ' + t('منتج', 'items') + '</span>' +
      '</div>' +
      '<div class="product-list">' + rows + '</div>' +
      '<button class="primary-btn" data-action="open-cart">' +
        t('عرض السلة', 'View cart') + ' · ' + money(cartTotalPrice()) +
      '</button>' +
    '</div>';
}

/* ─────────────────────────────────────────────
   Screen: Burger Customization
   ───────────────────────────────────────────── */
function showBurgerCustomize(existingOpts, editCartItemId) {
  mode = 'customize';
  editingCartId = editCartItemId || null;

  var opts = existingOpts || {
    cheese: 'regular',
    spice: 'regular',
    addons: [],
    removals: [],
    notes: ''
  };

  var price = calcBurgerPrice(opts);

  // Cheese
  var cheeseHtml = '';
  for (var i = 0; i < BURGER_OPTS.cheese.length; i++) {
    var o = BURGER_OPTS.cheese[i];
    var sel = opts.cheese === o.id;
    cheeseHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="radio" name="cheese" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + (o.price ? ' (+' + money(o.price) + ')' : '') + '</span>' +
      '</label>';
  }

  // Spice
  var spiceHtml = '';
  for (var i = 0; i < BURGER_OPTS.spice.length; i++) {
    var o = BURGER_OPTS.spice[i];
    var sel = opts.spice === o.id;
    spiceHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="radio" name="spice" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + '</span>' +
      '</label>';
  }

  // Addons
  var addonsHtml = '';
  for (var i = 0; i < BURGER_OPTS.addons.length; i++) {
    var o = BURGER_OPTS.addons[i];
    var sel = opts.addons && opts.addons.indexOf(o.id) >= 0;
    addonsHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="checkbox" name="addon" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + ' (+' + money(o.price) + ')</span>' +
      '</label>';
  }

  // Removals
  var removalsHtml = '';
  for (var i = 0; i < BURGER_OPTS.removals.length; i++) {
    var o = BURGER_OPTS.removals[i];
    var sel = opts.removals && opts.removals.indexOf(o.id) >= 0;
    removalsHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="checkbox" name="removal" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + '</span>' +
      '</label>';
  }

  var btnLabel = editingCartId
    ? t('حفظ التعديلات', 'Save changes')
    : t('أضف للسلة', 'Add to cart');

  screenEl.innerHTML =
    '<div class="customize-panel" data-product="burger" dir="' + dir() + '">' +
      '<div class="panel-header">' +
        '<b>' + t('تخصيص البرجر', 'Customize Burger') + '</b>' +
        '<span class="live-price">' + money(price) + '</span>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('الجبن', 'Cheese') + '</label>' +
        '<div class="option-chips">' + cheeseHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('مستوى البهارات', 'Spice Level') + '</label>' +
        '<div class="option-chips">' + spiceHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('إضافات', 'Add-ons') + '</label>' +
        '<div class="option-chips">' + addonsHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('حذف مكونات', 'Remove Ingredients') + '</label>' +
        '<div class="option-chips">' + removalsHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('ملاحظات', 'Notes') + '</label>' +
        '<textarea name="notes" class="notes-input" placeholder="' +
          t('مثال: صوص على جنب، بدون مخلل...', 'e.g. Sauce on the side, no pickles...') + '">' +
          (opts.notes || '') +
        '</textarea>' +
      '</div>' +

      '<button class="primary-btn" data-action="confirm-burger">' + btnLabel + ' · ' + money(price) + '</button>' +
      '<button class="link-btn" data-action="back-to-catalog">' + t('رجوع', 'Back') + '</button>' +
    '</div>';

  // Live price update on change
  screenEl.querySelector('.customize-panel').addEventListener('change', updateBurgerPriceDisplay);
}

function readBurgerOptions() {
  var panel = screenEl.querySelector('.customize-panel[data-product="burger"]');
  if (!panel) return null;

  var cheeseEl = panel.querySelector('input[name="cheese"]:checked');
  var spiceEl = panel.querySelector('input[name="spice"]:checked');
  var addonEls = panel.querySelectorAll('input[name="addon"]:checked');
  var removalEls = panel.querySelectorAll('input[name="removal"]:checked');
  var notesEl = panel.querySelector('.notes-input');

  var addons = [];
  for (var i = 0; i < addonEls.length; i++) addons.push(addonEls[i].value);
  var removals = [];
  for (var i = 0; i < removalEls.length; i++) removals.push(removalEls[i].value);

  return {
    cheese: cheeseEl ? cheeseEl.value : 'regular',
    spice: spiceEl ? spiceEl.value : 'regular',
    addons: addons,
    removals: removals,
    notes: notesEl ? notesEl.value : ''
  };
}

function updateBurgerPriceDisplay() {
  var opts = readBurgerOptions();
  if (!opts) return;
  var price = calcBurgerPrice(opts);

  var priceEl = screenEl.querySelector('.live-price');
  if (priceEl) priceEl.textContent = money(price);

  var btnLabel = editingCartId
    ? t('حفظ التعديلات', 'Save changes')
    : t('أضف للسلة', 'Add to cart');
  var btn = screenEl.querySelector('[data-action="confirm-burger"]');
  if (btn) btn.textContent = btnLabel + ' · ' + money(price);

  // Update chip selection visuals
  updateChipVisuals();
}

/* ─────────────────────────────────────────────
   Screen: Pizza Customization
   ───────────────────────────────────────────── */
function showPizzaCustomize(existingOpts, editCartItemId) {
  mode = 'customize';
  editingCartId = editCartItemId || null;

  var opts = existingOpts || {
    flavor: 'pepperoni',
    size: 'medium',
    spice: 'regular',
    addons: []
  };

  var price = calcPizzaPrice(opts);

  // Flavor
  var flavorHtml = '';
  for (var i = 0; i < PIZZA_OPTS.flavors.length; i++) {
    var o = PIZZA_OPTS.flavors[i];
    var sel = opts.flavor === o.id;
    flavorHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="radio" name="flavor" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + '</span>' +
      '</label>';
  }

  // Size
  var sizeHtml = '';
  for (var i = 0; i < PIZZA_OPTS.sizes.length; i++) {
    var o = PIZZA_OPTS.sizes[i];
    var sel = opts.size === o.id;
    sizeHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="radio" name="size" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + ' (' + money(o.price) + ')</span>' +
      '</label>';
  }

  // Spice
  var spiceHtml = '';
  for (var i = 0; i < PIZZA_OPTS.spice.length; i++) {
    var o = PIZZA_OPTS.spice[i];
    var sel = opts.spice === o.id;
    spiceHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="radio" name="spice" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + '</span>' +
      '</label>';
  }

  // Addons
  var addonsHtml = '';
  for (var i = 0; i < PIZZA_OPTS.addons.length; i++) {
    var o = PIZZA_OPTS.addons[i];
    var sel = opts.addons && opts.addons.indexOf(o.id) >= 0;
    addonsHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="checkbox" name="addon" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + ' (+' + money(o.price) + ')</span>' +
      '</label>';
  }

  var btnLabel = editingCartId
    ? t('حفظ التعديلات', 'Save changes')
    : t('أضف للسلة', 'Add to cart');

  screenEl.innerHTML =
    '<div class="customize-panel" data-product="pizza" dir="' + dir() + '">' +
      '<div class="panel-header">' +
        '<b>' + t('تخصيص البيتزا', 'Customize Pizza') + '</b>' +
        '<span class="live-price">' + money(price) + '</span>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('النكهة', 'Flavor') + '</label>' +
        '<div class="option-chips">' + flavorHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('الحجم', 'Size') + '</label>' +
        '<div class="option-chips">' + sizeHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('مستوى البهارات', 'Spice Level') + '</label>' +
        '<div class="option-chips">' + spiceHtml + '</div>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('إضافات', 'Add-ons') + '</label>' +
        '<div class="option-chips">' + addonsHtml + '</div>' +
      '</div>' +

      '<button class="primary-btn" data-action="confirm-pizza">' + btnLabel + ' · ' + money(price) + '</button>' +
      '<button class="link-btn" data-action="back-to-catalog">' + t('رجوع', 'Back') + '</button>' +
    '</div>';

  screenEl.querySelector('.customize-panel').addEventListener('change', updatePizzaPriceDisplay);
}

function readPizzaOptions() {
  var panel = screenEl.querySelector('.customize-panel[data-product="pizza"]');
  if (!panel) return null;

  var flavorEl = panel.querySelector('input[name="flavor"]:checked');
  var sizeEl = panel.querySelector('input[name="size"]:checked');
  var spiceEl = panel.querySelector('input[name="spice"]:checked');
  var addonEls = panel.querySelectorAll('input[name="addon"]:checked');

  var addons = [];
  for (var i = 0; i < addonEls.length; i++) addons.push(addonEls[i].value);

  return {
    flavor: flavorEl ? flavorEl.value : 'pepperoni',
    size: sizeEl ? sizeEl.value : 'medium',
    spice: spiceEl ? spiceEl.value : 'regular',
    addons: addons
  };
}

function updatePizzaPriceDisplay() {
  var opts = readPizzaOptions();
  if (!opts) return;
  var price = calcPizzaPrice(opts);

  var priceEl = screenEl.querySelector('.live-price');
  if (priceEl) priceEl.textContent = money(price);

  var btnLabel = editingCartId
    ? t('حفظ التعديلات', 'Save changes')
    : t('أضف للسلة', 'Add to cart');
  var btn = screenEl.querySelector('[data-action="confirm-pizza"]');
  if (btn) btn.textContent = btnLabel + ' · ' + money(price);

  updateChipVisuals();
}

/* ─────────────────────────────────────────────
   Screen: Drink Customization
   ───────────────────────────────────────────── */
function showDrinkCustomize(productId, existingOpts, editCartItemId) {
  mode = 'customize';
  editingCartId = editCartItemId || null;

  var product = getProduct(productId);
  var opts = existingOpts || { ice: 'regular' };

  var iceHtml = '';
  for (var i = 0; i < ICE_OPTS.length; i++) {
    var o = ICE_OPTS[i];
    var sel = opts.ice === o.id;
    iceHtml +=
      '<label class="option-chip ' + (sel ? 'selected' : '') + '">' +
        '<input type="radio" name="ice" value="' + o.id + '"' + (sel ? ' checked' : '') + '>' +
        '<span>' + oName(o) + '</span>' +
      '</label>';
  }

  var btnLabel = editingCartId
    ? t('حفظ التعديلات', 'Save changes')
    : t('أضف للسلة', 'Add to cart');

  screenEl.innerHTML =
    '<div class="customize-panel" data-product="' + productId + '" dir="' + dir() + '">' +
      '<div class="panel-header">' +
        '<b>' + pName(product) + '</b>' +
        '<span class="live-price">' + money(product.price) + '</span>' +
      '</div>' +

      '<div class="option-group">' +
        '<label class="group-label">' + t('الثلج', 'Ice') + '</label>' +
        '<div class="option-chips">' + iceHtml + '</div>' +
      '</div>' +

      '<button class="primary-btn" data-action="confirm-drink" data-drink-id="' + productId + '">' +
        btnLabel + ' · ' + money(product.price) +
      '</button>' +
      '<button class="link-btn" data-action="back-to-catalog">' + t('رجوع', 'Back') + '</button>' +
    '</div>';

  screenEl.querySelector('.customize-panel').addEventListener('change', function() {
    updateChipVisuals();
  });
}

/* ─────────────────────────────────────────────
   Chip Visual Update Helper
   ───────────────────────────────────────────── */
function updateChipVisuals() {
  var chips = screenEl.querySelectorAll('.option-chip');
  for (var i = 0; i < chips.length; i++) {
    var input = chips[i].querySelector('input');
    if (input) {
      chips[i].classList.toggle('selected', input.checked);
    }
  }
}

/* ─────────────────────────────────────────────
   Cart Item Description
   ───────────────────────────────────────────── */
function describeCartItem(item) {
  var product = getProduct(item.productId);
  var parts = [];

  if (product.type === 'burger') {
    var cheese = BURGER_OPTS.cheese.find(function(o) { return o.id === item.options.cheese; });
    var spice = BURGER_OPTS.spice.find(function(o) { return o.id === item.options.spice; });
    if (cheese && cheese.id !== 'regular') parts.push(oName(cheese));
    if (spice && spice.id !== 'regular') parts.push(oName(spice));
    if (item.options.addons) {
      for (var i = 0; i < item.options.addons.length; i++) {
        var a = BURGER_OPTS.addons.find(function(o) { return o.id === item.options.addons[i]; });
        if (a) parts.push(oName(a));
      }
    }
    if (item.options.removals) {
      for (var i = 0; i < item.options.removals.length; i++) {
        var r = BURGER_OPTS.removals.find(function(o) { return o.id === item.options.removals[i]; });
        if (r) parts.push(oName(r));
      }
    }
    if (item.options.notes) parts.push('"' + item.options.notes + '"');
  } else if (product.type === 'pizza') {
    var flavor = PIZZA_OPTS.flavors.find(function(o) { return o.id === item.options.flavor; });
    var size = PIZZA_OPTS.sizes.find(function(o) { return o.id === item.options.size; });
    if (flavor) parts.push(oName(flavor));
    if (size) parts.push(oName(size));
    var spice = PIZZA_OPTS.spice.find(function(o) { return o.id === item.options.spice; });
    if (spice && spice.id !== 'regular') parts.push(oName(spice));
    if (item.options.addons) {
      for (var i = 0; i < item.options.addons.length; i++) {
        var a = PIZZA_OPTS.addons.find(function(o) { return o.id === item.options.addons[i]; });
        if (a) parts.push(oName(a));
      }
    }
  } else if (product.type === 'drink') {
    var ice = ICE_OPTS.find(function(o) { return o.id === (item.options && item.options.ice); });
    if (ice && ice.id !== 'regular') parts.push(oName(ice));
  }

  return parts.join(', ');
}

/* ─────────────────────────────────────────────
   Screen: Cart
   ───────────────────────────────────────────── */
function showCart() {
  mode = 'cart';
  var items = cart.filter(function(c) { return c.qty > 0; });

  var rowsHtml = '';

  if (items.length === 0) {
    rowsHtml = '<p class="empty-msg">' + t('السلة فارغة', 'Your cart is empty.') + '</p>';
  } else {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var p = getProduct(item.productId);
      var desc = describeCartItem(item);
      var isCustomized = (p.type !== 'simple');

      rowsHtml +=
        '<article class="cart-item">' +
          '<img src="' + p.img + '" alt="' + p.name + '">' +
          '<div class="cart-item-info">' +
            '<b>' + pName(p) + '</b>' +
            (desc ? '<small class="customization-desc">' + desc + '</small>' : '') +
            '<small class="item-price">' + money(item.unitPrice) + ' ' + t('للحبة', 'each') + '</small>' +
          '</div>' +
          '<div class="cart-item-actions">' +
            '<div class="qty-controls">' +
              '<button data-cart-minus="' + item.cartId + '">−</button>' +
              '<strong>' + item.qty + '</strong>' +
              '<button data-cart-plus="' + item.cartId + '">+</button>' +
            '</div>' +
            (isCustomized ? '<button class="edit-link" data-cart-edit="' + item.cartId + '">' + t('تعديل', 'Edit') + '</button>' : '') +
          '</div>' +
          '<strong class="line-total">' + money(item.unitPrice * item.qty) + '</strong>' +
        '</article>';
    }
  }

  screenEl.innerHTML =
    '<div class="cart-panel" dir="' + dir() + '">' +
      '<div class="panel-header">' +
        '<b>' + t('السلة', 'Your cart') + '</b>' +
        '<span>' + cartTotalItems() + ' ' + t('منتج', 'items') + '</span>' +
      '</div>' +
      rowsHtml +
      '<div class="cart-total-row">' +
        '<b>' + t('الإجمالي المتوقع', 'Estimated total') + '</b>' +
        '<strong>' + money(cartTotalPrice()) + '</strong>' +
      '</div>' +
      (items.length > 0
        ? '<button class="primary-btn" data-action="send-cart">' + t('إرسال السلة', 'Send cart') + '</button>'
        : '') +
      '<button class="link-btn" data-action="open-catalog">' + t('إضافة المزيد', 'Add more') + '</button>' +
    '</div>';
}

/* ─────────────────────────────────────────────
   Screen: Checkout
   ───────────────────────────────────────────── */
function showCheckout() {
  mode = 'checkout';

  screenEl.innerHTML =
    '<form class="checkout-form" id="checkoutForm" dir="' + dir() + '">' +
      '<label class="form-field">' +
        '<span>' + t('الاسم', 'Name') + '</span>' +
        '<input name="customerName" required placeholder="' + t('أدخل اسمك', 'Enter your name') + '">' +
      '</label>' +
      '<label class="form-field">' +
        '<span>' + t('رقم الجوال', 'Mobile number') + '</span>' +
        '<input name="phone" inputmode="tel" required placeholder="05xxxxxxxx">' +
      '</label>' +
      '<fieldset class="payment-fieldset">' +
        '<legend>' + t('طريقة الدفع', 'Payment method') + '</legend>' +
        '<label class="payment-opt">' +
          '<input type="radio" name="payment" value="cash" checked>' +
          '<span>' + t('كاش في المحل', 'Cash at restaurant') + '</span>' +
        '</label>' +
        '<label class="payment-opt">' +
          '<input type="radio" name="payment" value="apple">' +
          '<span>Apple Pay</span>' +
        '</label>' +
        '<label class="payment-opt">' +
          '<input type="radio" name="payment" value="mada">' +
          '<span>' + t('مدى', 'Mada') + '</span>' +
        '</label>' +
      '</fieldset>' +
      '<button class="primary-btn" type="submit">' + t('تأكيد الطلب', 'Confirm order') + '</button>' +
    '</form>';
}

/* ─────────────────────────────────────────────
   Screen: Payment Demo
   ───────────────────────────────────────────── */
function showPaymentDemo() {
  mode = 'payment';
  screenEl.innerHTML =
    '<div class="payment-demo" dir="' + dir() + '">' +
      '<div class="payment-icon">💳</div>' +
      '<b>' + t('صفحة الدفع التجريبية', 'Demo Payment Page') + '</b>' +
      '<p>' + t(
        'Apple Pay / مدى جاهز للربط مع بوابة الدفع لاحقاً.',
        'Apple Pay / Mada ready for payment API integration.'
      ) + '</p>' +
      '<button class="primary-btn" data-action="finish-payment">' + t('متابعة', 'Continue') + '</button>' +
    '</div>';
}

/* ─────────────────────────────────────────────
   Event Delegation — Main Click Handler
   ───────────────────────────────────────────── */
document.addEventListener('click', function(e) {
  // Language selection
  var langBtn = e.target.closest('[data-lang]');
  if (langBtn) {
    lang = langBtn.dataset.lang;
    bubble(lang === 'ar' ? 'العربية' : 'English', 'outgoing');
    showWelcome();
    return;
  }

  // Customize button (burger, pizza, drinks)
  var customizeBtn = e.target.closest('[data-customize]');
  if (customizeBtn) {
    var pid = customizeBtn.dataset.customize;
    var product = getProduct(pid);
    if (product.type === 'burger') showBurgerCustomize();
    else if (product.type === 'pizza') showPizzaCustomize();
    else if (product.type === 'drink') showDrinkCustomize(pid);
    return;
  }

  // Simple product +
  var simplePlus = e.target.closest('[data-simple-plus]');
  if (simplePlus) {
    var pid = simplePlus.dataset.simplePlus;
    var existing = getSimpleCartItem(pid);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        cartId: nextCartId++,
        productId: pid,
        qty: 1,
        options: {},
        unitPrice: getProduct(pid).price
      });
    }
    showCatalog();
    return;
  }

  // Simple product -
  var simpleMinus = e.target.closest('[data-simple-minus]');
  if (simpleMinus) {
    var pid = simpleMinus.dataset.simpleMinus;
    var existing = getSimpleCartItem(pid);
    if (existing) {
      existing.qty--;
      if (existing.qty <= 0) {
        cart = cart.filter(function(c) { return c.cartId !== existing.cartId; });
      }
    }
    showCatalog();
    return;
  }

  // Cart +
  var cartPlus = e.target.closest('[data-cart-plus]');
  if (cartPlus) {
    var cid = parseInt(cartPlus.dataset.cartPlus);
    var item = cart.find(function(c) { return c.cartId === cid; });
    if (item) item.qty++;
    showCart();
    return;
  }

  // Cart -
  var cartMinus = e.target.closest('[data-cart-minus]');
  if (cartMinus) {
    var cid = parseInt(cartMinus.dataset.cartMinus);
    var item = cart.find(function(c) { return c.cartId === cid; });
    if (item) {
      item.qty--;
      if (item.qty <= 0) {
        cart = cart.filter(function(c) { return c.cartId !== cid; });
      }
    }
    showCart();
    return;
  }

  // Cart edit
  var cartEdit = e.target.closest('[data-cart-edit]');
  if (cartEdit) {
    var cid = parseInt(cartEdit.dataset.cartEdit);
    var item = cart.find(function(c) { return c.cartId === cid; });
    if (!item) return;
    var product = getProduct(item.productId);
    if (product.type === 'burger') showBurgerCustomize(item.options, cid);
    else if (product.type === 'pizza') showPizzaCustomize(item.options, cid);
    else if (product.type === 'drink') showDrinkCustomize(item.productId, item.options, cid);
    return;
  }

  // Action buttons
  var actionBtn = e.target.closest('[data-action]');
  if (!actionBtn) return;
  var action = actionBtn.dataset.action;

  // Open catalog
  if (action === 'open-catalog') {
    if (mode !== 'items') {
      bubble(t('المنيو', 'Menu'), 'outgoing');
    }
    showCatalog();
    return;
  }

  // Open cart
  if (action === 'open-cart') {
    showCart();
    return;
  }

  // Confirm burger
  if (action === 'confirm-burger') {
    var opts = readBurgerOptions();
    if (!opts) return;
    var price = calcBurgerPrice(opts);

    if (editingCartId) {
      var item = cart.find(function(c) { return c.cartId === editingCartId; });
      if (item) {
        item.options = opts;
        item.unitPrice = price;
      }
      editingCartId = null;
      toast(t('تم تحديث البرجر ✓', 'Burger updated ✓'));
      showCart();
    } else {
      cart.push({
        cartId: nextCartId++,
        productId: 'burger',
        qty: 1,
        options: opts,
        unitPrice: price
      });
      editingCartId = null;
      toast(t('تمت الإضافة للسلة ✓', 'Added to cart ✓'));
      showCatalog();
    }
    return;
  }

  // Confirm pizza
  if (action === 'confirm-pizza') {
    var opts = readPizzaOptions();
    if (!opts) return;
    var price = calcPizzaPrice(opts);

    if (editingCartId) {
      var item = cart.find(function(c) { return c.cartId === editingCartId; });
      if (item) {
        item.options = opts;
        item.unitPrice = price;
      }
      editingCartId = null;
      toast(t('تم تحديث البيتزا ✓', 'Pizza updated ✓'));
      showCart();
    } else {
      cart.push({
        cartId: nextCartId++,
        productId: 'pizza',
        qty: 1,
        options: opts,
        unitPrice: price
      });
      editingCartId = null;
      toast(t('تمت الإضافة للسلة ✓', 'Added to cart ✓'));
      showCatalog();
    }
    return;
  }

  // Confirm drink
  if (action === 'confirm-drink') {
    var drinkId = actionBtn.dataset.drinkId;
    var iceEl = screenEl.querySelector('input[name="ice"]:checked');
    var opts = { ice: iceEl ? iceEl.value : 'regular' };
    var product = getProduct(drinkId);

    if (editingCartId) {
      var item = cart.find(function(c) { return c.cartId === editingCartId; });
      if (item) {
        item.options = opts;
      }
      editingCartId = null;
      toast(t('تم التحديث ✓', 'Updated ✓'));
      showCart();
    } else {
      cart.push({
        cartId: nextCartId++,
        productId: drinkId,
        qty: 1,
        options: opts,
        unitPrice: product.price
      });
      editingCartId = null;
      toast(t('تمت الإضافة للسلة ✓', 'Added to cart ✓'));
      showCatalog();
    }
    return;
  }

  // Send cart
  if (action === 'send-cart') {
    var items = cart.filter(function(c) { return c.qty > 0; });
    if (items.length === 0) return;

    var summary = '<b>🛒 ' + cartTotalItems() + ' ' + t('طلبات', 'items') + '</b><br>';
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var p = getProduct(item.productId);
      var desc = describeCartItem(item);
      summary += pName(p);
      if (desc) summary += ' (' + desc + ')';
      summary += ' × ' + item.qty + ' — ' + money(item.unitPrice * item.qty) + '<br>';
    }
    summary += '<b>' + t('الإجمالي', 'Total') + ': ' + money(cartTotalPrice()) + '</b>';

    bubble(summary, 'outgoing');
    bubble(t(
      'شكراً لطلبك! أدخل الاسم ورقم الجوال ثم اختر طريقة الدفع.',
      'Thanks for your order! Enter your name and phone number, then select a payment method.'
    ));
    showCheckout();
    return;
  }

  // Back to catalog from customization
  if (action === 'back-to-catalog') {
    editingCartId = null;
    showCatalog();
    return;
  }

  // Finish payment demo
  if (action === 'finish-payment') {
    bubble(t('تم استلام طلبك بنجاح ✅\nشكراً لك!', 'Your order has been received ✅\nThank you!'));
    mode = 'done';
    screenEl.innerHTML = '';
    return;
  }
});

/* ─────────────────────────────────────────────
   Checkout Form Submission
   ───────────────────────────────────────────── */
document.addEventListener('submit', function(e) {
  if (!e.target.matches('#checkoutForm')) return;
  e.preventDefault();
  e.stopPropagation();

  var data = new FormData(e.target);
  var payment = data.get('payment');
  var customerName = (data.get('customerName') || '').trim();
  var phone = (data.get('phone') || '').trim();

  // Validate name: letters only (Arabic + English + spaces), min 3 chars
  var nameRegex = /^[\u0600-\u06FF\u0750-\u077Fa-zA-Z\s]{3,}$/;
  if (!nameRegex.test(customerName)) {
    toast(t(
      'الاسم يجب أن يكون حروف فقط (3 أحرف على الأقل)',
      'Name must be letters only (at least 3 characters)'
    ));
    return;
  }

  // Validate phone: Saudi format 05xxxxxxxx (10 digits)
  var phoneClean = phone.replace(/[\s\-]/g, '');
  var saudiRegex = /^05\d{8}$/;
  if (!saudiRegex.test(phoneClean)) {
    toast(t(
      'رقم الجوال يجب أن يبدأ بـ 05 ويكون 10 أرقام',
      'Phone must be a Saudi number (05xxxxxxxx)'
    ));
    return;
  }
  phone = phoneClean;

  var paymentLabel = payment;
  if (payment === 'cash') paymentLabel = t('كاش في المحل', 'Cash at restaurant');
  else if (payment === 'apple') paymentLabel = 'Apple Pay';
  else if (payment === 'mada') paymentLabel = t('مدى', 'Mada');

  bubble(
    t('الاسم', 'Name') + ': ' + customerName + '<br>' +
    t('الجوال', 'Phone') + ': ' + phone + '<br>' +
    t('الدفع', 'Payment') + ': ' + paymentLabel,
    'outgoing'
  );

  if (payment === 'cash') {
    bubble(t(
      'تم استلام طلبك بنجاح ✅\nالطلب جاري التحضير. شكراً لك!',
      'Your order has been received ✅\nYour order is being prepared. Thank you!'
    ));
    mode = 'done';
    screenEl.innerHTML = '';
  } else {
    bubble(t(
      'سيتم تحويلك لصفحة الدفع عند ربط بوابة الدفع.',
      'Demo payment step — this will connect to the payment API in production.'
    ));
    showPaymentDemo();
  }
});

/* ─────────────────────────────────────────────
   Back Button
   ───────────────────────────────────────────── */
backEl.addEventListener('click', function() {
  if (mode === 'customize') {
    editingCartId = null;
    if (cart.length > 0 && mode === 'customize') {
      // If we were editing from cart, go back to cart
      showCatalog();
    } else {
      showCatalog();
    }
  } else if (mode === 'cart') {
    showCatalog();
  } else if (mode === 'checkout') {
    showCart();
  } else if (mode === 'payment') {
    showCheckout();
  } else if (mode === 'items') {
    // Back to catalog card view
    mode = 'catalog';
    screenEl.innerHTML = '';
  } else {
    // Full reset to start
    cart = [];
    nextCartId = 1;
    lang = null;
    mode = 'welcome';
    editingCartId = null;
    chatEl.innerHTML = '';
    showComposer();
  }
});

/* ─────────────────────────────────────────────
   Reset Button
   ───────────────────────────────────────────── */
resetEl.addEventListener('click', function() {
  cart = [];
  nextCartId = 1;
  lang = null;
  mode = 'welcome';
  editingCartId = null;
  chatEl.innerHTML = '';
  showComposer();
  toast(t('تم إعادة البداية', 'Conversation restarted'));
});

/* ─────────────────────────────────────────────
   Theme Controller (Dark / Light Mode)
   ───────────────────────────────────────────── */
const themeToggleBtn = document.getElementById('themeToggle');

function initTheme() {
  const savedTheme = localStorage.getItem('luqma_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('luqma_theme', nextTheme);
    toast(nextTheme === 'dark' ? 'الوضع الليلي 🌙' : 'الوضع النهاري ☀️');
  });
}

initTheme();

/* ─────────────────────────────────────────────
   Comprehensive Language Controller (i18n)
   ───────────────────────────────────────────── */
const I18N = {
  ar: {
    demo_badge: 'ديمو المستثمرين MVP',
    nav_cta: 'جرب المحاكي الآن',
    subnav_brand: 'لقمة',
    subnav_sub: 'منظومة الطلب المباشر',
    tab_overview: 'نظرة عامة',
    tab_specs: 'المواصفات',
    tab_features: 'المميزات',
    tab_customizer: 'محرك التخصيص',
    tab_simulator: 'المحاكي التفاعلي',
    subnav_cta: 'ابدأ التجربة',
    hero_tag: 'قناة بيع مباشرة ومملوكة للمطعم 100%',
    hero_title: 'اطلب مثل ما تسولف.',
    hero_sub: 'بدل الاعتماد على المكالمات اليدوية أو منصات التوصيل التي تقتطع حتى 30% من أرباحك، يفتح العميل محادثة واتساب عادية، يتصفح قائمة طعام مصورة، يخصص وجبته بدقة، ويطلب في ثوانٍ.',
    hero_btn_primary: 'جرّب محاكي الطلب الآن',
    hero_btn_secondary: 'استكشف المواصفات',
    banner_title: 'ثقة وسرعة بدون تطبيقات خارجية',
    banner_sub: 'تجربة مستخدم تفاعلية تحاكي واتساب الأصلي داخل إطار آيفون متطور',
    banner_btn: 'فتح المحاكي',
    specs_badge: 'المواصفات التقنية والأرقام',
    specs_title: 'مزايا ذكية لراحة وأرباح مستدامة',
    specs_sub: 'تجمع لقمة بين سرعة التقنيات الحديثة والواجهة المألوفة لطلب أسهل وأسرع لعملائك',
    spec1_label: 'عمولة منصات التوصيل',
    spec1_desc: 'احتفظ بكامل إيرادات طلباتك دون مشاركة الأرباح أو رسوم خفية.',
    spec2_label: 'أسرع من الاتصال الهاتفي',
    spec2_desc: 'وداعاً لخطوط الهاتف المشغولة وأخطاء تسجيل الطلبات اليدوية ومراجعة الفواتير.',
    spec3_label: 'امتلاك بيانات العميل بالكامل',
    spec3_desc: 'أرقام هواتف العملاء وسجلات طلباتهم ملكك أنت فقط لإعادة استهدافهم في أي وقت.',
    spec4_label: 'صنف متنوع في ديمو لقمة',
    spec4_desc: 'برجر فاخر، بيتزا بأحجام متعددة، مقبلات وصوصات وعصائر ومشروبات غازية.',
    feat_badge: 'المميزات الرئيسية',
    feat_title: 'تصميم يلفت الأنظار ويرتقي بكل تفاصيل الطلب',
    card1_cat: 'واجهة المحادثة',
    card1_title: 'بدء الطلب بأي رسالة عادية',
    card1_desc: 'يكفي أن يرسل العميل "هلا" أو حتى حرفاً واحداً ليرد البوت فوراً بالترحيب الثنائي ويفتح قائمة المنتجات المصورة بكامل تفاصيلها.',
    card2_cat: 'محرك التخصيص',
    card2_title: 'تخصيص دقيق ومستقل لكل صنف',
    card2_desc: 'خيارات الجبن، مستوى البهارات، قطع اللحم الإضافية، العجائن، وحذف المكونات. كل صنف مخصص يحتفظ بخياراته بشكل مستقل في السلة.',
    card3_cat: 'الدفع المحلي',
    card3_title: 'مدى و Apple Pay والدفع بالمحل',
    card3_desc: 'تجربة دفع سلسة متوافقة مع المتطلبات السعودية مع التحقق الصارم من صحة رقم الجوال 05xxxxxxxx وكتابة الاسم بالحروف فقط.',
    card4_cat: 'ثنائي اللغة',
    card4_title: 'دعم فوري للعربية والإنجليزية',
    card4_desc: 'واجهة متكاملة باللغة العربية بدعم كامل للاتجاه من اليمين لليسار (RTL) أو بالإنجليزية (LTR) بضغطة زر واحدة.',
    tabs_badge: 'استعراض المنظومة',
    tabs_title: 'تخصيص متقدم يلفت الأنظار ويوفر تجربة استثنائية',
    tab_btn_burger: 'محرك البرجر الفاخر',
    tab_btn_pizza: 'تشكيلة البيتزا الإيطالية',
    tab_btn_drinks: 'المشروبات والإضافات',
    burger_card_title: 'برجر اللحم الكلاسيكي — 23 ريال',
    burger_card_desc: 'خيارات الجبن (بدون، عادي، أو إكسترا +2 ريال)، ومستوى البهارات المفضل، مع إمكانية إضافة شريحة لحم إضافية (+5.5 ريال) وحذف الطماطم أو البصل وكتابة ملاحظات خاصة للطهي.',
    fries_card_title: 'البطاطس والمقبلات — 5 إلى 15 ريال',
    fries_card_desc: 'بطاطس مقرمشة عادية أو بطاطس خاصة بالجبن والصوصات الفاخرة، مع صوصات رانش وثوم وصوص حار مستقل بـ 2.5 ريال فقط لكل صوص.',
    pizza_card1_title: '3 أحجام دقيقة: صغير 16، وسط 19، كبير 23 ريال',
    pizza_card1_desc: '4 نكهات فاخرة: بيبروني، مارغريتا، دجاج رانش، وأربع أجبان. يتحدد السعر تلقائياً بناءً على الحجم المختار دون فرض رسوم غير متوقعة.',
    pizza_card2_title: 'إضافات البيتزا المدفوعة',
    pizza_card2_desc: 'موزاريلا إضافية (+3 ريال)، سجق (+4 ريال)، دجاج مشوي (+5 ريال)، وزيتون أسود (+2 ريال). تُحسب الإضافات بدقة متناهية في إجمالي السلة.',
    drinks_card1_title: 'مشروبات غازية وطنية وعالمية',
    drinks_card1_desc: 'كولا وبيبسي وسبرايت وماونتن ديو (3 ريال)، ومشروب كينزا الوطني (2.5 ريال)، مع ماء نقي (1 ريال) وخيارات الثلج المجانية: ثلج عادي، بدون ثلج، أو إكسترا ثلج.',
    drinks_card2_title: 'سلطات وصوصات جانبية طازجة',
    drinks_card2_desc: 'سلطة خضراء منعشة وصحية بسعر 14 ريال مع صوص الرانش وصوص الثوم والصوص الحار لترقية وجبة العميل بكل سهولة وبضغطة واحدة.',
    split_badge: 'التجربة المحلية السعودية',
    split_title: 'تحقق ذكي وموثوق من بيانات العميل',
    split_desc: 'لضمان عدم حدوث أخطاء في التوصيل أو تواصل السائق، يتأكد النظام من إدخال الاسم بالحروف فقط وبثلاثة أحرف على الأقل، ورقم الجوال بصيغة الجوالات السعودية المعتمدة 05xxxxxxxx المكونة من 10 أرقام بالضبط.',
    point1: '✓ منع إدخال أرقام وهمية أو رموز في حقل الاسم',
    point2: '✓ اشتراط رقم جوال سعودي يبدأ بـ 05 حصراً',
    point3: '✓ تأكيد فوري بالرسائل التفاعلية مع طابع زمني دقيق',
    split_cta: 'جرب إدخال البيانات في المحاكي ←',
    sim_badge: 'المحاكي التفاعلي الحي',
    sim_title: 'جرب منظومة لقمة بنفسك الآن',
    sim_sub: 'استخدم الهاتف أدناه كما لو كنت عميلاً حقيقياً. أرسل رسالة، اختر اللغة، تصفح المنيو، خصص طلبك، وأتمم الطلب التجريبي.',
    footer_desc: 'المنصة المباشرة لتمكين المطاعم في المملكة العربية السعودية من إدارة طلباتها وحفظ أرباحها بدون عمولات المنصات.'
  },
  en: {
    demo_badge: 'Investor MVP Demo',
    nav_cta: 'Try Simulator',
    subnav_brand: 'Luqma',
    subnav_sub: 'Direct Ordering Platform',
    tab_overview: 'Overview',
    tab_specs: 'Specifications',
    tab_features: 'Features',
    tab_customizer: 'Customizer',
    tab_simulator: 'Live Simulator',
    subnav_cta: 'Start Demo',
    hero_tag: '100% Direct-to-Consumer Restaurant Channel',
    hero_title: 'Order like you chat.',
    hero_sub: 'Instead of relying on manual phone calls or third-party delivery apps that cut up to 30% of your ticket, customers open a simple WhatsApp conversation, customize meals with precision, and order in seconds.',
    hero_btn_primary: 'Try Live Simulator Now',
    hero_btn_secondary: 'Explore Specifications',
    banner_title: 'Speed & Trust Without External Apps',
    banner_sub: 'Interactive customer experience mimicking authentic WhatsApp inside an advanced iPhone frame.',
    banner_btn: 'Open Simulator',
    specs_badge: 'Key Metrics & Specifications',
    specs_title: 'Smart Features for Sustainable Revenue',
    specs_sub: 'Luqma combines conversational speed with an intuitive visual catalog for effortless ordering.',
    spec1_label: 'Aggregator Commission',
    spec1_desc: 'Retain 100% of your ticket revenue. Zero revenue-sharing cuts or hidden charges.',
    spec2_label: 'Faster Than Phone Calls',
    spec2_desc: 'No busy signals, manual note-taking mistakes, or repeating menu prices over the phone.',
    spec3_label: 'Full Customer Data Ownership',
    spec3_desc: 'Customer phone numbers and past order histories belong exclusively to your restaurant.',
    spec4_label: 'Menu Items in Luqma Demo',
    spec4_desc: 'Gourmet burgers, multi-size pizzas, sides, signature sauces, sodas, and fresh salads.',
    feat_badge: 'Key Features',
    feat_title: 'Eye-Catching Design Elevating Every Order Detail',
    card1_cat: 'Chat Interface',
    card1_title: 'Start With Any Simple Message',
    card1_desc: 'A simple "Hi" or single letter triggers an instant bilingual greeting and rich visual menu.',
    card2_cat: 'Customizer Engine',
    card2_title: 'Granular & Independent Customization',
    card2_desc: 'Cheese tiers, spice levels, extra patties, crusts, and removals—each item keeps its own options.',
    card3_cat: 'Local Payments',
    card3_title: 'Mada, Apple Pay, & Cash on Pickup',
    card3_desc: 'Seamless payments tailored for Saudi consumers with strict 05xxxxxxxx phone validation.',
    card4_cat: 'Bilingual',
    card4_title: 'Instant Arabic & English Support',
    card4_desc: 'Complete native support for Arabic RTL and English LTR at the touch of a button.',
    tabs_badge: 'System Showcase',
    tabs_title: 'Advanced Customization Delivering an Exceptional Experience',
    tab_btn_burger: 'Gourmet Burger Engine',
    tab_btn_pizza: 'Artisan Pizza Range',
    tab_btn_drinks: 'Drinks & Side Options',
    burger_card_title: 'Classic Beef Burger — 23 SAR',
    burger_card_desc: 'Cheese options (none, regular, extra +2 SAR), spice meter, extra beef patty (+5.5 SAR), ingredient removals, and free-form chef notes.',
    fries_card_title: 'Fries & Appetizers — 5 to 15 SAR',
    fries_card_desc: 'Crispy classic fries or loaded special fries, complemented by ranch, garlic, and spicy dipping sauces for 2.5 SAR each.',
    pizza_card1_title: '3 Precision Sizes: Small 16, Medium 19, Large 23 SAR',
    pizza_card1_desc: '4 signature flavors: Pepperoni, Margherita, Chicken Ranch, and Four Cheese. Accurate live pricing with zero hidden fees.',
    pizza_card2_title: 'Paid Pizza Add-ons',
    pizza_card2_desc: 'Extra mozzarella (+3 SAR), gourmet sausage (+4 SAR), grilled chicken (+5 SAR), and black olives (+2 SAR) added cleanly to the cart.',
    drinks_card1_title: 'National & Global Sodas',
    drinks_card1_desc: 'Cola, Pepsi, Sprite, Mountain Dew (3 SAR), Kenza (2.5 SAR), and mineral water (1 SAR) with free ice customization: regular, no ice, or extra ice.',
    drinks_card2_title: 'Fresh Salads & Dipping Sauces',
    drinks_card2_desc: 'Crisp green salad at 14 SAR with ranch, garlic, and hot sauces to complete any customer order with a single tap.',
    split_badge: 'Saudi Localization',
    split_title: 'Smart, Reliable Customer Data Validation',
    split_desc: 'Ensures zero delivery errors and clean CRM records by validating customer names (letters only, min 3 chars) and authentic Saudi phone numbers (05xxxxxxxx, 10 digits).',
    point1: '✓ Prevents numbers and special characters in customer name',
    point2: '✓ Strict Saudi mobile format starting with 05 (10 digits)',
    point3: '✓ Instant interactive WhatsApp receipt with exact timestamps',
    split_cta: 'Try entering customer details in simulator →',
    sim_badge: 'Live Interactive Simulator',
    sim_title: 'Experience the Luqma System Now',
    sim_sub: 'Use the phone below just like a real customer. Send a message, pick a language, customize dishes, and complete the Saudi checkout demo.',
    footer_desc: 'The direct restaurant ordering platform empowering Saudi food brands to eliminate third-party aggregator commissions.'
  }
};

const langToggleBtn = document.getElementById('langToggle');
const langTextEl = document.getElementById('langText');
const onlineStatusText = document.getElementById('onlineStatusText');

function applyLanguage(targetLang) {
  const isArabic = targetLang === 'ar';
  document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', targetLang);
  
  if (langTextEl) {
    langTextEl.textContent = isArabic ? 'English' : 'العربية (ثمانية)';
  }
  
  if (onlineStatusText) {
    onlineStatusText.textContent = isArabic ? 'متصل الآن' : 'online';
  }

  // Update all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (I18N[targetLang] && I18N[targetLang][key]) {
      el.textContent = I18N[targetLang][key];
    }
  });

  localStorage.setItem('luqma_site_lang', targetLang);
}

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', function() {
    const currentLang = document.documentElement.getAttribute('lang') || 'ar';
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLang);
    toast(nextLang === 'ar' ? 'تم تفعيل العربية (خط ثمانية) 🇸🇦' : 'Switched to English 🇬🇧');
  });
}

// Initialize saved language
const savedSiteLang = localStorage.getItem('luqma_site_lang') || 'ar';
applyLanguage(savedSiteLang);

/* ─────────────────────────────────────────────
   Interactive Tabs Controller (كما بالفيديو 00:04)
   ───────────────────────────────────────────── */
function initTabsShowcase() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const targetId = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ─────────────────────────────────────────────
   Horizontal Carousel Controller (كما بالفيديو 00:02)
   ───────────────────────────────────────────── */
function initCarousel() {
  const trackWrapper = document.querySelector('.carousel-track-wrapper');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (!trackWrapper) return;

  function scrollCarousel(distance) {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const scrollAmount = isRtl ? -distance : distance;
    trackWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      scrollCarousel(-340);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      scrollCarousel(340);
    });
  }

  // Update active dot on scroll
  trackWrapper.addEventListener('scroll', function() {
    const scrollPos = Math.abs(trackWrapper.scrollLeft);
    const maxScroll = trackWrapper.scrollWidth - trackWrapper.clientWidth;
    const progress = maxScroll > 0 ? scrollPos / maxScroll : 0;
    const dotIndex = Math.min(Math.floor(progress * dots.length), dots.length - 1);
    
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === dotIndex);
    });
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   Sticky Sub-Nav Active Tracking (كما بالفيديو)
   ───────────────────────────────────────────── */
function initSubNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sub-link');

  window.addEventListener('scroll', function() {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(function(section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.toggle('active', link.getAttribute('data-target') === currentId);
    });
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   Scroll-Driven Animations & Counter Observers
   ───────────────────────────────────────────── */
function initScrollAnimations() {
  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries, obs) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          
          // Animate numeric counters if present
          const counterEl = entry.target.querySelector('.count-up');
          if (counterEl && !counterEl.dataset.animated) {
            counterEl.dataset.animated = 'true';
            const target = parseInt(counterEl.dataset.target, 10) || 0;
            animateCounter(counterEl, target, 1300);
          }
          
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elementsToReveal.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    elementsToReveal.forEach(function(el) {
      el.classList.add('is-revealed');
    });
  }
}

function animateCounter(el, target, duration) {
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * easeOut);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', function() {
  initTabsShowcase();
  initCarousel();
  initSubNavTracking();
  initScrollAnimations();
});

initTabsShowcase();
initCarousel();
initSubNavTracking();
initScrollAnimations();

/* ─────────────────────────────────────────────
   Initialize Simulator
   ───────────────────────────────────────────── */
updateDeviceStatus();
setInterval(updateDeviceStatus, 30000);
window.addEventListener('online', updateDeviceStatus);
window.addEventListener('offline', updateDeviceStatus);
showComposer();


