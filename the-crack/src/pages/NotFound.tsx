import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center p-6 text-center text-[#1B1B19]">
      <div className="max-w-md space-y-5">
        <span className="text-xs uppercase tracking-[0.25em] text-[#A88A58] font-medium block">
          404 • Page Not Found
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1B1B19]">
          The space you sought does not exist.
        </h1>
        <p className="text-sm text-[#77736B] leading-relaxed font-light">
          The requested dossier or property listing may have been moved or is restricted under private holding protocols.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#A88A58] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
