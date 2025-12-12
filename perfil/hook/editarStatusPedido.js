import {API} from '../../utils/api.js'
export async function updateOrderStatus(orderId, token, status) {
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
            text: "Pedido Atualizado!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#00FF00",
        }).showToast();
        return true;
        
    } catch (err) {
            Toastify({
                text: `Erro ao atualizar status: ${errorData.message || "Tente novamente."}`,
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#f56565",
            }).showToast();
        return false;
    }
}
