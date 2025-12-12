import { API } from '../../utils/api.js';

export async function getUserOrders(token) {
    try {
        const response = await fetch(`${API}/pedido/buscar`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Não foi possível carregar os pedidos.");

        const orders = await response.json();

        const profile = orders.length > 0 ? orders[0] : null;

        return { profile, orders };
    } catch (err) {
        return { profile: null, orders: [] };
    }
}
