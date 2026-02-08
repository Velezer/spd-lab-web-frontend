import React, { useState, useEffect } from "react";
import ProductClient from "../../api/ProductClient";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    imgUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    ProductClient.init();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductClient.getProducts();
      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }
      const data = response.data;
      // Map products to ensure id field is set (handle MongoDB _id)
      const mappedProducts = data.map((product) => ({
        ...product,
        id: product._id || product.id,
      }));
      setProducts(mappedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert price and quantity to numbers
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        quantity: parseInt(newProduct.quantity, 10),
      };

      if (isEditing) {
        // Update existing product
        const response = await ProductClient.updateProduct(
          editingProductId,
          productData,
        );
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed to update product");
        }
        setIsEditing(false);
        setEditingProductId(null);
      } else {
        // Add new product
        const response = await ProductClient.createProduct(productData);
        if (response.status !== 201) {
          throw new Error("Failed to add product");
        }
      }
      setNewProduct({
        name: "",
        price: "",
        quantity: "",
        description: "",
        imgUrl: "",
      });
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      imgUrl: product.imgUrl,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await ProductClient.deleteProduct(id);
        if (response.status !== 200) {
          throw new Error("Failed to delete product");
        }
        fetchProducts(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">
        Products Management
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="p-2 bg-slate-700 text-white rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="p-2 bg-slate-700 text-white rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            className="p-2 bg-slate-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            value={newProduct.imgUrl}
            onChange={handleInputChange}
            className="p-2 bg-slate-700 text-white rounded"
            required
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="p-2 bg-slate-700 text-white rounded w-full mt-4"
          rows="3"
          required
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded mt-4"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditingProductId(null);
              setNewProduct({
                name: "",
                price: "",
                quantity: "",
                description: "",
                imgUrl: "",
              });
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4 ml-2"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 bg-slate-700 text-white rounded w-full"
        />
      </div>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">Name</th>
              <th className="px-6 py-3 text-gray-300">Price</th>
              <th className="px-6 py-3 text-gray-300">Quantity</th>
              <th className="px-6 py-3 text-gray-300">Description</th>
              <th className="px-6 py-3 text-gray-300">Image</th>
              <th className="px-6 py-3 text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-300">
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product, index) => (
                <tr key={index} className="border-t border-slate-600">
                  <td className="px-6 py-4 text-white">{product.name}</td>
                  <td className="px-6 py-4 text-cyan-400">${product.price}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {product.description}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-700 text-white rounded mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded mr-2 ${
                currentPage === page
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-700 text-white"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
