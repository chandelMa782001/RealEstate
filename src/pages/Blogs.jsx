import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight, FaSearch, FaTags, FaClock, FaEye, FaHeart, FaShare, FaHome } from 'react-icons/fa';
import { HiSparkles, HiTrendingUp } from 'react-icons/hi';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Sample blog data - replace with actual API data
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Real Estate Investment Tips for 2024",
      excerpt: "Discover the most effective strategies for real estate investment in today's market. Learn from industry experts and maximize your returns with proven techniques.",
      content: "Full blog content here...",
      author: "John Smith",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "2024-01-15",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "5 min read",
      views: "2.4k",
      likes: 156,
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: "Understanding Property Valuation Methods",
      excerpt: "Learn about different property valuation techniques and how they impact your buying or selling decisions in today's dynamic market.",
      content: "Full blog content here...",
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "2024-01-12",
      category: "Valuation",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "7 min read",
      views: "1.8k",
      likes: 89,
      featured: true,
      trending: false
    },
    {
      id: 3,
      title: "Market Trends: What to Expect in 2024",
      excerpt: "Comprehensive analysis of current market trends and predictions for the upcoming year in real estate with expert insights.",
      content: "Full blog content here...",
      author: "Mike Davis",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "2024-01-10",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "6 min read",
      views: "3.1k",
      likes: 203,
      featured: false,
      trending: true
    },
    {
      id: 4,
      title: "First-Time Home Buyer's Complete Guide",
      excerpt: "Everything you need to know about buying your first home, from financing to closing with step-by-step guidance.",
      content: "Full blog content here...",
      author: "Emily Chen",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "2024-01-08",
      category: "Buying Guide",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "8 min read",
      views: "2.7k",
      likes: 134,
      featured: false,
      trending: false
    },
    {
      id: 5,
      title: "Sustainable Building Practices in Modern Construction",
      excerpt: "Explore eco-friendly construction methods and their impact on property values and environmental sustainability.",
      content: "Full blog content here...",
      author: "David Wilson",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "2024-01-05",
      category: "Construction",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "4 min read",
      views: "1.5k",
      likes: 67,
      featured: false,
      trending: false
    },
    {
      id: 6,
      title: "Legal Aspects of Property Transactions",
      excerpt: "Navigate the complex legal landscape of real estate transactions with expert guidance and professional tips.",
      content: "Full blog content here...",
      author: "Lisa Brown",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      date: "2024-01-03",
      category: "Legal",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "6 min read",
      views: "1.9k",
      likes: 98,
      featured: false,
      trending: false
    }
  ];

  const categories = ['all', 'Investment', 'Valuation', 'Market Analysis', 'Buying Guide', 'Construction', 'Legal'];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Home Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20 text-sm sm:text-base"
          >
            <FaHome className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <HiSparkles className="text-2xl sm:text-3xl lg:text-4xl text-yellow-400 mr-2 sm:mr-3 animate-bounce" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text font-semibold text-sm sm:text-base lg:text-lg">
                Premium Real Estate Content
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 text-transparent bg-clip-text leading-tight px-2">
              Real Estate Insights & News
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed px-4">
              Stay ahead with the latest trends, expert tips, and market insights from industry professionals
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, tips, insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 sm:px-8 py-3 sm:py-5 pl-12 sm:pl-16 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-2xl backdrop-blur-sm bg-white/95 text-sm sm:text-lg placeholder-gray-500 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 hidden sm:block">
                  <kbd className="px-2 sm:px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-200 border border-gray-300 rounded-lg">
                    Enter
                  </kbd>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-center px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 min-w-[80px]">
                <div className="text-lg sm:text-2xl font-bold">500+</div>
                <div className="text-xs sm:text-sm opacity-80">Articles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 min-w-[80px]">
                <div className="text-lg sm:text-2xl font-bold">50k+</div>
                <div className="text-xs sm:text-sm opacity-80">Readers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 min-w-[80px]">
                <div className="text-lg sm:text-2xl font-bold">25+</div>
                <div className="text-xs sm:text-sm opacity-80">Experts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center mb-4">
                <HiSparkles className="text-2xl sm:text-3xl text-yellow-500 mr-2" />
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text font-semibold text-sm sm:text-base">
                  Featured
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Editor's Choice
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Handpicked articles from our expert contributors
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {featuredPosts.map((post, index) => (
                <article key={post.id} className={`group cursor-pointer ${index === 0 ? 'lg:row-span-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-white transform hover:scale-[1.02] transition-all duration-500">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                          index === 0 ? 'h-64 sm:h-80 lg:h-96 xl:h-[500px]' : 'h-48 sm:h-56 lg:h-64'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex gap-2">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          {post.category}
                        </span>
                        {post.trending && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center">
                            <HiTrendingUp className="mr-1" />
                            <span className="hidden sm:inline">Trending</span>
                          </span>
                        )}
                      </div>
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                        <h3 className={`font-bold mb-2 sm:mb-4 group-hover:text-blue-300 transition-colors leading-tight ${
                          index === 0 ? 'text-lg sm:text-xl lg:text-2xl xl:text-3xl' : 'text-base sm:text-lg lg:text-xl'
                        }`}>
                          {post.title}
                        </h3>
                        <p className="text-gray-200 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-2 sm:line-clamp-3">{post.excerpt}</p>
                        
                        {/* Author & Meta */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/30"
                            />
                            <div>
                              <div className="font-semibold text-sm sm:text-base">{post.author}</div>
                              <div className="text-xs sm:text-sm text-gray-300 flex items-center">
                                <FaCalendarAlt className="mr-1" />
                                {new Date(post.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-300 font-semibold text-sm sm:text-base">{post.readTime}</div>
                            <div className="text-xs sm:text-sm text-gray-300 flex items-center justify-end">
                              <FaEye className="mr-1" />
                              {post.views} views
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
              <div className="flex items-center text-gray-700 mb-2 sm:mb-0">
                <FaTags className="text-xl sm:text-2xl text-blue-600 mr-2 sm:mr-3" />
                <span className="font-semibold text-sm sm:text-lg">Filter by Category:</span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentPosts.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 max-w-md mx-auto">
                <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-4">No articles found</h3>
                <p className="text-gray-500 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {currentPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          {post.category}
                        </span>
                        {post.trending && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center">
                            <HiTrendingUp className="mr-1 text-xs" />
                          </span>
                        )}
                      </div>
                      
                      {/* Engagement Stats Overlay */}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-white text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2">
                        <FaEye className="text-xs" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base">{post.excerpt}</p>
                      
                      {/* Author Section */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-sm sm:text-base">{post.author}</div>
                          <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <span className="flex items-center bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                            <FaClock className="mr-1" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                            <FaHeart className="mr-1 text-red-500" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                          Read More
                          <FaArrowRight className="ml-2" />
                        </Link>
                        <button className="p-2 sm:p-3 text-gray-400 hover:text-blue-600 transition-colors">
                          <FaShare />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 sm:mt-16">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">Prev</span>
                      </button>
                      <div className="flex space-x-1 sm:space-x-2 max-w-xs overflow-x-auto">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                              currentPage === index + 1
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <HiSparkles className="text-2xl sm:text-3xl lg:text-4xl text-yellow-400 mr-2 sm:mr-3 animate-bounce" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text font-semibold text-sm sm:text-base lg:text-lg">
                Stay Connected
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 text-transparent bg-clip-text px-4">
              Never Miss an Update
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 leading-relaxed px-4">
              Subscribe to our newsletter for the latest real estate insights, market updates, and exclusive content from industry experts
            </p>
            
            <div className="max-w-2xl mx-auto px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg backdrop-blur-sm bg-white/95 text-sm sm:text-base lg:text-lg placeholder-gray-500 transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl text-sm sm:text-base">
                    <span className="hidden sm:inline">Subscribe Now</span>
                    <span className="sm:hidden">Subscribe</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm opacity-70 mt-3 sm:mt-4">
                  Join 50,000+ professionals who trust our insights. Unsubscribe anytime.
                </p>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-80 px-4">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">50k+</div>
                <div className="text-xs sm:text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">Weekly</div>
                <div className="text-xs sm:text-sm">Updates</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold">Expert</div>
                <div className="text-xs sm:text-sm">Insights</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;