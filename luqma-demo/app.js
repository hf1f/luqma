const chatEl = document.querySelector('#conversation');
const screenEl = document.querySelector('#screen');
const backEl = document.querySelector('#back');
const resetEl = document.querySelector('#resetChat');
const deviceTimeEl = document.querySelector('#deviceTime');
const batteryLevelEl = document.querySelector('#batteryLevel');
const batteryTextEl = document.querySelector('#batteryText');
const phoneEl = document.querySelector('.phone');
screenEl.innerHTML='<form class="composer"><button type="button" class="emoji">☺</button><input id="messageInput" autocomplete="off" placeholder="Type a message"><button type="button" class="clip">⌕</button><button class="send" aria-label="Send">➤</button></form>';
const statusBarEl = document.querySelector('.status-bar');
const deviceStatusEl = document.querySelector('.device-status');
try {
deviceStatusEl.insertAdjacentHTML('afterbegin','<span class="signal-icon" aria-label="Signal">▮▮▮</span><span class="wifi-icon-real" aria-label="Wi-Fi">⌁</span>');
statusBarEl.style.background='#075e54';
statusBarEl.style.color='#ffffff';
statusBarEl.style.borderRadius='30px 30px 0 0';
deviceStatusEl.style.color='#ffffff';
deviceStatusEl.querySelectorAll('span').forEach(icon=>{icon.style.color='#ffffff';icon.style.fontStyle='normal';});
document.querySelector('.battery').style.borderColor='#ffffff';
document.querySelector('.battery').style.background='transparent';
document.querySelector('.battery').style.setProperty('--battery-color','#ffffff');
batteryLevelEl.style.background='#ffffff';
chatEl.style.minHeight='0';
screenEl.style.flex='0 0 64px';
screenEl.style.height='64px';
screenEl.style.minHeight='64px';
screenEl.style.overflow='visible';
if(window.innerWidth>450){phoneEl.style.width='390px';phoneEl.style.height='760px';}
} catch (statusError) { console.warn('Status bar enhancement skipped:', statusError); }
const products = [
  {id:'burger',name:'Burger',price:23,image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=85'},
  {id:'pizza',name:'Pizza',price:14,range:'14–21',image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=85'},
  {id:'cola',name:'Cola',price:3,image:'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=500&q=85'},
  {id:'sprite',name:'Sprite',price:3,image:'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=500&q=85'},
  {id:'sevenup',name:'7UP',price:3,image:'assets/7up.png'},
  {id:'pepsi',name:'Pepsi',price:3,image:'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=500&q=85'},
  {id:'mirinda-orange',name:'Mirinda Orange',price:3,image:'assets/mirinda-orange.png'},
  {id:'mirinda-strawberry',name:'Mirinda Strawberry',price:3,image:'assets/mirinda-strawberry.png'},
  {id:'dew',name:'Mountain Dew',price:3,image:'assets/mountain-dew.png'},
  {id:'kenza',name:'Kenza',price:2.5,image:'assets/kenza.png'},
  {id:'water',name:'Water',price:1,image:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=500&q=85'},
  {id:'fries',name:'Fries',price:5,image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85'},
  {id:'special-fries',name:'Special Fries',price:15,image:'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=85'},
  {id:'salad',name:'Salad',price:14,image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=85'},
  {id:'ranch-sauce',name:'Ranch Sauce',price:2.5,image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=85'},
  {id:'garlic-sauce',name:'Garlic Sauce',price:2.5,image:'https://images.unsplash.com/photo-1472476442910-2a035643b3e9?auto=format&fit=crop&w=500&q=85'},
  {id:'spicy-sauce',name:'Spicy Sauce',price:2.5,image:'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=85'}
];
let cart={},mode='welcome',language=null;
const money=n=>`${Number(n).toFixed(2).replace('.00','')} SAR`;
const time=()=>new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
function updateDeviceStatus(){deviceTimeEl.textContent=new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});document.querySelector('.network-icon').textContent=navigator.onLine?'⌁':'×';if(navigator.getBattery){navigator.getBattery().then(b=>{const level=Math.round(b.level*100);batteryTextEl.textContent=`${level}%`;batteryLevelEl.style.width=`${level}%`;batteryLevelEl.classList.toggle('charging',b.charging);});}else{batteryTextEl.textContent='85%';batteryLevelEl.style.width='85%';}}
updateDeviceStatus();setInterval(updateDeviceStatus,30000);window.addEventListener('online',updateDeviceStatus);window.addEventListener('offline',updateDeviceStatus);
const arabicNames={Burger:'برجر',Pizza:'بيتزا',Cola:'كولا',Sprite:'سبرايت','7UP':'7UP',Pepsi:'بيبسي','Mirinda Orange':'ميرندا برتقال','Mirinda Strawberry':'ميرندا فراولة','Mountain Dew':'ماونتن ديو',Kenza:'كينزا',Water:'ماء',Fries:'بطاطس','Special Fries':'بطاطس خاصة',Salad:'سلطة','Ranch Sauce':'صوص رانش','Garlic Sauce':'صوص ثوم','Spicy Sauce':'صوص حار'};
const productName=p=>language==='ar'?(arabicNames[p.name]||p.name):p.name;
function bubble(html,type='incoming'){const el=document.createElement('div');el.className=`bubble ${type}`;el.innerHTML=`${html}<small>${time()} ${type==='outgoing'?'✓✓':''}</small>`;chatEl.appendChild(el);chatEl.scrollTop=chatEl.scrollHeight;}
function composer(){screenEl.innerHTML='<form class="composer"><button type="button" class="emoji" aria-label="Emoji">☺</button><input id="messageInput" autocomplete="off" placeholder="Type a message"><button type="button" class="clip" aria-label="Attach">⌕</button><button class="send" aria-label="Send">➤</button></form>';const form=screenEl.querySelector('form');form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');if(input.value.trim()){bubble(input.value.trim(),'outgoing');askLanguage();input.value='';}});screenEl.querySelector('input').focus();}
function askLanguage(){bubble('<b>أهلاً بك في لقمة 👋</b><br>وش اللغة اللي تفضلها؟<br><br><b>Welcome to Luqma 👋</b><br>Which language do you prefer?<br><div class="language-options"><button data-language="ar">العربية</button><button data-language="en">English</button></div>');mode='language';}
function welcome(){const ar=language==='ar';bubble(ar?'<b>أهلاً بك في لقمة 👋</b><br>تفضل هذا المنيو واختار اللي تشتهيه.':'<b>Hi! Welcome to Luqma 👋</b><br>Browse our menu below.');bubble(`<div class="catalog-card"><img src="${products[1].image}"><div><b>${ar?'كل المنتجات':'All Products'}</b><small>${products.length} ${ar?'منتج':'items'}</small><p>${ar?'تصفح جميع المنتجات من هنا.':'Checkout our All Products here.'}</p><button data-action="items">${ar?'عرض المنتجات':'View items'}</button></div></div>`);mode='catalog';}
function total(){return products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0);}
function catalog(){mode='items';screenEl.innerHTML=`<div class="catalog-panel"><div class="panel-title"><b>${language==='ar'?'كل المنتجات':'All Products'}</b><span>${Object.values(cart).reduce((a,b)=>a+b,0)} ${language==='ar'?'منتج':'items'}</span></div><div class="product-list">${products.map(p=>`<article class="product"><img src="${p.image}"><div><b>${productName(p)}</b><small>${p.range?(language==='ar'?`من ${money(p.price)}`:`From ${money(p.price)}`):money(p.price)}</small></div><div class="qty"><button data-minus="${p.id}">−</button><strong>${cart[p.id]||0}</strong><button data-plus="${p.id}">+</button></div></article>`).join('')}</div><button class="cart-button" data-action="cart">${language==='ar'?'عرض السلة':'View cart'} · ${money(total())}</button></div>`;}
function showCart(){mode='cart';const selected=products.filter(p=>cart[p.id]);screenEl.innerHTML=`<div class="cart-panel"><div class="panel-title"><b>${language==='ar'?'السلة':'Your cart'}</b><span>${selected.reduce((a,p)=>a+cart[p.id],0)} ${language==='ar'?'منتج':'items'}</span></div>${selected.length?selected.map(p=>`<article class="cart-row"><img src="${p.image}"><div><b>${productName(p)}</b><small>${money(p.price)} ${language==='ar'?'للحبة':'each'}</small></div><div class="qty"><button data-minus="${p.id}">−</button><strong>${cart[p.id]}</strong><button data-plus="${p.id}">+</button></div><strong>${money(p.price*cart[p.id])}</strong></article>`).join(''):`<p class="empty">${language==='ar'?'السلة فارغة':'Your cart is empty.'}</p>`}<div class="cart-total"><b>${language==='ar'?'الإجمالي المتوقع':'Estimated total'}</b><strong>${money(total())}</strong></div>${selected.length?`<button class="cart-button" data-action="send-cart">${language==='ar'?'إرسال السلة':'Send cart'}</button>`:''}<button class="link-button" data-action="items">${language==='ar'?'إضافة المزيد':'Add more'}</button></div>`;}
document.addEventListener('click',e=>{const action=e.target.closest('[data-action]')?.dataset.action,lang=e.target.closest('[data-language]')?.dataset.language,plus=e.target.closest('[data-plus]')?.dataset.plus,minus=e.target.closest('[data-minus]')?.dataset.minus;if(lang){language=lang;bubble(lang==='ar'?'العربية':'English','outgoing');welcome();}if(plus){cart[plus]=(cart[plus]||0)+1;mode==='cart'?showCart():catalog();}if(minus){cart[minus]=Math.max(0,(cart[minus]||0)-1);if(!cart[minus])delete cart[minus];mode==='cart'?showCart():catalog();}if(action==='items'){bubble(language==='ar'?'المنيو':'Menu','outgoing');catalog();}if(action==='cart')showCart();if(action==='send-cart'){bubble(`<b>🛒 ${Object.values(cart).reduce((a,b)=>a+b,0)} ${language==='ar'?'طلبات':'items'}</b><br>${money(total())}`,'outgoing');bubble(language==='ar'?'شكراً لطلبك! أدخل الاسم ورقم الجوال ثم اختر طريقة الدفع.':'Thanks for your order! Enter your name and phone number, then select a payment method.');screenEl.innerHTML=`<form class="checkout-form"><label class="field"><span>${language==='ar'?'الاسم':'Name'}</span><input name="customerName" required></label><label class="field"><span>${language==='ar'?'رقم الجوال':'Mobile number'}</span><input name="phone" inputmode="tel" required></label><fieldset><legend>${language==='ar'?'طريقة الدفع':'Select payment'}</legend><label class="payment-option"><input type="radio" name="payment" value="cash" checked><span>${language==='ar'?'كاش في المحل':'Cash at restaurant'}</span></label><label class="payment-option"><input type="radio" name="payment" value="apple"><span>Apple Pay</span></label><label class="payment-option"><input type="radio" name="payment" value="mada"><span>${language==='ar'?'مدى':'Mada'}</span></label></fieldset><button>${language==='ar'?'تأكيد الطلب':'Confirm order'}</button></form>`;}});
document.addEventListener('submit',e=>{if(!e.target.matches('.checkout-form'))return;e.preventDefault();const data=new FormData(e.target),ar=language==='ar',payment=data.get('payment');bubble(`${ar?'الاسم':'Name'}: ${data.get('customerName')}<br>${ar?'الجوال':'Phone'}: ${data.get('phone')}<br>${ar?'الدفع':'Payment'}: ${payment}`,'outgoing');if(payment==='cash'){bubble(ar?'تم استلام طلبك بنجاح ✅':'Your order has been received ✅');screenEl.innerHTML='';}else{bubble(ar?'سيتم تحويلك لصفحة الدفع عند ربط بوابة الدفع.':'Demo payment step — this will open the payment API when connected.');screenEl.innerHTML=`<div class="payment-demo"><b>${ar?'صفحة الدفع التجريبية':'Demo payment page'}</b><p>${ar?'Apple Pay / مدى جاهز للربط لاحقًا.':'Apple Pay / Mada ready for API integration.'}</p><button data-action="finish-payment">${ar?'متابعة':'Continue'}</button></div>`;}});
backEl.addEventListener('click',()=>{if(mode==='items'||mode==='cart')catalog();else{chatEl.innerHTML='';mode='welcome';composer();}});
resetEl.addEventListener('click',()=>{cart={};language=null;mode='welcome';chatEl.innerHTML='';composer();});
composer();
const originalWelcome=welcome;
welcome=()=>{const ar=language==='ar';bubble(ar?'<b>أهلاً بك في لقمة 👋</b><br>تفضل هذا المنيو واختار اللي تشتهيه.':'<b>Hi! Welcome to Luqma 👋</b><br>Browse our menu below.');bubble(`<div class="catalog-card"><img src="${products[1].image}"><div><b>${ar?'كل المنتجات':'All Products'}</b><small>${products.length} ${ar?'منتج':'items'}</small><p>${ar?'تصفح جميع المنتجات من هنا.':'Checkout our All Products here.'}</p><button data-action="items">${ar?'عرض المنتجات':'View items'}</button></div></div>`);mode='catalog';};
