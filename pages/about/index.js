import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {


  const values = [
    {
      icon: "🎨",
      title: "Artisanal Excellence",
      description: "Every piece is handcrafted with meticulous attention to detail by skilled artisans who have mastered traditional techniques passed down through generations."
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "We source only the finest materials - from precious metals to certified gemstones, ensuring each piece meets our rigorous quality standards."
    },
    {
      icon: "🌱",
      title: "Ethical Sourcing",
      description: "Committed to responsible practices, we ensure all our materials are ethically sourced and our processes support fair trade principles."
    },
    {
      icon: "✨",
      title: "Timeless Design",
      description: "Our designs blend traditional Indian jewelry heritage with contemporary aesthetics, creating pieces that transcend time and trends."
    }
  ];

  return (
    <>
      <Head>
        <title>About Geer.in - Premium Handcrafted Jewelry | Our Story & Values</title>
        <meta name="description" content="Discover the story behind Geer.in, India's premier handcrafted jewelry brand. Learn about our artisanal excellence, ethical sourcing, and commitment to creating timeless pieces since 2010." />
        <meta name="keywords" content="handcrafted jewelry India, custom jewelry design, artisanal jewelry, ethical jewelry, premium jewelry brand, traditional Indian jewelry, bespoke jewelry" />
        <meta property="og:title" content="About Geer.in - Premium Handcrafted Jewelry Brand" />
        <meta property="og:description" content="Discover our journey of creating exquisite handcrafted jewelry with traditional techniques and modern design. Learn about our commitment to quality and ethical practices." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://geer.in/about" />
        <meta property="og:image" content="https://geer.in/images/about-hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Geer.in - Premium Handcrafted Jewelry" />
        <meta name="twitter:description" content="Discover our story of creating exquisite handcrafted jewelry with traditional techniques and modern design." />
        <link rel="canonical" href="https://geer.in/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Geer.in",
            "description": "Premium handcrafted jewelry brand specializing in traditional and contemporary designs",
            "foundingDate": "2010",
            "founder": {
              "@type": "Person",
              "name": "Priya Sharma"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "url": "https://geer.in",
            "logo": "https://geer.in/logo.png",
            "sameAs": [
              "https://www.facebook.com/geerin",
              "https://www.instagram.com/geerin",
              "https://www.twitter.com/geerin"
            ]
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                <Link href="/collection" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Collection</Link>
                <Link href="/about" className="text-amber-600 font-semibold">About</Link>
                <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  Crafting Dreams into 
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"> Jewelry</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  For over a decade, Geer.in has been India's trusted name in handcrafted jewelry, 
                  blending traditional artisanship with contemporary elegance to create pieces that 
                  celebrate life's most precious moments.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/collections">
                    <button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
                      Explore Our Collections
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300">
                      Get in Touch
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
                    alt="Handcrafted jewelry making process at Geer.in"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20" id="our-story">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From humble beginnings to becoming India's premier handcrafted jewelry brand, 
                our journey is one of passion, dedication, and unwavering commitment to excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">The Beginning</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Founded in 2010 by master jeweler Priya Sharma, Geer.in began as a small workshop 
                  in the heart of Mumbai's jewelry district. Priya's vision was simple yet profound: 
                  to preserve the ancient art of Indian jewelry making while creating pieces that 
                  speak to modern sensibilities.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  What started with a team of three artisans has grown into a family of skilled 
                  craftspeople, each bringing their unique expertise to create jewelry that tells 
                  a story. Every piece that leaves our workshop carries with it the legacy of 
                  traditional techniques passed down through generations.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400&fit=crop"
                  alt="Traditional jewelry making workshop"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

          
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white" id="our-values">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core principles guide everything we do, from design conception to final delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-amber-50 hover:to-yellow-50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-600 to-yellow-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Ready to Create Your Perfect Piece?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Whether you're looking for a timeless classic or a custom design, 
              we're here to bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/collection">
                <button className="bg-white text-amber-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
                  Browse Collections
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-4 rounded-full transition-all duration-300">
                  Custom Design Consultation
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                  Geer.in
                </h3>
                <p className="text-gray-400">
                  Crafting beautiful jewelry that celebrates life's precious moments.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/collection" className="hover:text-amber-400 transition-colors">Collection</Link></li>
                  <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </>
  );
}