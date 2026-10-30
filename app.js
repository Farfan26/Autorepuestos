'use strict';
// Datos ficticios para la demostración académica. Reemplazar por inventario real.
const products=[
{id:1,name:'Pastillas de freno premium',sku:'ARP-FR-101',category:'Frenos',price:125,icon:'🛑'},
{id:2,name:'Disco de freno ventilado',sku:'ARP-FR-102',category:'Frenos',price:195,icon:'⚙️'},
{id:3,name:'Filtro de aceite universal',sku:'ARP-FI-201',category:'Filtros',price:39,icon:'🛢️'},
{id:4,name:'Filtro de aire de motor',sku:'ARP-FI-202',category:'Filtros',price:55,icon:'🌬️'},
{id:5,name:'Bujía de encendido',sku:'ARP-MO-301',category:'Motor',price:32,icon:'⚡'},
{id:6,name:'Kit de distribución',sku:'ARP-MO-302',category:'Motor',price:345,icon:'🔩'},
{id:7,name:'Amortiguador delantero',sku:'ARP-SU-401',category:'Suspensión',price:245,icon:'🔧'},
{id:8,name:'Rótula de suspensión',sku:'ARP-SU-402',category:'Suspensión',price:89,icon:'🔗'},
{id:9,name:'Batería automotriz 12 V',sku:'ARP-EL-501',category:'Electricidad',price:390,icon:'🔋'},
{id:10,name:'Juego de fusibles',sku:'ARP-EL-502',category:'Electricidad',price:24,icon:'💡'},
{id:11,name:'Escobillas limpiaparabrisas',sku:'ARP-AC-601',category:'Accesorios',price:49,icon:'🚘'},
{id:12,name:'Kit de herramientas básico',sku:'ARP-AC-602',category:'Accesorios',price:179,icon:'🧰'}];
const categories=[['Frenos','🛑'],['Filtros','🛢️'],['Motor','⚙️'],['Suspensión','🔧'],['Electricidad','🔋'],['Accesorios','🚗']];
const $=id=>document.getElementById(id),money=n=>new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN'}).format(n);
let cart={};try{const saved=JSON.parse(localStorage.getItem('arp-cart')||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))for(const [id,qty] of Object.entries(saved))if(products.some(p=>p.id===Number(id))&&Number.isInteger(qty)&&qty>0&&qty<=99)cart[id]=qty;}catch{}
let toastTimer;function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2800)}
function persist(){localStorage.setItem('arp-cart',JSON.stringify(cart));renderCart()}
function add(id){cart[id]=Math.min(99,(cart[id]||0)+1);persist();toast('Producto añadido al carrito')}
function renderProducts(){const q=$('search').value.trim().toLocaleLowerCase('es');const cat=$('categoryFilter').value;let list=products.filter(p=>(cat==='all'||p.category===cat)&&[p.name,p.sku,p.category].some(s=>s.toLocaleLowerCase('es').includes(q)));if($('sort').value==='asc')list.sort((a,b)=>a.price-b.price);if($('sort').value==='desc')list.sort((a,b)=>b.price-a.price);$('products').innerHTML=list.map(p=>`<article class="product"><div class="product-art" aria-hidden="true">${p.icon}</div><div class="product-body"><small>${p.category}</small><h3>${p.name}</h3><span class="sku">Código: ${p.sku}</span><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}" aria-label="Agregar ${p.name}">+ Añadir</button></div></div></article>`).join('');$('empty').hidden=list.length>0}
function renderCart(){let count=0,total=0;const rows=[];for(const [id,qty] of Object.entries(cart)){const p=products.find(x=>x.id===Number(id));if(!p)continue;count+=qty;total+=qty*p.price;rows.push(`<div class="cart-item"><div><strong>${p.name}</strong><small>${p.sku} · ${money(p.price)} c/u</small></div><div class="qty"><button data-qty="${id}" data-delta="-1" aria-label="Reducir cantidad">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Aumentar cantidad">+</button></div></div>`)}$('cartItems').innerHTML=rows.join('')||'<p>Tu carrito está vacío. Explora el catálogo para comenzar.</p>';$('cartCount').textContent=count;$('total').textContent=money(total);$('checkout').disabled=count===0}
function drawer(open){$('drawer').classList.toggle('open',open);$('drawer').setAttribute('aria-hidden',String(!open));$('overlay').hidden=!open;if(open)$('cartClose').focus();else $('cartOpen').focus()}
function quote(){const lines=['COTIZACIÓN - AUTOREPUESTOS PRO','Pedido demostrativo (no confirmado)',''];let total=0;for(const [id,qty] of Object.entries(cart)){const p=products.find(x=>x.id===Number(id));if(!p)continue;lines.push(`${qty} x ${p.name} (${p.sku}) - ${money(qty*p.price)}`);total+=qty*p.price}lines.push('',`Subtotal referencial: ${money(total)}`,'Solicito confirmar disponibilidad, compatibilidad y precio final.');const subject=encodeURIComponent('Solicitud de cotización - AutoRepuestos Pro');const body=encodeURIComponent(lines.join('\n'));const address='ventas@ejemplo.com';window.location.href=`mailto:${address}?subject=${subject}&body=${body}`;toast('Se abrirá tu correo. Cambia ventas@ejemplo.com por el correo real del negocio.')}
$('categories').innerHTML=categories.map(([name,icon])=>`<button class="category" data-category="${name}"><div class="emoji">${icon}</div><h3>${name}</h3></button>`).join('');$('categoryFilter').innerHTML+=categories.map(([name])=>`<option value="${name}">${name}</option>`).join('');
['search','categoryFilter','sort'].forEach(id=>$(id).addEventListener(id==='search'?'input':'change',renderProducts));
$('products').addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(btn)add(Number(btn.dataset.add))});$('categories').addEventListener('click',e=>{const btn=e.target.closest('[data-category]');if(!btn)return;$('categoryFilter').value=btn.dataset.category;renderProducts();$('catalogo').scrollIntoView({behavior:'smooth'})});
$('cartOpen').addEventListener('click',()=>drawer(true));$('cartClose').addEventListener('click',()=>drawer(false));$('overlay').addEventListener('click',()=>drawer(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('drawer').classList.contains('open'))drawer(false)});
$('cartItems').addEventListener('click',e=>{const btn=e.target.closest('[data-qty]');if(!btn)return;const id=btn.dataset.qty;const next=(cart[id]||0)+Number(btn.dataset.delta);if(next<=0)delete cart[id];else cart[id]=Math.min(next,99);persist()});$('clearCart').addEventListener('click',()=>{cart={};persist();toast('Carrito vaciado')});$('checkout').addEventListener('click',()=>openPayment(true));
$('menuToggle').addEventListener('click',()=>{const open=$('nav').classList.toggle('open');$('menuToggle').setAttribute('aria-expanded',String(open))});$('nav').addEventListener('click',e=>{if(e.target.closest('a')){$('nav').classList.remove('open');$('menuToggle').setAttribute('aria-expanded','false')}});
$('contactForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const subject=encodeURIComponent('Consulta de '+f.get('name'));const body=encodeURIComponent(`Nombre o taller: ${f.get('name')}\nCorreo: ${f.get('email')}\nConsulta: ${f.get('message')}`);window.location.href=`mailto:ventas@ejemplo.com?subject=${subject}&body=${body}`;toast('Se abrirá tu correo para enviar la consulta.')});$('year').textContent=new Date().getFullYear();renderProducts();renderCart();


// AUTENTICACIÓN DE DEMOSTRACIÓN: almacenamiento local, NO válida para producción.
// Para cuentas reales utilizar autenticación del servidor (Supabase, Firebase, etc.).
const AUTH_USERS='arp-demo-users-v1', AUTH_SESSION='arp-demo-session-v1';
const getUsers=()=>{try{const v=JSON.parse(localStorage.getItem(AUTH_USERS)||'[]');return Array.isArray(v)?v:[]}catch{return []}};
const getSession=()=>{try{return JSON.parse(sessionStorage.getItem(AUTH_SESSION)||'null')}catch{return null}};
let authTab='login';
function updateAccount(){
 const s=getSession();$('accountLabel').textContent=s?'Mi cuenta':'Ingresar';
 $('accountProfile').hidden=!s;$('loginForm').hidden=!!s||authTab!=='login';$('registerForm').hidden=!!s||authTab!=='register';
 $('tabLogin').hidden=!!s;$('tabRegister').hidden=!!s;
 $('welcomeName').textContent=s?`Bienvenido, ${s.name}`:'';
 $('accountTitle').textContent=s?'Mi cuenta':authTab==='login'?'Accede a tu cuenta':'Crea tu cuenta';
}
function switchAuth(tab){authTab=tab;$('accountError').textContent='';$('tabLogin').classList.toggle('selected',tab==='login');$('tabRegister').classList.toggle('selected',tab==='register');updateAccount()}
function showAccount(open){$('accountModal').hidden=!open;$('accountBackdrop').hidden=!open;$('accountModal').setAttribute('aria-hidden',String(!open));if(open){updateAccount();$('accountClose').focus()}else $('accountOpen').focus()}
async function passwordDigest(password,salt){
 const bytes=new TextEncoder().encode(salt+':'+password);
 const hash=await crypto.subtle.digest('SHA-256',bytes);
 return Array.from(new Uint8Array(hash),b=>b.toString(16).padStart(2,'0')).join('');
}
$('accountOpen').addEventListener('click',()=>showAccount(true));
$('accountClose').addEventListener('click',()=>showAccount(false));
$('accountBackdrop').addEventListener('click',()=>showAccount(false));
$('tabLogin').addEventListener('click',()=>switchAuth('login'));
$('tabRegister').addEventListener('click',()=>switchAuth('register'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('accountModal').hidden)showAccount(false)});
$('registerForm').addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget;const data=new FormData(form);
 const name=String(data.get('name')).trim(),email=String(data.get('email')).trim().toLowerCase(),password=String(data.get('password'));
 if(name.length<2||password.length<8){$('accountError').textContent='Revisa el nombre y la contraseña.';return}
 const users=getUsers();if(users.some(u=>u.email===email)){$('accountError').textContent='Ya existe una cuenta de demostración con ese correo.';return}
 try{
  const salt=Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('');
  users.push({name,email,salt,hash:await passwordDigest(password,salt)});
  localStorage.setItem(AUTH_USERS,JSON.stringify(users));
  sessionStorage.setItem(AUTH_SESSION,JSON.stringify({name,email}));
  form.reset();updateAccount();toast('Cuenta de demostración creada');showAccount(false);
 }catch{$('accountError').textContent='No fue posible guardar la cuenta en este navegador.'}
});
$('loginForm').addEventListener('submit',async e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);
 const email=String(data.get('email')).trim().toLowerCase(),password=String(data.get('password'));
 const user=getUsers().find(u=>u.email===email);
 if(!user||await passwordDigest(password,user.salt)!==user.hash){$('accountError').textContent='Correo o contraseña incorrectos.';return}
 sessionStorage.setItem(AUTH_SESSION,JSON.stringify({name:user.name,email:user.email}));
 e.currentTarget.reset();updateAccount();toast('Sesión iniciada');showAccount(false);
});
$('logout').addEventListener('click',()=>{sessionStorage.removeItem(AUTH_SESSION);switchAuth('login');toast('Sesión cerrada')});
updateAccount();

