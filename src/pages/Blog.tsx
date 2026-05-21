import React, { useState } from 'react';
import { Search, ChevronRight, User, Calendar, Clock, ArrowLeft, ArrowRight, Share2, Eye } from 'lucide-react';
import { BLOGS } from '../data';
import { BlogPost } from '../types';

interface BlogProps {
  blogsList?: BlogPost[];
}

export default function Blog({ blogsList }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Ads Accounts', 'Payment Accounts', 'Reviews Services'];
  const activeBlogsList = blogsList || BLOGS;

  const filteredBlogs = activeBlogsList.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.brief.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F9FAFB] text-gray-900 min-h-screen py-10 md:py-16 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Full Reader Mode view overlay */}
        {selectedPost ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <button
              id="back-to-blogs-btn"
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights feed
            </button>

            <img
              referrerPolicy="no-referrer"
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-80 object-cover rounded-3xl border border-slate-850 shadow-2xl"
            />

            <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400 font-mono">
              <span className="bg-blue-600 text-slate-100 px-2.5 py-0.5 rounded text-[10px] font-bold font-mono">
                {selectedPost.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedPost.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-snug">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-2 py-3 border-y border-slate-900 text-xs text-slate-400">
              <User className="w-4 h-4 text-blue-500" />
              <span>Authored by: <strong className="text-slate-200">{selectedPost.author}</strong></span>
            </div>

            {/* Content markup container */}
            <div className="text-sm text-slate-300 leading-relaxed space-y-6 pt-4 font-sans max-w-none">
              <p className="font-semibold text-slate-100 text-base">{selectedPost.brief}</p>
              
              <div className="space-y-4">
                <p>{selectedPost.content}</p>
                <p>To implement the instructions mapped above, configure your proxy chains inside specialized profiles, clear browser local cache metadata, and verify that your virtual credit card credentials contain sufficient start balances.</p>
                <p>For more custom guide manuals regarding localized proxy mapping, feel free to speak directly with our technical operators via Telegram @EgSupport24 or WhatsApp hotline.</p>
              </div>

              {/* Share placeholder */}
              <div className="pt-8 border-t border-slate-900 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">🔒 SSL Protected Publication</span>
                <button
                  onClick={() => alert("Link copied to clipboard! (simulated)")}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold flex items-center gap-1 text-slate-300"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share Article
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Normal blog posts feed view */
          <div>
            
            {/* Title details */}
            <div className="border-b border-gray-200 pb-8 mb-10">
              <span className="text-[10px] tracking-widest font-mono text-blue-600 uppercase font-black block">
                INSIGHTS & GUIDES
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] tracking-tight mt-2">
                Digital Accounts & Scaling Lore
              </h1>
              <p className="text-xs md:text-sm text-gray-550 mt-2 max-w-xl leading-relaxed font-semibold">
                Tutorials, security checklists, anti-detect browser setup patterns, and insights to bypass verification filters on payment systems.
              </p>
            </div>

            {/* Keyword search and Category List controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              {/* Category selector */}
              <div className="flex flex-wrap gap-1 bg-white p-1.5 rounded-xl border border-gray-200 w-full md:w-auto shadow-sm">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer capitalize ${
                      activeCategory === cat 
                        ? 'bg-blue-600 text-white shadow' 
                        : 'text-gray-500 hover:text-blue-600 font-bold'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Keyword Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  id="blog-search-field"
                  type="text"
                  placeholder="Search articles & manuals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-850 focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                />
              </div>
            </div>

            {/* Blogs list mapping */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <article
                    id={`blog-full-card-${post.id}`}
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group bg-white hover:bg-gray-50/50 border border-gray-200 hover:border-gray-255 rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md flex flex-col cursor-pointer"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        referrerPolicy="no-referrer"
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold font-mono px-2.5 py-1 rounded">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono tracking-widest font-bold">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-sm font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 h-11 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 font-semibold">
                          {post.brief}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2563EB]">
                        <span className="flex items-center gap-1 group-hover:underline">
                          Read Full Guide 
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">By: {post.author.split(' ')[0]}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 shadow-sm border-dashed">
                <p className="text-sm font-bold text-gray-800 animate-pulse">No diagnostic publications found matching criteria.</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs rounded-xl text-white font-bold transition-all shadow shadow-blue-500/10 cursor-pointer"
                >
                  Clear search terms
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
