import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from 'lucide-react';
import { articles } from '../data/articles';
import { useToast } from '../context/ToastContext';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useToast();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="font-serif text-3xl text-[#1B1B19]">Article Not Found</h2>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Journal</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article link copied to clipboard.', 'info', 'Shared');
  };

  return (
    <div className="bg-[#F5F2EC] min-h-screen pt-24 pb-28 text-[#1B1B19]">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 text-xs text-[#77736B] flex items-center gap-2">
        <Link to="/" className="hover:text-[#1B1B19] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/journal" className="hover:text-[#1B1B19] transition-colors">Journal</Link>
        <span>/</span>
        <span className="text-[#1B1B19] font-medium truncate">{article.title}</span>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">
        {/* Header Metadata */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-[#191918] text-[#F5F2EC] text-[10px] uppercase tracking-[0.2em] font-medium">
            {article.category}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1B1B19] leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#77736B] font-light leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-6 border-t border-[#D8D2C7] flex items-center justify-between text-xs text-[#77736B]">
            {/* Author */}
            <div className="flex items-center gap-3 text-left">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-[#1B1B19]">{article.author.name}</div>
                <div className="text-[11px] text-[#77736B]">{article.author.role}</div>
              </div>
            </div>

            {/* Read Time & Date */}
            <div className="flex items-center gap-4">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <button
                type="button"
                onClick={handleShare}
                className="p-2 border border-[#D8D2C7] hover:border-[#191918] transition-colors"
                title="Share Article"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-10 aspect-[16/9] sm:aspect-[21/10] bg-[#191918] overflow-hidden border border-[#D8D2C7]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="mt-12 max-w-2xl mx-auto space-y-6 text-base text-[#1B1B19]/85 font-light leading-[1.8]">
          {article.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {/* Pullquote */}
          <div className="py-8 my-8 border-y border-[#D8D2C7] font-serif text-2xl sm:text-3xl text-[#1B1B19] text-center italic">
            “True luxury brings peace of mind. Knowing the bedrock beneath your investment is as solid as the architectural vision above.”
          </div>

          <p>
            For private inquiries regarding upcoming architectural developments or off-market opportunities referenced in this essay, please contact the author directly at{' '}
            <a href="mailto:private@veraestates.com" className="text-[#A88A58] underline underline-offset-4">
              private@veraestates.com
            </a>.
          </p>
        </div>

        {/* Newsletter Signup in Article */}
        <div className="mt-16 bg-[#FBF9F5] border border-[#D8D2C7] p-8 text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A88A58] font-medium block">
            The Journal Gazette
          </span>
          <h3 className="font-serif text-2xl text-[#1B1B19]">
            Receive future essays and market indexes.
          </h3>
          <p className="text-xs text-[#77736B] max-w-md mx-auto leading-relaxed">
            Delivered without promotional fluff. Strict quarterly frequency.
          </p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2.5 bg-white border border-[#D8D2C7] text-xs focus:outline-none focus:border-[#A88A58]"
            />
            <button
              type="button"
              className="px-4 py-2.5 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-wider hover:bg-[#A88A58] transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 border-t border-[#D8D2C7] pt-16">
        <div className="mb-10 flex items-center justify-between">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1B1B19]">
            Related Articles
          </h3>
          <Link
            to="/journal"
            className="text-xs uppercase tracking-wider text-[#1B1B19] hover:text-[#A88A58] flex items-center gap-1.5"
          >
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              className="bg-[#FBF9F5] border border-[#D8D2C7] p-6 space-y-3 group hover:shadow-card-hover transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider text-[#A88A58] font-medium">
                {rel.category}
              </div>
              <Link to={`/journal/${rel.slug}`} className="block">
                <h4 className="font-serif text-lg text-[#1B1B19] group-hover:text-[#A88A58] transition-colors leading-snug line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
              <p className="text-xs text-[#77736B] line-clamp-2 font-light">
                {rel.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default ArticlePage;
