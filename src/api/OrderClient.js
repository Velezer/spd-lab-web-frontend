import axios from "axios";

const OrderClient = {
    axiosInstance: axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        headers: { "Content-Type": "application/json" }
    }),

    // Add request interceptor to include auth token
    init() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const user = localStorage.getItem('user');
                if (user) {
                    const parsedUser = JSON.parse(user);
                    if (parsedUser.token) {
                        config.headers.Authorization = `Bearer ${parsedUser.token}`;
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    },

    createOrder(data) {
        return this.axiosInstance.post("/", data);
    },

    getOrders() {
        return this.axiosInstance.get("/");
    },

    getOrderById(id) {
        return this.axiosInstance.get(`/${id}`);
    },

    updateOrderStatus(id, status) {
        return this.axiosInstance.put(`/${id}/status`, { status });
    }
};

export default OrderClient;
