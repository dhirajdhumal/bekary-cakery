/* ==================== Login ==================== */

function login() {

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;


    let registeredEmail =
        localStorage.getItem("registeredEmail");

    let registeredPassword =
        localStorage.getItem("registeredPassword");


    if (
        email === registeredEmail &&
        password === registeredPassword
    ) {

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("user", email);

        alert("Login successful");

        window.location.href = "index.html";

    } 
    else {

        alert("Wrong email & password");

    }

}


/* ==================== Login Form ==================== */

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        login();

    });

}


/* ==================== Register ==================== */

function register() {

    let username = document.getElementById("username").value;

    let email = document.getElementById("registerEmail").value;

    let password = document.getElementById("registerPassword").value;

    let confirmPassword = document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Password and Confirm Password are not same");

        return;

    }


    localStorage.setItem("username", username);

    localStorage.setItem("registeredEmail", email);

    localStorage.setItem("registeredPassword", password);


    alert("Registration successful");

    window.location.href = "login.html";

}


/* ==================== Register Form ==================== */

let registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        register();

    });

}


/* ==================== Logout ==================== */

function logout(event) {

    event.preventDefault();

    localStorage.setItem("isLoggedIn", "false");

    alert("Logout successful");

    window.location.href = "login.html";

}


/* ==================== Login / Logout Button ==================== */

window.addEventListener("load", function() {

    let button = document.getElementById("loginLogout");

    if (!button) {
        return;
    }


    if (localStorage.getItem("isLoggedIn") === "true") {

        button.innerText = "Logout";

        button.onclick = logout;

    } else {

        button.innerText = "Login";

        button.onclick = function() {

            window.location.href = "login.html";

        };

    }

});



/* ==================== Add To Cart ==================== */

let addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.preventDefault();


        let card =
            button.closest(".delicious-product-card") ||
            button.closest(".product-card");


        let name =
            card.querySelector("h3").innerText;


        let priceElement =
            card.querySelector(".delicious-product-price") ||
            card.querySelector(".price");


        let price =
            priceElement.innerText;


        let img =
            card.getElementsByTagName("img")[0].src;


        localStorage.setItem("productName", name);

        localStorage.setItem("productPrice", price);

        localStorage.setItem("productImg", img);


        alert(name + " added to cart");


        window.location.href = "cart.html";

    });

});


/* ==================== Show Product In Cart ==================== */

let cartItems =
    document.getElementById("cartItems");


