const products = [
 {id:1,name:"The Everyday Journal",category:"Stationery",price:14.90,desc:"A lovely place for all your thoughts.",style:"book",label:"YOUR IDEAS"},
 {id:2,name:"The Little Moments Tote",category:"Accessories",price:19.90,desc:"Carry your everyday essentials in style.",style:"tote",label:"ASOFI"},
 {id:3,name:"The Year Ahead Calendar",category:"Stationery",price:17.90,desc:"Make space for plans and possibilities.",style:"calendar",label:"A NEW CHAPTER"},
 {id:4,name:"Creative Days Colouring Book",category:"Creative",price:12.90,desc:"A little pause for your imagination.",style:"book",label:"COLOUR ME"},
 {id:5,name:"The Notes Notebook",category:"Stationery",price:11.90,desc:"For lists, sketches and bright ideas.",style:"book",label:"NOTES"},
 {id:6,name:"The Weekend Tote",category:"Accessories",price:21.90,desc:"A simple companion for little adventures.",style:"tote",label:"TAKE IT EASY"},
 {id:7,name:"The Daily Planner",category:"Stationery",price:16.90,desc:"A softer way to organise your days.",style:"calendar",label:"ONE DAY AT A TIME"},
 {id:8,name:"The Imagination Book",category:"Creative",price:13.90,desc:"Made for curious minds and creative moments.",style:"book",label:"DREAM BIG"}
];
let cart=[];
const grid=document.getElementById("productGrid");
const euro=n=>"€"+n.toFixed(2);
function renderProducts(filter="All"){grid.innerHTML=products.filter(p=>filter==="All"||p.category===filter).map(p=>`<article class="product-card"><div class="product-image ${p.style}"><span class="placeholder">${p.label}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-row"><span class="price">${euro(p.price)}</span><button class="add-button" data-add="${p.id}">Add to bag +</button></div></div></article>`).join("");}
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartSubtotal").textContent=euro(cart.reduce((s,x)=>s+x.price*x.qty,0));const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><span>${x.name} × ${x.qty}</span><span>${euro(x.price*x.qty)} <button data-remove="${x.id}" aria-label="Remove ${x.name}">✕</button></span></div>`).join(""):'<p class="empty-cart">Your bag is waiting for something lovely.</p>';}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");document.getElementById("overlay").classList.remove("show")}
grid.addEventListener("click",e=>{const id=Number(e.target.dataset.add);if(!id)return;const p=products.find(x=>x.id===id),found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});renderCart();openCart()});
document.getElementById("cartItems").addEventListener("click",e=>{const id=Number(e.target.dataset.remove);if(id){cart=cart.filter(x=>x.id!==id);renderCart()}});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");b.classList.add("active");renderProducts(b.dataset.filter)}));
document.getElementById("cartToggle").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutButton").onclick=()=>alert("This is a design preview. Connect a real checkout and Printify before accepting orders.");
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks for your interest! Connect an email platform to collect subscriptions.";});
document.getElementById("menuToggle").onclick=()=>document.querySelector(".desktop-nav").classList.toggle("show");
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
