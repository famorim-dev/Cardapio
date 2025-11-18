import {API} from '../../utils/api.js'
export async function updateOrderStatus(orderId, token, status = "cancelado") {
    try {
        const response = await fetch(`${API}/pedido/${orderId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro ao atualizar status: ${errorData.message || "Tente novamente."}`);
            return false;
        }

        return true;
    } catch (err) {
        console.log(err.message)
        alert("Erro de rede. Tente novamente.");
        return false;
    }
}
