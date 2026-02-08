import axios from "axios";

const ProductClient = {
    axiosInstance: axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        headers: { "Content-Type": "application/json" }
    }),

    getProducts() {
        return this.axiosInstance.get("/");
    },

    getProductById(id) {
        return this.axiosInstance.get(`/${id}`);
    },

    createProduct(data) {
        return this.axiosInstance.post("/", data);
    },

    updateProduct(id, data) {
        return this.axiosInstance.put(`/${id}`, data);
    },

    deleteProduct(id) {
        return this.axiosInstance.delete(`/${id}`);
    }
};

export default ProductClient;
