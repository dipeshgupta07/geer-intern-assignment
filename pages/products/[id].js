import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError(err.message);

        // Fallback mock data
        const mockProducts = [
          {
            id: 1,
            name: "Diamond Eternity Ring",
            price: 89999,
            originalPrice: 99999,
            category: "Rings",
            material: "18K White Gold",
            gemstone: "Diamond",
            weight: "3.2g",
            image:
              "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
            description:
              "Elegant diamond eternity ring crafted in 18K white gold with brilliant cut diamonds",

            rating: 4.8,
            reviews: 127,
            tags: ["wedding", "engagement", "diamond", "luxury"],
          },
          {
            id: 2,
            name: "Gold Pearl Necklace",
            price: 45999,
            originalPrice: 52999,
            category: "Necklaces",
            material: "22K Yellow Gold",
            gemstone: "Natural Pearl",
            weight: "12.5g",
            image:
              "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
            description:
              "Traditional gold necklace with lustrous natural pearls, perfect for special occasions",
            inStock: true,
            rating: 4.9,
            reviews: 89,
            tags: ["traditional", "pearl", "gold", "bridal"],
          },
          {
            id: 3,
            name: "Emerald Drop Earrings",
            price: 34999,
            originalPrice: 39999,
            category: "Earrings",
            material: "18K Yellow Gold",
            gemstone: "Natural Emerald",
            weight: "4.8g",
            image:
              "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
            description:
              "Stunning emerald drop earrings set in 18K gold with diamond accents",
            inStock: true,
            rating: 4.7,
            reviews: 64,
            tags: ["emerald", "elegant", "party", "luxury"],
          },
          {
            id: 4,
            name: "Ruby Tennis Bracelet",
            price: 67999,
            originalPrice: 74999,
            category: "Bracelets",
            material: "18K Rose Gold",
            gemstone: "Natural Ruby",
            weight: "8.3g",
            image:
              "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
            description:
              "Exquisite ruby tennis bracelet in rose gold with premium natural rubies",
            inStock: true,
            rating: 4.6,
            reviews: 43,
            tags: ["ruby", "bracelet", "luxury", "gift"],
          },
          {
            id: 5,
            name: "Sapphire Engagement Ring",
            price: 125999,
            originalPrice: 139999,
            category: "Rings",
            material: "18K White Gold",
            gemstone: "Blue Sapphire",
            weight: "4.1g",
            image:
              "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
            description:
              "Royal blue sapphire engagement ring with diamond halo setting",
            inStock: true,
            rating: 4.9,
            reviews: 156,
            tags: ["sapphire", "engagement", "halo", "luxury"],
          },
          {
            id: 6,
            name: "Gold Bangles Set",
            price: 78999,
            originalPrice: 85999,
            category: "Bangles",
            material: "22K Yellow Gold",
            gemstone: "None",
            weight: "25.6g",
            image:
              "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
            description:
              "Traditional gold bangles set with intricate Indian craftsmanship",
            inStock: true,
            rating: 4.8,
            reviews: 92,
            tags: ["traditional", "bangles", "gold", "indian"],
          },
          {
            id: 7,
            name: "Diamond Pendant Necklace",
            price: 56999,
            originalPrice: 62999,
            category: "Necklaces",
            material: "18K White Gold",
            gemstone: "Diamond",
            weight: "6.7g",
            image:
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
            description:
              "Brilliant diamond pendant necklace with solitaire setting",
            inStock: true,
            rating: 4.7,
            reviews: 78,
            tags: ["diamond", "pendant", "elegant", "daily"],
          },
          {
            id: 8,
            name: "Antique Jhumka Earrings",
            price: 23999,
            originalPrice: 27999,
            category: "Earrings",
            material: "18K Gold Plated",
            gemstone: "Kundan",
            weight: "7.2g",
            image:
              "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
            description:
              "Traditional antique jhumka earrings with kundan work and pearl drops",
            inStock: true,
            rating: 4.5,
            reviews: 134,
            tags: ["traditional", "jhumka", "antique", "kundan"],
          },
        ];
        const fallback = mockProducts.find((p) => p.id === parseInt(id));
        if (fallback) {
          setProduct(fallback);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setUpdateData({
        name: product.name,
        price: product.price,
        description: product.description,
        material: product.material,
        weight: product.weight,
        category: product.category,
        instock: product.instock,
      });
    }
  }, [product]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete");

      alert("Product deleted successfully!");
      router.push("/products");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setProduct(updated.product);
      setShowUpdateModal(false);
      alert("Product updated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBuyNow = () => {
    setTimeout(() => {
      router.push("/checkout");
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl text-gray-400 mb-4">🔍</div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products">
            <button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - Geer.in</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link href="/products">
                <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent cursor-pointer">
                  Geer.in
                </h1>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Product Detail Section */}
        <section className="py-12 mb-12 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                href="/products"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                ← Back to Products
              </Link>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:h-[calc(100vh-200px)] ">
              {/* Product Image - Fixed/Sticky */}
              <div className="relative lg:sticky lg:top-0 lg:h-full ">
                <div className="aspect-square lg:h-full rounded-2xl overflow-hidden shadow-2xl bg-white mb-18">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Product Info - Scrollable */}
              <div
                className="space-y-6 lg:overflow-y-auto lg:h-full lg:pr-4 lg:pb-8"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d97706 #f3f4f6",
                }}
              >
                <div>
                  <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-amber-600">
                      ₹{product.price}
                    </span>
                    {product.originalprice && (
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.originalprice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.instock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.instock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Quantity Selector & Add to Cart */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Purchase Options
                  </h3>

                  <div className="flex items-center space-x-4 mb-6">
                    <label className="font-medium text-gray-900">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-16 px-2 py-2 text-center border-0 focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleBuyNow}
                      disabled={!product.instock || isAddingToCart}
                      className={`w-full font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                        product.instock
                          ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                      {isAddingToCart
                        ? "Adding to Cart..."
                        : product.instock
                        ? "Buy Now"
                        : "Out of Stock"}
                    </button>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>💝 Free shipping on orders above ₹2000</p>
                    <p>🔄 Easy 30-day returns</p>
                    <p>✨ Lifetime warranty on craftsmanship</p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-900">
                        Material:
                      </span>
                      <p className="text-gray-600">{product.material}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Weight:</span>
                      <p className="text-gray-600">{product.weight}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Category:
                      </span>
                      <p className="text-gray-600">{product.category}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                      Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <span className="text-amber-600 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Admin Action Buttons */}
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Admin Actions
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setShowUpdateModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                    >
                      Update Product
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? "Deleting..." : "Delete Product"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Update Product
                </h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={updateData.name || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={updateData.price || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={updateData.description || ""}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material
                      </label>
                      <input
                        type="text"
                        name="material"
                        value={updateData.material || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter material"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={updateData.weight || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter weight"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={updateData.category || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Rings">Rings</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bracelets">Bracelets</option>
                      <option value="Bangles">Bangles</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="instock"
                      checked={updateData.instock || false}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm font-medium text-gray-700">
                      In Stock
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Updating..." : "Update Product"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowUpdateModal(false)}
                      className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                  Geer.in
                </h3>
                <p className="text-gray-400">
                  Crafting beautiful jewelry that celebrates life's precious
                  moments.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      href="/products"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-amber-400 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Custom Design</li>
                  <li>Jewelry Repair</li>
                  <li>Consultation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Instagram</li>
                  <li>Facebook</li>
                  <li>WhatsApp</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Geer.in. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

        .font-serif {
          font-family: "Playfair Display", serif;
        }

        /* Custom scrollbar for webkit browsers */
        .space-y-6::-webkit-scrollbar {
          width: 6px;
        }

        .space-y-6::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }

        .space-y-6::-webkit-scrollbar-thumb {
          background: #d97706;
          border-radius: 3px;
        }

        .space-y-6::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }

        /* Smooth scrolling */
        @media (min-width: 1024px) {
          .space-y-6 {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </>
  );
}
