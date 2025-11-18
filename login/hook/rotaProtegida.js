export function protectRoute() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../login.html";
    }
}
