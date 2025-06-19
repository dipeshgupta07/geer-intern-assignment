import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function JewelryProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { v4: uuidv4 } = require("uuid");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    material: "",
    gemstone: "",
    weight: "",
    image: "",
    description: "",
    rating: 4.5,
    reviews: 0,
    tags: "",
    features: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        id: uuidv4(),
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        features: formData.features.split(",").map((feature) => feature.trim()),
        inStock: true,
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          price: "",
          originalPrice: "",
          category: "",
          material: "",
          gemstone: "",
          weight: "",
          image: "",
          description: "",
          rating: 4.5,
          reviews: 0,
          tags: "",
          features: "",
        });
        setShowAddForm(false);
        // Refresh products list
        window.location.reload();
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={`${className} custom-arrow custom-prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
        aria-label="Previous slide"
      ></button>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={`${className} custom-arrow custom-next`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
        aria-label="Next slide"
      ></button>
    );
  };
  
  async function addProduct() {
    console.log("🔍 Starting addProduct function...");

    try {
    

      const uuid = uuidv4();
      
      const productData = {
        id: uuid,
        name: "Gold Bangles Set",
        price: 78999,
        originalPrice: 85999,
        category: "Bangles",
        material: "22K Yellow Gold",
        gemstone: "None",
        weight: "25.6g",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop", // Make sure this field name matches your database
        description:
          "Traditional gold bangles set with intricate Indian craftsmanship",

        rating: 4.8,
        reviews: 92,
        tags: ["traditional", "bangles", "gold", "indian"],
        features: ["Handcrafted", "Traditional Design", "Premium Gold"],
      };

      console.log(" Product data to send:", productData);

     
      console.log(" Making fetch request...");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(productData),
      });

      console.log("📨 Response received:");
      console.log("  - Status:", response.status);
      console.log("  - Status Text:", response.statusText);
      console.log("  - OK:", response.ok);
      console.log(
        "  - Headers:",
        Object.fromEntries([...response.headers.entries()])
      );

      let responseData;
      const contentType = response.headers.get("content-type");

      try {
        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
          console.log("📄 JSON Response:", responseData);
        } else {
          responseData = await response.text();
          console.log("📄 Text Response:", responseData);
        }
      } catch (parseError) {
        console.error("❌ Error parsing response:", parseError);
        responseData = "Could not parse response";
      }

      if (!response.ok) {
        console.error("❌ Request failed:");
        console.error("  - Status:", response.status);
        console.error("  - Status Text:", response.statusText);
        console.error("  - Response Data:", responseData);

        
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        if (response.status === 404) {
          errorMessage =
            "API endpoint not found. Make sure /api/products/index.js exists.";
        } else if (response.status === 500) {
          errorMessage =
            "Server error. Check your database connection and API implementation.";
        } else if (response.status === 405) {
          errorMessage =
            "Method not allowed. Check if POST method is handled in your API.";
        }

        throw new Error(errorMessage);
      }

      console.log("✅ Product added successfully:", responseData);


      alert(`✅ Product "${productData.name}" added successfully!`);


      return responseData;
    } catch (error) {
      console.error("💥 Error in addProduct:");
      console.error("  - Type:", error.constructor.name);
      console.error("  - Message:", error.message);
      console.error("  - Stack:", error.stack);

     
      let userMessage = "Failed to add product. ";

      if (error instanceof TypeError && error.message.includes("fetch")) {
        userMessage += "Network error - make sure your server is running.";
        console.error("🔍 Network error details:");
        console.error("  - Check if Next.js dev server is running");
        console.error(
          "  - Check if API route exists at pages/api/products/index.js"
        );
        console.error("  - Check for CORS issues");
      } else if (error.message.includes("404")) {
        userMessage += "API endpoint not found.";
      } else if (error.message.includes("500")) {
        userMessage += "Server error. Check console for details.";
      } else {
        userMessage += error.message;
      }

      alert(`❌ ${userMessage}`);
      throw error;
    }
  }

  const jewelryProducts = [
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
      description: "Brilliant diamond pendant necklace with solitaire setting",
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products/");
        if (!response.ok) {
          // Use mock jewelry products if API fails
          setProducts(jewelryProducts);
          setFilteredProducts(jewelryProducts);
          return;
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
        // Fallback to mock data
        setProducts(jewelryProducts);
        setFilteredProducts(jewelryProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.gemstone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = [...new Set(products.map((product) => product.category))];
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  const sliderData = [
    {
      image: "assets/slider1.avif",
      title: "Exquisite Handcrafted Jewels",
      subtitle: "Timeless Elegance",
      description:
        "Discover our premium collection of handcrafted jewelry, where each piece tells a story of artisanal excellence and timeless beauty.",
      cta: "Explore Collection",
    },
    {
      image: "assets/slider2.avif",
      title: "Bespoke Luxury Pieces",
      subtitle: "Made to Perfection",
      description:
        "Experience the pinnacle of luxury with our custom-designed jewelry, crafted exclusively for those who appreciate the finest things in life.",
      cta: "See Collections",
    },
    {
      image: "assets/slider3.avif",
      title: "Heritage & Modern Fusion",
      subtitle: "Contemporary Classics",
      description:
        "Where traditional craftsmanship meets modern design, creating unique pieces that celebrate both heritage and innovation.",
      cta: "Discover More",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    dotsClass: "slick-dots custom-dots",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Geer.in Jewelry Collection",
    description:
      "Premium handcrafted jewelry collection featuring rings, necklaces, earrings, and bracelets",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "Product",
      position: index + 1,
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviews,
      },
      brand: {
        "@type": "Brand",
        name: "Geer.in",
      },
    })),
  };

  return (
    <>
      <Head>
        <title>
          Premium Jewelry Collection | Geer.in - Handcrafted Diamond, Gold &
          Gemstone Jewelry
        </title>
        <meta
          name="description"
          content="Discover exquisite handcrafted jewelry at Geer.in. Shop premium diamond rings, gold necklaces, emerald earrings, and more. Free shipping on orders above ₹50,000."
        />
        <meta
          name="keywords"
          content="jewelry, diamond rings, gold necklaces, gemstone earrings, handcrafted jewelry, luxury jewelry, engagement rings, wedding jewelry, Indian jewelry"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Premium Jewelry Collection | Geer.in"
        />
        <meta
          property="og:description"
          content="Discover exquisite handcrafted jewelry featuring diamonds, gold, and precious gemstones. Premium quality with lifetime warranty."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://geer.in/jewelry-collection" />
        <meta
          property="og:image"
          content="https://geer.in/assets/jewelry-collection-og.jpg"
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Premium Jewelry Collection | Geer.in"
        />
        <meta
          name="twitter:description"
          content="Discover exquisite handcrafted jewelry featuring diamonds, gold, and precious gemstones."
        />
        <meta
          name="twitter:image"
          content="https://geer.in/assets/jewelry-collection-twitter.jpg"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://geer.in/jewelry-collection" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
          as="style"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Enhanced Header with SEO-friendly structure */}
        <header
          className="bg-white shadow-lg border-b border-gray-200"
          role="banner"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Geer.in
                </h1>
                <p className="text-gray-600 mt-2 text-lg italic">
                  Discover beautiful jewels made just for you
                </p>
              </div>
              <nav
                className="hidden md:flex space-x-8"
                role="navigation"
                aria-label="Main navigation"
              >
                <a
                  href="collection"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Collection
                </a>
                <a
                  href="about"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  About
                </a>
                <a
                  href="contact"
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Enhanced Slider with Text Overlays */}
        <section className="relative" aria-label="Featured jewelry collections">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Slider {...sliderSettings}>
                {sliderData.map((slide, idx) => (
                  <div key={idx} className="relative">
                    <div className="relative h-[600px] overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                      {/* Text Content */}
                      <div className="absolute inset-0 flex items-center">
                        <div className="max-w-2xl mx-auto px-8 sm:px-12 lg:px-16 text-white">
                          <div className="space-y-6 transform translate-y-0 opacity-100 animate-fade-in-up">
                            <div>
                              <p className="text-amber-400 text-sm sm:text-base font-medium tracking-wider uppercase mb-2">
                                {slide.subtitle}
                              </p>
                              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4">
                                {slide.title}
                              </h2>
                            </div>
                            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl">
                              {slide.description}
                            </p>
                            <div className="pt-4">
                              <Link href={`/collection`}>
                                <button
                                  className="group inline-flex items-center bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                  aria-label={`${slide.cta} - View jewelry collection`}
                                >
                                  {slide.cta}
                                  <svg
                                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                  </svg>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Filter Section */}
          <section
            className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200"
            aria-label="Product filters"
          >
            <h3 className="text-2xl font-serif font-bold text-amber-600 mb-6">
              Find Your Perfect Jewelry Piece
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="search"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Search Jewelry
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name, material, or gemstone..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                    aria-describedby="search-help"
                  />
                  <span id="search-help" className="sr-only">
                    Search for jewelry by name, material, or gemstone type
                  </span>
                  <svg
                    className="absolute right-4 top-3.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="sm:w-56">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Jewelry Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  aria-describedby="category-help"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span id="category-help" className="sr-only">
                  Filter jewelry by category type
                </span>
              </div>

              {(searchTerm || selectedCategory) && (
                <div className="sm:w-36 flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
                    aria-label="Clear all filters"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                Showing{" "}
                <span className="font-semibold text-amber-600">
                  {filteredProducts.length}
                </span>{" "}
                of <span className="font-semibold">{products.length}</span>{" "}
                jewelry pieces
              </div>
            </div>
          </section>

          {/* Enhanced Product Grid */}
          <section aria-label="Jewelry products">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg
                    className="mx-auto h-24 w-24 text-gray-300 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.01-6-2.709M15 11V9a6 6 0 00-6-6v0a6 6 0 00-6 6v2c0 .866.23 1.677.63 2.374"
                    />
                  </svg>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    No jewelry found
                  </h3>
                  <p className="text-gray-500 text-lg mb-6">
                    No jewelry pieces match your current search criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Clear filters to see all jewelry
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <article
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="cursor-pointer">
                        <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
                          <Image
                            src={product.image}
                            alt={`${product.name} - ${product.material} jewelry with ${product.gemstone}`}
                            width={400}
                            height={400}
                            className="h-56 w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            priority={index < 4}
                            loading={index < 4 ? "eager" : "lazy"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Discount Badge */}
                          {product.originalPrice > product.price && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {Math.round(
                                ((product.originalPrice - product.price) /
                                  product.originalPrice) *
                                  100
                              )}
                              % OFF
                            </div>
                          )}

                          {/* Stock Status */}
                          <div className="absolute top-3 right-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                product.instock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.instock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  aria-hidden="true"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-2 text-sm text-gray-600">
                                ({product.reviews})
                              </span>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Material:</span>{" "}
                              {product.material}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Gemstone:</span>{" "}
                              {product.gemstone}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Weight:</span>{" "}
                              {product.weight}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                ₹{product.price.toLocaleString()}
                              </p>
                              {product.originalPrice > product.price && (
                                <p className="text-sm text-gray-500 line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </p>
                              )}
                            </div>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Add New Jewelry Product
                  </h3>
                  <p className="text-amber-100 mt-1">
                    Expand your premium jewelry collection
                  </p>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20"
                  aria-label={
                    showAddForm
                      ? "Close add product form"
                      : "Open add product form"
                  }
                >
                  {showAddForm ? (
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Close Form
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Product
                    </span>
                  )}
                </button>
              </div>
            </div>

            {showAddForm && (
              <div className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="productName"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Product Name *
                        </label>
                        <input
                          type="text"
                          id="productName"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="e.g., Diamond Eternity Ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                        >
                          <option value="">Select Category</option>
                          <option value="Rings">Rings</option>
                          <option value="Necklaces">Necklaces</option>
                          <option value="Earrings">Earrings</option>
                          <option value="Bracelets">Bracelets</option>
                          <option value="Bangles">Bangles</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      Pricing Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Current Price (₹) *
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="1"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="89999"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="originalPrice"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Original Price (₹)
                        </label>
                        <input
                          type="number"
                          id="originalPrice"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleInputChange}
                          min="0"
                          step="1"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="99999"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Material & Specifications */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      Material & Specifications
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label
                          htmlFor="material"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Material *
                        </label>
                        <input
                          type="text"
                          id="material"
                          name="material"
                          value={formData.material}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="e.g., 18K White Gold"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gemstone"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Gemstone
                        </label>
                        <input
                          type="text"
                          id="gemstone"
                          name="gemstone"
                          value={formData.gemstone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="e.g., Diamond, None"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="weight"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Weight
                        </label>
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="e.g., 3.2g"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image & Description */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Image & Description
                    </h4>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="image"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Image URL *
                        </label>
                        <input
                          type="url"
                          id="image"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="https://images.unsplash.com/photo-..."
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Description *
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white resize-none"
                          placeholder="Elegant diamond eternity ring crafted in 18K white gold with brilliant cut diamonds"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Additional Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="tags"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="wedding, engagement, diamond, luxury"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="features"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Features (comma-separated)
                        </label>
                        <input
                          type="text"
                          id="features"
                          name="features"
                          value={formData.features}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                          placeholder="Handcrafted, Traditional Design, Premium Gold"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label
                          htmlFor="rating"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Rating (1-5)
                        </label>
                        <input
                          type="number"
                          id="rating"
                          name="rating"
                          value={formData.rating}
                          onChange={handleInputChange}
                          min="1"
                          max="5"
                          step="0.1"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="reviews"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Number of Reviews
                        </label>
                        <input
                          type="number"
                          id="reviews"
                          name="reviews"
                          value={formData.reviews}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 border border-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="group inline-flex items-center bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      <svg
                        className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

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
                      href="/collection"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Collection
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

        {/* Custom Styles */}
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

          .font-serif {
            font-family: "Playfair Display", serif;
          }

          .custom-dots {
            bottom: 20px;
            display: flex !important;
            justify-content: center;
            gap: 10px;
          }

          .custom-dots li {
            margin: 0;
          }

          .custom-dots li button {
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            background: #e0e0e0;
            border: none;
            transition: all 0.3s ease;
          }

          .custom-dots li.slick-active button {
            background: linear-gradient(to right, #f59e0b, #fbbf24);
            width: 16px;
            height: 16px;
          }

          .custom-dots li button:hover {
            background: #facc15;
            transform: scale(1.2);
          }
          .custom-arrow {
            background-color: rgba(255, 255, 255, 0.8);
            border: none;
            color: #333;
            font-size: 20px;
            width: 40px;
            height: 40px;
            border-radius: 9999px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            z-index: 10;
          }

          .custom-arrow:hover {
            background-color: #fbbf24;
            color: white;
          }

          .custom-prev {
            left: 10px !important;
          }

          .custom-next {
            right: 10px !important;
          }
        `}</style>
      </div>{" "}
      {/* Close the min-h-screen wrapper */}
    </>
  );
}
