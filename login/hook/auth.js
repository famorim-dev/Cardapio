const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
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

            alert(errorText);
            return;
        }
        console.log(response)
        const token = await response.text();
        console.log(token)
        localStorage.setItem("token", token);

        window.location.href = "index.html";

    } catch (err) {
        console.error(err);
        alert("Erro de conexão com o servidor");
    }
});