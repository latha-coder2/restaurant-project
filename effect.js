window.addEventListener('scroll',()=>{
    const navbar = document.querySelector('.navbar');
    if(navbar){
        const scrollpos = window.scrollY;
        console.log(scrollpos);
   
        if(window.scrollY > 300){
            navbar.classList.add('scrolled');
        }
        else{
            navbar.classList.remove('scrolled');
        }
    } else{
        console.error("could not find")
    }
});


const carticon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartclose = document.querySelector("#cart-close");

carticon.addEventListener("click",()=>{cart.classList.add("active")});
cartclose.addEventListener("click",()=>{cart.classList.remove("active")});



const addcartbuttons = document.querySelectorAll(".add-cart");

addcartbuttons.forEach((button)=>{
        button.addEventListener("click",event =>{
            const foodmenus = event.target.closest(".foodmenus");
            addToCart(foodmenus);
    });
});

const cartcontent = document.querySelector(".cart-content")
function addToCart(foodmenus) {
    const itemimgsrc = foodmenus.querySelector(" img").src;
    const itemtitle = foodmenus.querySelector(".itemtitle").textContent;
    const itemprice = foodmenus.querySelector(".price").textContent;
    

    const cartitems = cartcontent.querySelectorAll(".cart-item-title")
    for (let item of cartitems){
        if(item.textContent === itemtitle){
            alert("Item already in cart");
            return;
        }
    }

    const cartbox = document.createElement("div");
    cartbox.classList.add("cart-box");
    cartbox.innerHTML=`
                <img src="${itemimgsrc}" alt="cartimg"class="cart-img">
                <div class="cart-details">
                    <h2 class="cart-item-title">${itemtitle}</h2>
                    <span class="cart-price">${itemprice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <button class="number">1</button>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash-can cart-remove"></i>
                `;
    cartcontent.appendChild(cartbox);
    updateCartnotification(+1);
    


    cartbox.querySelector(".cart-remove").addEventListener("click",()=>{
        cartbox.remove();
        updateCartnotification(-1);
        updateTotalPrice();
    });

    cartbox.querySelector(".cart-quantity").addEventListener("click",event=>{
        const numberelement = cartbox.querySelector(".number");
        const increment = cartbox.querySelector("#increment");
        const decrement = cartbox.querySelector("#decrement");
        let quantity = numberelement.textContent;

        if (event.target.id === "decrement" && quantity > 1){
            quantity--;
            if(quantity === 1 ){
                decrement.style.color = "#999";
            }
        } else if (event.target.id === "increment"){
            quantity++;
            
        }

        numberelement.textContent = quantity;
        updateTotalPrice();
    });
    
    updateTotalPrice();
    
};


const updateTotalPrice = ()=> {
    const totalpriceelement = document.querySelector(".total-price");
    const cartboxes = cartcontent.querySelectorAll(".cart-box");
    
    let total = 0;
    cartboxes.forEach(cartbox => {
        const priceelement = cartbox.querySelector(".cart-price");
        const quantityelement = cartbox.querySelector(".number");
        const price = priceelement.textContent.replace("$","");
        const quantity = quantityelement.textContent;
        total += price * quantity;
    });
    totalpriceelement.textContent = `$${total}`;
};

let cartcount = 0;
const updateCartnotification=(change => {
    const cartcountbadge = document.querySelector(".notification");
    cartcount += change;
    if(cartcount > 0){
        cartcountbadge.style.visibility ="visible";
        cartcountbadge.textContent = cartcount;
    } else {
        cartcountbadge.style.visibility = "hidden";
        cartcountbadge.textContent = ""; 
    }

});


