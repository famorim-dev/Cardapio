import { API } from "../utils/api.js";

export async function sendOrder(cart, updateCartModal) {
    const address = document.getElementById("address").value;
    const paymentOption = document.querySelector("input[name='btn']:checked").value;

    if (cart.length === 0) {
        alert("Carrinho vazio");
        return;
    }

    if (!address) {
        alert("Digite seu endereço completo");
        return;
    }

    const paymentMap = {
        option1: "pix",
        option2: "cartao",
        option3: "dinheiro"
    };

    const paymentMethod = paymentMap[paymentOption];

    const itensFormatados = cart.map((item) => ({
        produto: item.name,
        quantidade: item.quantity
    }));

    const orderData = {
        itens: itensFormatados,
        forma_pagamento: paymentMethod,
        endereco: address
    };

    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${API}/pedido/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const text = await response.text();
            let errorText;

            try {
                errorText = JSON.parse(text).message || text;
            } catch {
                errorText = text;
            }

            alert(errorText);
            return;
        }

        const result = await response.text();
        console.log("Pedido realizado →", result);

        alert("Pedido realizado com sucesso!");

        cart.length = 0;
        updateCartModal();

    } catch (err) {
        console.error(err);
        alert("Erro de conexão com o servidor");
    }
}
