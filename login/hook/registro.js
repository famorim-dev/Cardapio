import {API} from '../../utils/api.js'

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const nome = document.getElementById("nome").value;

    try {
        const response = await fetch(`${API}/auth/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nome, email, senha })
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

            alert(errorText);
            return;
        }

        window.location.href = "../login.html";

    } catch (err) {
        console.error(err);
        alert("Erro de conexão com o servidor");
    }
});