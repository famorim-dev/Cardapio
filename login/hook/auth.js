import {API} from '../../utils/api.js'

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            const text = await response.text(); 
            let errorText;

            try {
                const json = JSON.parse(text); 
                errorText = json.message || text;
            } catch {
                errorText = text; 
            }

            Toastify({
                text: "Usuário ou senha inválidos",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#f56565",
            }).showToast();;
            return;
        }

        const token = await response.text();

        localStorage.setItem("token", token);

        window.location.href = "../../index.html";

    } catch (err) {
        Toastify({
            text: "Erro de conexão com o servidor!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#f56565",
        }).showToast();
    }
});