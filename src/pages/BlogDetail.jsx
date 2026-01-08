import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaEye, 
  FaHeart, 
  FaShare, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaClock,
  FaUser,
  FaTag,
  FaComment,
  FaBookmark,
  FaPrint,
  FaHome
} from 'react-icons/fa';
import { HiSparkles, HiTrendingUp } from 'react-icons/hi';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sample blog data - replace with actual API call
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Real Estate Investment Tips for 2024",
      excerpt: "Discover the most effective strategies for real estate investment in today's market. Learn from industry experts and maximize your returns with proven techniques.",
      content: `
        <h2>Introduction</h2>
        <p>Real estate investment continues to be one of the most reliable ways to build wealth in 2024. With changing market conditions and new opportunities emerging, it's crucial to stay informed about the latest strategies and trends.</p>
        
        <h2>1. Location Analysis is Everything</h2>
        <p>The old adage "location, location, location" remains true. Research upcoming neighborhoods, infrastructure developments, and demographic trends. Areas with planned metro stations, schools, or commercial developments often see significant appreciation.</p>
        
        <h2>2. Understand Market Cycles</h2>
        <p>Real estate markets move in cycles. Understanding whether you're in a buyer's or seller's market can help you time your investments better. Look for indicators like inventory levels, days on market, and price trends.</p>
        
        <h2>3. Diversify Your Portfolio</h2>
        <p>Don't put all your eggs in one basket. Consider different types of properties - residential, commercial, REITs, or even international real estate. Each has different risk profiles and return potentials.</p>
        
        <h2>4. Cash Flow vs. Appreciation</h2>
        <p>Decide whether you're investing for immediate cash flow through rentals or long-term appreciation. Both strategies have merit, but they require different approaches and property types.</p>
        
        <h2>5. Leverage Technology</h2>
        <p>Use modern tools for property analysis, market research, and property management. Apps and platforms can help you identify opportunities, analyze deals, and manage your investments more efficiently.</p>
        
        <h2>6. Build a Strong Network</h2>
        <p>Connect with real estate agents, contractors, property managers, and other investors. A strong network can provide you with off-market deals, reliable service providers, and valuable market insights.</p>
        
        <h2>7. Understand Financing Options</h2>
        <p>Explore different financing options beyond traditional mortgages. Consider hard money loans for flips, portfolio loans for multiple properties, or partnerships for larger deals.</p>
        
        <h2>8. Due Diligence is Critical</h2>
        <p>Always conduct thorough due diligence. This includes property inspections, title searches, market analysis, and financial projections. Never skip this step, no matter how good a deal looks.</p>
        
        <h2>9. Plan for the Unexpected</h2>
        <p>Set aside reserves for repairs, vacancies, and market downturns. A good rule of thumb is to have 6-12 months of expenses saved for each property.</p>
        
        <h2>10. Stay Educated</h2>
        <p>The real estate market is constantly evolving. Stay updated with market trends, new regulations, and investment strategies through books, courses, and industry publications.</p>
        
        <h2>Conclusion</h2>
        <p>Successful real estate investing requires patience, education, and strategic thinking. By following these tips and staying disciplined in your approach, you can build a profitable real estate portfolio in 2024 and beyond.</p>
      `,
      author: "John Smith",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      authorBio: "John Smith is a seasoned real estate investor with over 15 years of experience. He has successfully invested in residential and commercial properties across multiple markets.",
      date: "2024-01-15",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "5 min read",
      views: "2.4k",
      likes: 156,
      featured: true,
      trending: true,
      tags: ["Investment", "Real Estate", "Tips", "2024", "Strategy"]
    },
    {
      id: 2,
      title: "Understanding Property Valuation Methods",
      excerpt: "Learn about different property valuation techniques and how they impact your buying or selling decisions in today's dynamic market.",
      content: `
        <h2>Introduction to Property Valuation</h2>
        <p>Property valuation is a critical aspect of real estate transactions. Whether you're buying, selling, or investing, understanding how properties are valued can help you make informed decisions.</p>
        
        <h2>Comparative Market Analysis (CMA)</h2>
        <p>This method compares your property to similar properties that have recently sold in the area. It's the most common method used by real estate agents and provides a good baseline for market value.</p>
        
        <h2>Income Approach</h2>
        <p>Primarily used for investment properties, this method values a property based on the income it generates. It considers rental income, operating expenses, and capitalization rates.</p>
        
        <h2>Cost Approach</h2>
        <p>This method calculates the cost to rebuild the property from scratch, minus depreciation, plus the land value. It's often used for unique properties or insurance purposes.</p>
      `,
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      authorBio: "Sarah Johnson is a certified real estate appraiser with 12 years of experience in property valuation across residential and commercial sectors.",
      date: "2024-01-12",
      category: "Valuation",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "7 min read",
      views: "1.8k",
      likes: 89,
      featured: true,
      trending: false,
      tags: ["Valuation", "Property", "Analysis", "Market"]
    },
    {
      id: 3,
      title: "Understanding Property Valuation Methods",
      excerpt: "Learn about different property valuation techniques and how they impact your buying or selling decisions in today's dynamic market.",
      content: `
        <h2>Introduction to Property Valuation</h2>
        <p>Property valuation is a critical aspect of real estate transactions. Whether you're buying, selling, or investing, understanding how properties are valued can help you make informed decisions.</p>
        
        <h2>Comparative Market Analysis (CMA)</h2>
        <p>This method compares your property to similar properties that have recently sold in the area. It's the most common method used by real estate agents and provides a good baseline for market value.</p>
        
        <h2>Income Approach</h2>
        <p>Primarily used for investment properties, this method values a property based on the income it generates. It considers rental income, operating expenses, and capitalization rates.</p>
        
        <h2>Cost Approach</h2>
        <p>This method calculates the cost to rebuild the property from scratch, minus depreciation, plus the land value. It's often used for unique properties or insurance purposes.</p>
      `,
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      authorBio: "Sarah Johnson is a certified real estate appraiser with 12 years of experience in property valuation across residential and commercial sectors.",
      date: "2024-01-12",
      category: "Valuation",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      readTime: "7 min read",
      views: "1.8k",
      likes: 89,
      featured: true,
      trending: false,
      tags: ["Valuation", "Property", "Analysis", "Market"]
    }
  ];

  useEffect(() => {
    // Find the blog post by ID
    const foundBlog = blogPosts.find(post => post.id === parseInt(id));
    setBlog(foundBlog);

    // Get related blogs (same category, excluding current)
    if (foundBlog) {
      const related = blogPosts
        .filter(post => post.category === foundBlog.category && post.id !== foundBlog.id)
        .slice(0, 3);
      setRelatedBlogs(related);
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    // Reading progress tracker
    const handleScroll = () => {
      const article = document.querySelector('.article-content');
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        setReadingProgress(Math.min(scrollPercentRounded, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Blog post not found</h2>
          <Link
            to="/blogs"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-1 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                to="/blogs"
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                All Blogs
              </Link>
            </div>
            
            <div className="lg:flex  hidden items-center ">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <FaBookmark />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaPrint />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <FaShare />
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border p-2 min-w-[150px]">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-blue-50 rounded text-blue-600"
                    >
                      <FaFacebook className="mr-2" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-blue-50 rounded text-blue-400"
                    >
                      <FaTwitter className="mr-2" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center w-full px-3 py-2 text-left hover:bg-blue-50 rounded text-blue-700"
                    >
                      <FaLinkedin className="mr-2" />
                      LinkedIn
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category & Badges */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {blog.category}
              </span>
              {blog.trending && (
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                  <HiTrendingUp className="mr-1" />
                  Trending
                </span>
              )}
              {blog.featured && (
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                  <HiSparkles className="mr-1" />
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 text-transparent bg-clip-text leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-lg opacity-90 mb-8">
              <div className="flex items-center">
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="w-12 h-12 rounded-full mr-3 border-2 border-white/30"
                />
                <div className="text-left">
                  <div className="font-semibold">{blog.author}</div>
                  <div className="text-sm opacity-75">Author</div>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {new Date(blog.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                {blog.readTime}
              </div>
              <div className="flex items-center">
                <FaEye className="mr-2" />
                {blog.views} views
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {blog.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="grid lg:grid-cols-4 gap-12">
              {/* Article Content */}
              <div className="lg:col-span-3">
                <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 article-content">
                  {/* Article Actions */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                          isLiked 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <FaHeart className="mr-2" />
                        {blog.likes + (isLiked ? 1 : 0)}
                      </button>
                      <button className="flex items-center px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                        <FaComment className="mr-2" />
                        Comment
                      </button>
                    </div>
                    <div className="text-sm text-gray-500">
                      {readingProgress}% read
                    </div>
                  </div>

                  {/* Article Body */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-ul:text-gray-600 prose-ol:text-gray-600"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                      <FaTag className="text-gray-400 mr-2" />
                      <span className="font-semibold text-gray-700">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-start space-x-6">
                      <img
                        src={blog.authorImage}
                        alt={blog.author}
                        className="w-20 h-20 rounded-full border-4 border-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">About {blog.author}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{blog.authorBio}</p>
                        <div className="flex space-x-3">
                          <button className="text-blue-600 hover:text-blue-700 transition-colors">
                            <FaTwitter className="text-xl" />
                          </button>
                          <button className="text-blue-700 hover:text-blue-800 transition-colors">
                            <FaLinkedin className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <FaBookmark className="mr-2 text-blue-600" />
                      Quick Navigation
                    </h3>
                    <div className="space-y-2 text-sm">
                      <a href="#introduction" className="block text-gray-600 hover:text-blue-600 transition-colors py-1">
                        Introduction
                      </a>
                      <a href="#tips" className="block text-gray-600 hover:text-blue-600 transition-colors py-1">
                        Investment Tips
                      </a>
                      <a href="#conclusion" className="block text-gray-600 hover:text-blue-600 transition-colors py-1">
                        Conclusion
                      </a>
                    </div>
                  </div>

                  {/* Share Widget */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                      <FaShare className="mr-2 text-blue-600" />
                      Share Article
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaFacebook className="mr-2" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-full flex items-center justify-center bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors"
                      >
                        <FaTwitter className="mr-2" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-full flex items-center justify-center bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        <FaLinkedin className="mr-2" />
                        LinkedIn
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Related Articles</h2>
              <p className="text-xl text-gray-600">Continue reading with these related posts</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.id}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {relatedBlog.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{relatedBlog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {relatedBlog.readTime}
                      </span>
                      <span className="flex items-center">
                        <FaEye className="mr-1" />
                        {relatedBlog.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest real estate insights delivered to your inbox
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
