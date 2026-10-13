import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Mail, Award, MapPin } from 'lucide-react';
import { agents } from '../data/agents';
import { properties } from '../data/properties';

export const Agents: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  const filteredAgents = agents.filter((agent) => {
    if (selectedLocation === 'All') return true;
    return agent.locations.includes(selectedLocation);
  });

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-28 pb-24 text-[#11110F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            PRIVATE ADVISORY COUNCIL
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#11110F]">
            Meet Your Advisor
          </h1>
          <p className="text-sm sm:text-base text-[#736F66] leading-relaxed font-light">
            Our managing partners combine architectural education, private wealth literacy, and intimate localized market mastery across New York, Miami, Los Angeles, and Aspen.
          </p>

          {/* Location filter pills */}
          <div className="pt-6 flex flex-wrap gap-2">
            {['All', 'New York', 'Miami', 'Los Angeles', 'Beverly Hills', 'Malibu', 'Aspen'].map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors cursor-pointer border ${
                  selectedLocation === loc
                    ? 'bg-[#11110F] text-[#F5F2EA] border-[#11110F]'
                    : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAgents.map((agent) => {
            const representedCount = properties.filter((p) => p.agentId === agent.id).length;

            return (
              <div
                key={agent.id}
                className="group bg-[#FAF8F3] border border-[#D9D4C9] flex flex-col justify-between hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1"
              >
                <div>
                  {/* Portrait */}
                  <div className="aspect-[4/5] overflow-hidden bg-[#11110F] relative">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#11110F]/85 backdrop-blur-xs text-[#F5F2EA] text-[9px] uppercase tracking-wider px-2 py-0.5 border border-white/10">
                      {agent.experienceYears} Years Exp
                    </div>
                    {agent.salesVolume && (
                      <div className="absolute bottom-3 right-3 bg-[#B69A6A] text-[#11110F] text-[9px] uppercase tracking-wider px-2 py-0.5 font-semibold">
                        {agent.salesVolume}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A6A] font-medium block">
                      {agent.role}
                    </span>
                    <h2 className="font-serif text-2xl text-[#11110F] group-hover:text-[#B69A6A] transition-colors">
                      {agent.name}
                    </h2>
                    <p className="text-xs text-[#736F66] leading-relaxed font-light line-clamp-3">
                      {agent.bio}
                    </p>

                    <div className="pt-2 border-t border-[#D9D4C9]/60 space-y-1.5 text-xs text-[#736F66]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B69A6A]" />
                        <span>{agent.locations.join(' · ')}</span>
                      </div>
                      <div className="text-[11px] text-[#11110F] font-medium">
                        {representedCount} active listings represented
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/agents/${agent.slug}`}
                    className="w-full py-3 text-center text-xs uppercase tracking-[0.18em] bg-[#11110F] text-[#F5F2EA] group-hover:bg-[#B69A6A] group-hover:text-[#11110F] transition-colors block font-medium"
                  >
                    View Advisor Profile
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Private Syndicate Banner */}
        <div className="mt-20 p-8 sm:p-12 border border-[#D9D4C9] bg-[#EAE5D9]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#11110F]">
              Seeking confidential, off-market representation?
            </h3>
            <p className="text-xs sm:text-sm text-[#736F66] font-light leading-relaxed">
              A significant portion of prime residential acquisitions across Manhattan, Beverly Hills, and Aspen never appear on public listings. Our partners manage private syndications under strict non-disclosure.
            </p>
          </div>
          <a
            href="mailto:private@veraestates.com"
            className="px-8 py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors shrink-0"
          >
            Direct Partner Inquiry
          </a>
        </div>
      </div>
    </div>
  );
};
export default Agents;
