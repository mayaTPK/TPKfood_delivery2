let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">K${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">K${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = 'K' + totalPrice;
}



const foodnote = document.getElementById("placeorder");
foodnote.addEventListener("click", ()=>{
    Notification.requestPermission().then(perm =>{
        if (perm === "granted"){
            new Notification("Thank you for your order. food is being prepared!",{
                body: "Click on 'See Route on Map' to see distance from restaurant to you😊."
            })
        }
    })
})


document.getElementById('placeorder').addEventListener('click', function() {
    var toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(function(){ toast.className = "toast"; }, 3000);
   });



      // disableling buttons
            window.addEventListener("allButtons", function () {
              const firstButton = document.getElementById("placeoder");
              const secondButton = document.getElementById("secondButton");
              const thirdButton = document.getElementById("thirdButton");

              firstButton.addEventListener("click", function () {
                if (secondButton.disabled || thirdButton.disabled) {
                  secondButton.disabled = false;
                  thirdButton.disabled = false;
                } else {
                  alert("press the first button");
                  secondButton.disabled = true;
                  thirdButton.disabled = true;
                }
              });
            });