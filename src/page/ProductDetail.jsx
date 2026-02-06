import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        console.log('Fetching product detail for ID:', id)
        const response = await fetch(`/api/products/${id}`)
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        console.log('Fetched product detail:', data)
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product detail:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProductDetail()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-8 max-w-md">
          <h3 className="text-red-400 text-xl font-bold mb-2">Error Loading Product</h3>
          <p className="text-slate-300">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-8 bg-slate-700/50 hover:bg-slate-600/50 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
        >
          ← Back to Products
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={`https://picsum.photos/600/400?random=${product._id}`}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>

            {/* Product Details */}
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{product.name}</h1>
                <p className="text-cyan-400 font-semibold text-3xl lg:text-4xl mb-6">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-slate-400 text-lg">Stock:</span>
                  <span className="text-green-400 font-semibold text-lg">{product.quantity} available</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                  <span className="text-slate-400">Product ID:</span>
                  <span className="text-white font-mono text-sm">{product._id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                  <span className="text-slate-400">Created:</span>
                  <span className="text-white">{new Date(product.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-700/50">
                  <span className="text-slate-400">Last Updated:</span>
                  <span className="text-white">{new Date(product.updatedAt).toLocaleDateString('id-ID')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg">
                  Add to Cart
                </button>
                <button className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 border border-slate-600/50 text-lg">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