if (cartItems) {

    let name =
        localStorage.getItem("productName");

    let price =
        localStorage.getItem("productPrice");

    let img =
        localStorage.getItem("productImg");


    if (name && price && img) {

        cartItems.innerHTML = `

            <tr>

                <td class="cart-product">

                    <img src="${img}" alt="${name}">

                    <div>

                        <h3>
                            ${name}
                        </h3>

                    </div>

                </td>


                <td class="product-price">

                    ${price}

                </td>


                <td>

                    <div class="table-quantity">

                        <button
                            type="button"
                            class="quantity-minus">

                            -

                        </button>


                        <span>
                            1
                        </span>


                        <button
                            type="button"
                            class="quantity-plus">

                            +

                        </button>

                    </div>

                </td>


                <td>

                    <strong class="product-total">

                        ${price}

                    </strong>

                </td>


                <td>

                    <button
                        type="button"
                        class="table-remove">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;
        updateSubtotal();

    }

}


/* ==================== Quantity ==================== */

let plus =
    document.querySelectorAll(".quantity-plus");

let minus =
    document.querySelectorAll(".quantity-minus");


plus.forEach(function(button) {

    button.addEventListener("click", function() {

        button.previousElementSibling.innerText++;

        updateProductTotal();

    });

});


minus.forEach(function(button) {

    button.addEventListener("click", function() {

        if (
            button.nextElementSibling.innerText > 1
        ) {

            button.nextElementSibling.innerText--;

            updateProductTotal();

        }

    });

});


/* ==================== Product Total ==================== */

function updateProductTotal() {

    let cartRows =
        document.querySelectorAll(
            ".cart-table tbody tr"
        );


    cartRows.forEach(function(row) {

        let quantity =
            row.querySelector(
                ".table-quantity span"
            );


        let price =
            row.querySelector(
                ".product-price"
            );


        let total =
            row.querySelector(
                ".product-total"
            );


        if (
            quantity &&
            price &&
            total
        ) {

            total.innerText =
                "₹" +
                (
                    Number(
                        price.innerText.replace("₹", "")
                    ) *
                    Number(quantity.innerText)
                );

        }

    });


    updateSubtotal();

}


/* ==================== Subtotal ==================== */

function updateSubtotal() {

    let totals =
        document.querySelectorAll(
            ".product-total"
        );


    let subtotal = 0;


    totals.forEach(function(total) {

        subtotal +=
            Number(
                total.innerText.replace("₹", "")
            );

    });


    let subtotalElement =
        document.getElementById("subtotal");


    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" + subtotal;

    }


    updateGrandTotal();

}


/* ==================== Grand Total ==================== */

function updateGrandTotal() {

    let subtotalElement =
        document.getElementById("subtotal");

    let grandTotalElement =
        document.getElementById("grandTotal");

    let deliveryElement =
        document.getElementById("deliveryFee");


    if (
        !subtotalElement ||
        !grandTotalElement
    ) {

        return;

    }


    let subtotal =
        Number(
            subtotalElement.innerText.replace("₹", "")
        );


    if (subtotal === 0) {

        grandTotalElement.innerText =
            "₹0";


        if (deliveryElement) {

            deliveryElement.innerText =
                "₹0";

        }

    } 
    else {

        let deliveryFee = 50;


        if (deliveryElement) {

            deliveryElement.innerText =
                "₹" + deliveryFee;

        }


        grandTotalElement.innerText =
            "₹" +
            (subtotal + deliveryFee);

    }

}


/* ==================== Remove Product ==================== */

let removeButtons =
    document.querySelectorAll(".table-remove");


removeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let row =
            button.closest("tr");


        row.remove();


        localStorage.removeItem("productName");

        localStorage.removeItem("productPrice");

        localStorage.removeItem("productImg");


        updateSubtotal();

        checkCart();

    });

});


/* ==================== Empty Cart ==================== */

function checkCart() {

    let rows =
        document.querySelectorAll(
            ".cart-table tbody tr"
        );


    if (rows.length === 0) {

        let table =
            document.querySelector(".cart-table");


        let heading =
            document.querySelector(
                ".cart-table-container h2"
            );


        if (table) {

            table.style.display = "none";

        }


        if (heading) {

            heading.innerText =
                "Your Cart is Empty";

        }

    }

}


/* ==================== Checkout ==================== */

let checkoutButton =
    document.getElementById("checkoutButton");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {

               let grandTotalElement = document.getElementById("grandTotal");
            if (
                localStorage.getItem("isLoggedIn")
                === "true"
            ) {
                if(grandTotalElement.innerText === "₹0"){
                    alert(
                        "Your cart is empty. Please add items to your cart before checkout."
                    );
                    return;

                }

                alert(
                    "Order placed successfully!"
                );

            } 
            else {

                alert(
                    "Please login before checkout"
                );


                window.location.href =
                    "login.html";

            }

        }
    );

}

/* ==================== Custom Cake ==================== */

let customCakeForm =
    document.getElementById("customCakeForm");


if (customCakeForm) {

    customCakeForm.addEventListener("submit", function(event) {

        event.preventDefault();


        let cakeType =
            document.getElementById("cakeType").value;

        let flavor =
            document.getElementById("flavor").value;

        let weight =
            document.getElementById("weight").value;

        let shape =
            document.getElementById("shape").value;

        let cakeColor =
            document.getElementById("cakeColor").value;

        let cakeMessage =
            document.getElementById("cakeMessage").value;

        let deliveryDate =
            document.getElementById("deliveryDate").value;

        let instructions =
            document.getElementById("instructions").value;


        let cakeRequest = {

            cakeType: cakeType,

            flavor: flavor,

            weight: weight,

            shape: shape,

            cakeColor: cakeColor,

            cakeMessage: cakeMessage,

            deliveryDate: deliveryDate,

            instructions: instructions

        };


        let requests =
            JSON.parse(
                localStorage.getItem("customCakeRequests")
            ) || [];


        requests.push(cakeRequest);


        localStorage.setItem(
            "customCakeRequests",
            JSON.stringify(requests)
        );


        alert(
            "Custom cake request submitted successfully!"
        );


        customCakeForm.reset();


        showCustomCakeRequests();

    });

}


/* ==================== Show Custom Cake Requests ==================== */

function 
showCustomCakeRequests() {

    let container =
        document.getElementById("customCakeRequests");


    if (!container) {

        return;

    }


    let requests =
        JSON.parse(
            localStorage.getItem("customCakeRequests")
        ) || [];


    container.innerHTML = "";


    requests.forEach(function(request, index) {

        container.innerHTML += `

            <div class="custom-request">

                <h3>
                    Custom Cake Request ${index + 1}
                </h3>

                <p>
                    <strong>Cake Type:</strong>
                    ${request.cakeType}
                </p>

                <p>
                    <strong>Flavor:</strong>
                    ${request.flavor}
                </p>

                <p>
                    <strong>Weight:</strong>
                    ${request.weight}
                </p>

                <p>
                    <strong>Shape:</strong>
                    ${request.shape}
                </p>

                <p>
                    <strong>Color / Theme:</strong>
                    ${request.cakeColor}
                </p>

                <p>
                    <strong>Message on Cake:</strong>
                    ${request.cakeMessage}
                </p>

                <p>
                    <strong>Required Date:</strong>
                    ${request.deliveryDate}
                </p>

                <p>
                    <strong>Additional Instructions:</strong>
                    ${request.instructions}
                </p>

            </div>

        `;

    });

}


/* ==================== Load Saved Requests ==================== */

showCustomCakeRequests();
