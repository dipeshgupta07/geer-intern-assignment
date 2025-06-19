import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock collections data with SEO-friendly structure
  const mockCollections = [
    {
      id: 'bridal-collection',
      name: 'Bridal Collection',
      slug: 'bridal-jewelry',
      description: 'Exquisite bridal jewelry sets designed for your special day. Featuring traditional and contemporary designs crafted with premium diamonds and precious metals.',
      longDescription: 'Our bridal collection showcases the finest craftsmanship in wedding jewelry. Each piece is meticulously designed to complement the bride\'s natural beauty, featuring ethically sourced diamonds, precious gemstones, and traditional Indian motifs. From elaborate necklace sets to delicate earrings, every piece tells a story of love and tradition.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
      productCount: 45,
      priceRange: '₹15,000 - ₹2,50,000',
      tags: ['bridal', 'wedding', 'diamonds', 'gold', 'traditional'],
      featured: true,
      seoKeywords: 'bridal jewelry, wedding jewelry, diamond sets, gold jewelry'
    },
    {
      id: 'diamond-elegance',
      name: 'Diamond Elegance',
      slug: 'diamond-jewelry',
      description: 'Stunning diamond jewelry collection featuring contemporary designs and timeless classics. Perfect for special occasions and everyday elegance.',
      longDescription: 'Our Diamond Elegance collection represents the pinnacle of luxury jewelry design. Featuring conflict-free diamonds in various cuts and settings, each piece is certified for quality and authenticity. From solitaire rings to elaborate tennis bracelets, discover the perfect diamond piece to mark life\'s precious moments.',
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=600&fit=crop',
      productCount: 38,
      priceRange: '₹25,000 - ₹5,00,000',
      tags: ['diamonds', 'luxury', 'contemporary', 'certified'],
      featured: true,
      seoKeywords: 'diamond jewelry, certified diamonds, luxury jewelry, diamond rings'
    },
    {
      id: 'heritage-gold',
      name: 'Heritage Gold',
      slug: 'heritage-gold-jewelry',
      description: 'Traditional Indian gold jewelry inspired by heritage designs. Featuring intricate craftsmanship and cultural motifs.',
      longDescription: 'Our Heritage Gold collection pays homage to India\'s rich jewelry-making tradition. Each piece is crafted using time-honored techniques, featuring intricate filigree work, traditional motifs, and cultural symbols. Made from 22K and 18K gold, these pieces are perfect for festivals, ceremonies, and as heirloom pieces.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop',
      productCount: 52,
      priceRange: '₹8,000 - ₹1,50,000',
      tags: ['gold', 'traditional', 'heritage', 'indian', 'cultural'],
      featured: true,
      seoKeywords: 'gold jewelry, traditional jewelry, Indian jewelry, heritage designs'
    },
    
  
  ];

  const mockFeaturedProducts = [
    {
      id: 1,
      name: 'Royal Diamond Necklace Set',
      price: 125000,
      originalPrice: 150000,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      collection: 'Diamond Elegance',
      rating: 4.9,
      reviews: 28
    },
    {
      id: 2,
      name: 'Heritage Gold Temple Earrings',
      price: 35000,
      originalPrice: 42000,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      collection: 'Heritage Gold',
      rating: 4.8,
      reviews: 35
    },
    {
      id: 3,
      name: 'Emerald Vintage Ring',
      price: 85000,
      originalPrice: 95000,
      image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop',
      collection: 'Precious Gemstones',
      rating: 4.9,
      reviews: 19
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // In real app, these would be API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCollections(mockCollections);
      setFeaturedProducts(mockFeaturedProducts);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Jewelry Collections - Geer.in",
    "description": "Explore our exquisite jewelry collections featuring bridal sets, diamond jewelry, heritage gold, contemporary designs, and precious gemstones. Handcrafted with precision and love.",
    "url": "https://geer.in/collections",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": collections.length,
      "itemListElement": collections.map((collection, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": collection.name,
        "description": collection.description,
        "image": collection.image,
        "brand": {
          "@type": "Brand",
          "name": "Geer.in"
        },
        "category": "Jewelry"
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://geer.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Collections",
          "item": "https://geer.in/collections"
        }
      ]
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Collections...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Jewelry Collections | Bridal, Diamond & Gold Jewelry | Geer.in</title>
        <meta name="title" content="Jewelry Collections | Bridal, Diamond & Gold Jewelry | Geer.in" />
        <meta name="description" content="Discover our exquisite jewelry collections featuring bridal sets, diamond jewelry, heritage gold designs, contemporary pieces & precious gemstones. Premium handcrafted jewelry in India." />
        <meta name="keywords" content="jewelry collections, bridal jewelry, diamond jewelry, gold jewelry, gemstone jewelry, Indian jewelry, handcrafted jewelry, luxury jewelry, wedding jewelry" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://geer.in/collections" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://geer.in/collections" />
        <meta property="og:title" content="Jewelry Collections | Bridal, Diamond & Gold Jewelry | Geer.in" />
        <meta property="og:description" content="Discover our exquisite jewelry collections featuring bridal sets, diamond jewelry, heritage gold designs, contemporary pieces & precious gemstones." />
        <meta property="og:image" content="https://geer.in/assets/collections-og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Geer.in" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://geer.in/collections" />
        <meta property="twitter:title" content="Jewelry Collections | Bridal, Diamond & Gold Jewelry | Geer.in" />
        <meta property="twitter:description" content="Discover our exquisite jewelry collections featuring bridal sets, diamond jewelry, heritage gold designs, contemporary pieces & precious gemstones." />
        <meta property="twitter:image" content="https://geer.in/assets/collections-og-image.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Geer.in" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/products">
                  <h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent cursor-pointer">
                    Geer.in
                  </h1>
                </Link>
                <p className="text-gray-600 mt-2 text-lg italic">Discover beautiful jewels made just for you</p>
              </div>
              <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
                <Link href="/collections" className="text-amber-600 font-semibold border-b-2 border-amber-600 pb-1">Collections</Link>
               
                <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">About</Link>
                <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/products" className="text-gray-500 hover:text-amber-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-amber-600 font-medium">Collections</span>
            </li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
              Our Jewelry Collections
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our carefully curated collections of exquisite jewelry, each piece crafted with 
              precision, passion, and the finest materials. From traditional heritage designs to 
              contemporary masterpieces, find the perfect piece that speaks to your soul.
            </p>
          </section>

          {/* Featured Collections */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Featured Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.filter(collection => collection.featured).map((collection) => (
                <article key={collection.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <Link href={`/collections/${collection.slug}`}>
                    <div className="cursor-pointer">
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <Image
                          src={collection.image}
                          alt={`${collection.name} - ${collection.description}`}
                          width={800}
                          height={600}
                          className="h-64 w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          priority={collection.featured}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <span className="text-sm font-medium bg-amber-600 px-3 py-1 rounded-full">
                              {collection.productCount} Products
                            </span>
                            <span className="text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              {collection.priceRange}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                          {collection.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {collection.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {collection.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-amber-600 font-semibold group-hover:underline">
                            Explore Collection
                          </span>
                          <svg className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* All Collections */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              All Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <article key={collection.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <Link href={`/collections/${collection.slug}`}>
                    <div className="cursor-pointer flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <Image
                          src={collection.image}
                          alt={`${collection.name} jewelry collection`}
                          width={400}
                          height={300}
                          className="h-48 md:h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-serif font-bold text-gray-900 hover:text-amber-600 transition-colors">
                            {collection.name}
                          </h3>
                          <span className="text-sm text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded">
                            {collection.productCount} items
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                          {collection.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">
                            {collection.priceRange}
                          </span>
                          <span className="text-amber-600 font-medium hover:underline">
                            View Collection →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <article key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  <Link href={`/products/${product.id}`}>
                    <div className="cursor-pointer">
                      <div className="relative overflow-hidden rounded-t-2xl">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="h-56 w-full object-cover object-center hover:scale-110 transition-transform duration-500"
                        />
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              SALE
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-2">
                          <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                            {product.collection}
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-amber-600">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us create a custom piece just for you. Our master craftsmen will bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
              <Link href="/contact">
                <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105">
                  Contact Us
                </button>
              </Link>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-3xl font-serif font-bold mb-4">Geer.in</h3>
              <p className="text-gray-400 mb-8">Crafting beautiful jewelry with love and precision</p>
              <div className="flex justify-center space-x-6">
                <Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Collection</Link>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
                <p>&copy; 2025 Geer.in. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Custom Styles */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
          
          .font-serif {
            font-family: 'Playfair Display', serif;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}