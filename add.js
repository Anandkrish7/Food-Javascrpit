let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart")


cartIcon.onclick = () => {
    cart.classList.add("active");

};



closeCart.onclick = () => {
    cart.classList.remove("active");
};


if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
} else{
    ready();
}


function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i=0; i< removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click',removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity");
for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
    } 
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

}
document.getElementsByClassName('btn-buy')[0]
.addEventListener('click',buyButtonClicked);


function buyButtonClicked(){
    alert('Your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}



function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;

    }
    updatetotal();
}

function addCartClicked(event) {
    var button =event.target;
    var shopDishes = button.parentElement;
    var title = shopDishes.getElementsByClassName("dish-title")[0].innerText;
    var price = shopDishes.getElementsByClassName("price")[0].innerText;
    var dishImg = shopDishes.getElementsByClassName("dish-img")[0].src;
    console.log(title,dishImg);

    addDishToCart(title,price,dishImg);
    updatetotal();
}

function addDishToCart(title,price,dishImg) {
    var cartDishBox = document.createElement("div");
    cartDishBox.classList.add('dish-box');

    var cartItems = document.getElementsByClassName("dish-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("dish-title");
    for(let i = 0;  i < cartItemNames.length; i++) {
            // alert("You have already added this item to cart");
            let dishBoxContent =  `
                                    <img src="${dishImg}" class="cart-img">
                                    <div class="detail-box">
                                        <div class="cart-dish-title">${title}</div>
                                        <div class="cart-price">${price}</div>
                                        <input type="number" value="1" class="cart-quantity">
                                    </div>
                                    <i class="fa-solid fa-trash cart-remove"></i>`
            cartDishBox.innerHTML = dishBoxContent;
            cartItems.append(cartDishBox);
            cartDishBox
            .getElementsByClassName("cart-remove")[0]
            .addEventListener("click", removeCartItem);
            cartDishBox
            .getElementsByClassName("cart-quantity")[0]
            .addEventListener("change", quantityChanged);
       
    }
    let cartContainer = document.querySelector('.cart-content');
    cartContainer.append(cartDishBox)

}
        
    





function updatetotal(){
    var dishBoxContent = document.getElementsByClassName('dish-content')[0];
    var dishBoxes = dishBoxContent.getElementsByClassName("dish-box");
    var total = 0;

    for(var i = 0; i< dishBoxes.length; i++){
        var cartBox = dishBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("Rs.",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        document.getElementsByClassName('total-price')[0].innerText = "Rs." + total;
    }
}