// Pasarela de pago de DEMOSTRACIÓN: no procesa dinero ni captura tarjetas.
function openPayment(open){
 $('paymentModal').hidden=!open;$('paymentBackdrop').hidden=!open;
 $('paymentModal').setAttribute('aria-hidden',String(!open));
 if(open){let total=0;for(const [id,q] of Object.entries(cart)){const p=products.find(p=>p.id===Number(id));if(p)total+=p.price*q}
 $('paymentTotal').textContent=money(total);$('paymentResult').textContent='';drawer(false);$('paymentClose').focus()}
 else $('cartOpen').focus();
}
$('paymentClose').addEventListener('click',()=>openPayment(false));
$('paymentBackdrop').addEventListener('click',()=>openPayment(false));
$('paymentForm').addEventListener('change',e=>{
 if(e.target.name!=='method')return;
 $('paymentInstructions').textContent=e.target.value==='yape'
 ?'Yape: para aceptar pagos reales, configura el número oficial y un flujo de verificación de operaciones. Esta demo no genera QR ni confirma transferencias.'
 :'Tarjeta: los pagos reales requieren una pasarela segura (por ejemplo, Culqi, Mercado Pago o Niubiz). Esta demo no pide datos de tarjeta.';
});
$('paymentForm').addEventListener('submit',e=>{
 e.preventDefault();if(!Object.keys(cart).length){$('paymentResult').textContent='El carrito está vacío.';return}
 const f=new FormData(e.currentTarget),method=f.get('method');
 if(!['yape','tarjeta'].includes(method))return;
 const customer=String(f.get('customer')).trim(),email=String(f.get('email')).trim();
 let total=0;const items=[];
 for(const [id,qty] of Object.entries(cart)){const p=products.find(x=>x.id===Number(id));if(p){items.push(`${qty} x ${p.name} (${p.sku})`);total+=p.price*qty}}
 const detail=`PEDIDO DE DEMOSTRACIÓN - AUTOREPUESTOS PRO\nCliente: ${customer}\nCorreo: ${email}\nMétodo solicitado: ${method==='yape'?'Yape':'Tarjeta'}\n${items.join('\n')}\nTotal referencial: ${money(total)}\nNO PAGADO - PENDIENTE DE CONFIRMACIÓN`;
 const subject=encodeURIComponent('Solicitud de pago (demostración) - AutoRepuestos Pro');
 window.location.href=`mailto:ventas@ejemplo.com?subject=${subject}&body=${encodeURIComponent(detail)}`;
 $('paymentResult').textContent='Solicitud preparada en tu correo. No se ha realizado ningún pago.';
});
