// --------------------nav-scroll-------------------------
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll',()=>{
        const navbar = document.querySelector('.navbar');
        if(navbar){
            const scrollpos = window.scrollY;
            console.log(scrollpos);
    
            if(window.scrollY > 50){
                navbar.classList.add('scrolled');
            }
            else{
                navbar.classList.remove('scrolled');
            }
        } else{
            console.error("could not find")
        }
    });



    // ------------------carticon&closeicon----------------------

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

    // ------------------nav-menus-------------

    const menuicon = document.querySelector(".menubar");
    const menus = document.querySelector(".menus");
    const navclose = document.querySelector("#nav-close");

    menuicon.addEventListener("click",()=>{menus.classList.add("active")});
    navclose.addEventListener("click",()=>{menus.classList.remove("active")});

    // -----------------------ORIGINAL UNTOUCHED SIDEBAR USER LOGIN TOGGLE-------------------
        const usericon = document.querySelector("#user-icon");
        const userlogin = document.querySelector(".user-login-icon");
        const loginclose = document.querySelector("#login-close");

        if(usericon && userlogin) {
            usericon.addEventListener("click", () => {
                const loggedUser = localStorage.getItem("loggedUser");
                if (loggedUser) {
                    if (confirm("Do you want to Logout?")) {
                        handleCustomLogout();
                    }
                } else {
                    // Guest-ah irundhal ungaloda original design padi side bar login screen open aagum
                    userlogin.classList.add("active");
                    // Sidebar thirakkum pothu center-la global entrance popup irundhal athai moodividugirom
                    const globalPopup = document.getElementById("global-login-popup");
                    if(globalPopup) globalPopup.classList.remove("popup-active");
                }
            });
        }

        if(loginclose && userlogin) {
            loginclose.addEventListener("click", () => {
                userlogin.classList.remove("active");
            });
        }

        // ================= WEBPAGE ENTRY CENTRAL GLOBAL POPUP CHECK =================
        const loggedUser = localStorage.getItem("loggedUser");
        const globalPopup = document.getElementById("global-login-popup");

        if (!loggedUser && globalPopup) {
            // First time webpage open aagum pothu central popup mattum active-login aagum
            globalPopup.classList.add("popup-active");
            // Force-fully ensures that your sidebar login block stays hidden on initial entry layout
            if(userlogin) userlogin.classList.remove("active"); 
        } else {
            syncUserInterface();
        }
});
// cart process mechanism
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

    const orderBtn = document.querySelector(".orderbtn"); 

    orderBtn.addEventListener("click", () => {
        const currentcartboxes = cartcontent.querySelectorAll(".cart-box");

        if (currentcartboxes.length === 0) {
            alert("Your cart is empty! Add some items first.");
            return;
        }

        alert("Order Placed Successfully!");

        currentcartboxes.forEach(cartBox => {
            cartBox.remove();
        });

        updateCartnotification(-cartcount);

       const totalPriceElement = document.querySelector(".total-price");
        if (totalPriceElement) {
            totalPriceElement.textContent = "$0.00";
        }
});

// ===== REGISTER FUNCTION =====

function registerUser(){
   

    let name =document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if(name === "" || email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    let user = {
        name:name,
        email:email,
        password:password};

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful");

    window.location.href = "index.html";
}
// ================= GLOBAL POPUP SUBMIT FUNCTION =================
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const globalPopup = document.getElementById("global-login-popup");

    if (executeLoginValidation(storedUser, email, password)) {
        if (globalPopup) globalPopup.classList.remove("popup-active");
    }
    document.getElementById("loginEmail").value="";
    document.getElementById("loginPassword").value = "";
}

// ================= SIDEBAR EXTRA SUBMIT FUNCTION =================
function loginUserFromSidebar(event) {
    event.preventDefault();
    const email = document.getElementById("sideEmail").value.trim();
    const password = document.getElementById("sidePassword").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const sidebarPopup = document.querySelector(".user-login-icon");

    if (executeLoginValidation(storedUser, email, password)) {
        if (sidebarPopup) sidebarPopup.classList.remove("active");
    }
}

function executeLoginValidation(storedUser, email, password) {
    if (!storedUser) {
        alert("No user found. Please register first.");
        document.getElementById("sideEmail").value = "";
        document.getElementById("sidePassword").value = "";
        return false;
    }
    if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("loggedUser", JSON.stringify(storedUser));
        alert("Login Successful");
        document.getElementById("sideEmail").value = "";
        document.getElementById("sidePassword").value = "";
        syncUserInterface();
        return true;
    }
    alert("Invalid Email or Password");
    document.getElementById("sideEmail").value = "";
    document.getElementById("sidePassword").value = "";
    return false;
}

// ================= INTERFACE RENDERING STATE UPDATER =================
function syncUserInterface() {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const welcomeUser = document.getElementById("welcomeUser");
    const mainUserIcon = document.getElementById("user-icon");

    if (loggedUser) {
        if(welcomeUser) {
            welcomeUser.innerText = `Hi  ${loggedUser.name}`;
            welcomeUser.style.color = "#ffffff";
        }
        if(mainUserIcon) mainUserIcon.style.color = "#ffffff"; 
    } else {
        if(welcomeUser) welcomeUser.innerText = "Welcome Guest";
        if(mainUserIcon) mainUserIcon.style.color = "white"; 
    }
}

function handleCustomLogout() {
    localStorage.removeItem("loggedUser");
    alert("Logged out successfully.");
    syncUserInterface();
    
    const globalPopup = document.getElementById("global-login-popup");
    if (globalPopup) globalPopup.classList.add("popup-active");
}


function continueAsGuest() {
    const welcomeuser = document.getElementById("welcomeUser");
    if(welcomeuser) {
            welcomeuser.innerText = `Welcome Guest`;
            welcomeuser.style.color = "#ffffff";
        }
    const globalPopup = document.getElementById("global-login-popup");
    if (globalPopup) globalPopup.classList.remove("popup-active");
}