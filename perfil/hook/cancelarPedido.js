import {API} from '../../utils/api.js'
export async function updateOrderStatus(orderId, token = localStorage.getItem("token"), status = "cancelado") {
    try {
        const response = await fetch(`${API}/pedido/${orderId}/cancelado`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        if (!response.ok) {
            const errorData = await response.json();
            Toastify({
                text: `Erro ao atualizar status: ${errorData.message || "Tente novamente."}`,
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#f56565",
            }).showToast();
            return false;
        }
        Toastify({
            text: "Pedido cancelado!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#EA580C",
        }).showToast();
        return true;
    } catch (err) {
        Toastify({
            text: "Erro de rede. Tente novamente.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#f56565",
        }).showToast();
        return false;
    }
}
