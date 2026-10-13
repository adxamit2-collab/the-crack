import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { articles } from '../data/articles';
import { Article } from '../types';

export const Journal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Market', 'Architecture', 'Investment', 'Lifestyle', 'Guides'];

  const filteredArticles = articles.filter((art) => {
    if (selectedCategory === 'All') return true;
    return art.category === selectedCategory;
  });

  return (
    <div className="bg-[#F5F2EC] min-h-screen pt-28 pb-28 text-[#1B1B19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <span className="text-xs uppercase tracking-[0.24em] text-[#A88A58] font-medium block">
            The THE CRACK Journal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1B1B19]">
            Architectural thought &amp; prime perspectives.
          </h1>
          <p className="text-sm sm:text-base text-[#77736B] leading-relaxed font-light">
            Essays on tropical modernism, prime capital allocation, and the evolving language of residential restraint.
          </p>

          {/* Category Tabs */}
          <div className="pt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#191918] text-[#F5F2EC] border-[#191918]'
                    : 'bg-white border-[#D8D2C7] text-[#1B1B19] hover:border-[#A88A58]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Top Article */}
        {filteredArticles.length > 0 && (
          <div className="mb-16 bg-[#FBF9F5] border border-[#D8D2C7] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:shadow-card-hover transition-all duration-300">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#191918]">
              <img
                src={filteredArticles[0].heroImage}
                alt={filteredArticles[0].title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#77736B]">
                <span className="text-[#A88A58] font-medium">{filteredArticles[0].category}</span>
                <span>•</span>
                <span>{filteredArticles[0].readTime}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1B19] group-hover:text-[#A88A58] transition-colors leading-snug">
                <Link to={`/journal/${filteredArticles[0].slug}`}>
                  {filteredArticles[0].title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed font-light">
                {filteredArticles[0].excerpt}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-[#D8D2C7]/60">
                <div className="flex items-center gap-2.5">
                  <img
                    src={filteredArticles[0].author.avatar}
                    alt={filteredArticles[0].author.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs text-[#1B1B19] font-medium">{filteredArticles[0].author.name}</span>
                </div>
                <Link
                  to={`/journal/${filteredArticles[0].slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#191918] group-hover:text-[#A88A58] font-medium"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              className="bg-[#FBF9F5] border border-[#D8D2C7] flex flex-col justify-between group hover:shadow-card-hover transition-all duration-300"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#191918]">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#77736B]">
                    <span className="text-[#A88A58] font-medium">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <Link
                    to={`/journal/${article.slug}`}
                    className="block group-hover:text-[#A88A58] transition-colors"
                  >
                    <h3 className="font-serif text-xl text-[#1B1B19] leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#77736B] line-clamp-3 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#D8D2C7]/60 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-[#77736B]">{article.date}</span>
                <Link
                  to={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#191918] group-hover:text-[#A88A58] font-medium"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Journal;
