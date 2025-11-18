import { sendOrder } from './hookHome/registroPedido.js'

const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const closeModalBtn= document.getElementById("close-modal-btn")
const cartCounter  =document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const checkoutBtn = document.getElementById("checkout-btn")

let cart = [];
checkoutBtn.addEventListener("click", (e) => {
    const token = localStorage.getItem("token");

    if (!token) {

        e.preventDefault();

        Toastify({
            text: "Você precisa estar logado para finalizar o pedido!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#f56565",
        }).showToast();

        return;
    }
});

checkoutBtn.addEventListener("click", () => sendOrder(cart, updateCartModal));

// abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
})

// fechar o modal qnd clicar fora
cartModal.addEventListener("click",function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})


// fechar pelo botao fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
   
   let parentButton = event.target.closest(".add-to-cart-btn")
   
   if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))

    // adicionar no carrinho

    addToCart(name, price)



   }
})

// função p adicionar no carrrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        // se o item existe muda apenas a quantidade (+1)
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()

}


// atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn border bg-red-700 rounded-md p-2 text-white" data-name="${item.name}">
                    Remover
                </button>

            </div>
        `
        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    
    cartCounter.innerHTML = cart.length;
}

// função para remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.style.display = "none"
    }

    //
})



document.getElementById("perfil").addEventListener("click", () => {
    const token = localStorage.getItem("token");

    if (token) {
        window.location.href = "./perfil/perfil.html";
    } else {
        window.location.href = "./login/login.html";
    }
});
