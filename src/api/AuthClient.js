import axios from "axios";

const AuthClient = {
    axiosInstance: axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/auth`,
        headers: { "Content-Type": "application/json" }
    }),

    login(data) {
        return this.axiosInstance.post("/login", data);
    },

    register(data) {
        return this.axiosInstance.post("/register", data);
    },

    getProfile(token) {
        return this.axiosInstance.get("/me", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
    }
};

export default AuthClient;
