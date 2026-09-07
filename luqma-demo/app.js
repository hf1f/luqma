const chatEl = document.querySelector('#conversation');
const screenEl = document.querySelector('#screen');
const backEl = document.querySelector('#back');
const products = [
  {id:'burger',name:'Burger',price:23,image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=85'},
  {id:'pizza',name:'Pizza',price:14,range:'14–21',image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=85'},
  {id:'cola',name:'Cola',price:3,image:'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=500&q=85'},
  {id:'sprite',name:'Sprite',price:3,image:'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=500&q=85'},
  {id:'sevenup',name:'7UP',price:3,image:'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=85'},
  {id:'pepsi',name:'Pepsi',price:3,image:'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=500&q=85'},
  {id:'mirinda-orange',name:'Mirinda Orange',price:3,image:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=85'},
  {id:'mirinda-strawberry',name:'Mirinda Strawberry',price:3,image:'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&q=85'},
  {id:'dew',name:'Mountain Dew',price:3,image:'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=500&q=85'},
  {id:'kenza',name:'Kenza',price:2.5,image:'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=500&q=85'},
  {id:'fries',name:'Fries',price:5,image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85'},
  {id:'special-fries',name:'Special Fries',price:15,image:'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=85'},
  {id:'salad',name:'Salad',price:14,image:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=85'}
];
let cart={},mode='welcome';
const money=n=>`${Number(n).toFixed(2).replace('.00','')} SAR`;
const time=()=>new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
function bubble(html,type='incoming'){const el=document.createElement('div');el.className=`bubble ${type}`;el.innerHTML=`${html}<small>${time()} ${type==='outgoing'?'✓✓':''}</small>`;chatEl.appendChild(el);chatEl.scrollTop=chatEl.scrollHeight;}
function composer(){screenEl.innerHTML='<form class="composer"><input id="messageInput" autocomplete="off" placeholder="Type a message"><button aria-label="Send">➤</button></form>';const form=screenEl.querySelector('form');form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');if(input.value.trim()){bubble(input.value.trim(),'outgoing');welcome();input.value='';}});screenEl.querySelector('input').focus();}
function welcome(){bubble('<b>Hi! Welcome to Luqma 👋</b><br>Browse our menu below.');bubble(`<div class="catalog-card"><img src="${products[1].image}"><div><b>All Products</b><small>${products.length} items</small><p>Checkout our All Products here.</p><button data-action="items">View items</button></div></div>`);mode='catalog';}
function total(){return products.reduce((s,p)=>s+p.price*(cart[p.id]||0),0);}
function catalog(){mode='items';screenEl.innerHTML=`<div class="catalog-panel"><div class="panel-title"><b>All Products</b><span>${Object.values(cart).reduce((a,b)=>a+b,0)} items</span></div><div class="product-list">${products.map(p=>`<article class="product"><img src="${p.image}"><div><b>${p.name}</b><small>${p.range?`From ${money(p.price)}`:money(p.price)}</small></div><div class="qty"><button data-minus="${p.id}">−</button><strong>${cart[p.id]||0}</strong><button data-plus="${p.id}">+</button></div></article>`).join('')}</div><button class="cart-button" data-action="cart">View cart · ${money(total())}</button></div>`;}
function showCart(){mode='cart';const selected=products.filter(p=>cart[p.id]);screenEl.innerHTML=`<div class="cart-panel"><div class="panel-title"><b>Your cart</b><span>${selected.reduce((a,p)=>a+cart[p.id],0)} items</span></div>${selected.length?selected.map(p=>`<article class="cart-row"><img src="${p.image}"><div><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="qty"><button data-minus="${p.id}">−</button><strong>${cart[p.id]}</strong><button data-plus="${p.id}">+</button></div><strong>${money(p.price*cart[p.id])}</strong></article>`).join(''):'<p class="empty">Your cart is empty.</p>'}<div class="cart-total"><b>Estimated total</b><strong>${money(total())}</strong></div>${selected.length?'<button class="cart-button" data-action="send-cart">Send cart</button>':''}<button class="link-button" data-action="items">Add more</button></div>`;}
document.addEventListener('click',e=>{const action=e.target.closest('[data-action]')?.dataset.action,plus=e.target.closest('[data-plus]')?.dataset.plus,minus=e.target.closest('[data-minus]')?.dataset.minus;if(plus){cart[plus]=(cart[plus]||0)+1;mode==='cart'?showCart():catalog();}if(minus){cart[minus]=Math.max(0,(cart[minus]||0)-1);if(!cart[minus])delete cart[minus];mode==='cart'?showCart():catalog();}if(action==='items'){bubble('Menu','outgoing');catalog();}if(action==='cart')showCart();if(action==='send-cart'){bubble(`<b>🛒 ${Object.values(cart).reduce((a,b)=>a+b,0)} items</b><br>${money(total())} (estimated total)`,'outgoing');bubble('Hi! Thank you for your order. Please share your shipping address to proceed.');screenEl.innerHTML='<form class="address-form"><textarea placeholder="Enter your delivery address"></textarea><button>Provide address</button></form>';}});
backEl.addEventListener('click',()=>{if(mode==='items'||mode==='cart')catalog();else{chatEl.innerHTML='';mode='welcome';composer();}});
composer();
