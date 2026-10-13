import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe2, Award, Calendar, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { agents } from '../data/agents';
import { properties } from '../data/properties';
import PropertyCard from '../components/property/PropertyCard';
import ViewingBookingModal from '../components/property/ViewingBookingModal';
import { useToast } from '../context/ToastContext';
import { saveDemoLead } from '../utils/demoLeadStore';

export const AgentProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useToast();
  const agent = agents.find((a) => a.slug === slug);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [consultationName, setConsultationName] = useState('');
  const [consultationEmail, setConsultationEmail] = useState('');
  const [consultationNote, setConsultationNote] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center p-6 text-center text-[#11110F]">
        <div className="max-w-md space-y-4">
          <h2 className="font-serif text-3xl">Advisor Profile Not Found</h2>
          <Link
            to="/agents"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Advisors</span>
          </Link>
        </div>
      </div>
    );
  }

  const representedProperties = properties.filter((p) => p.agentId === agent.id);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationName.trim() || !/\S+@\S+\.\S+/.test(consultationEmail)) {
      showToast('Enter your name and a valid email address.', 'error', 'Check Your Details');
      return;
    }
    const saved = saveDemoLead('agent-consultation');
    setFormSubmitted(true);
    showToast(saved ? 'Demo interaction acknowledged. No form details were sent or saved.' : 'Demo confirmation shown, but local saving was unavailable.', saved ? 'info' : 'error', 'Demo Mode');
  };

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-24 pb-28 text-[#11110F]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-[#736F66] flex items-center gap-2">
        <Link to="/" className="hover:text-[#11110F] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/agents" className="hover:text-[#11110F] transition-colors">Advisors</Link>
        <span>/</span>
        <span className="text-[#11110F] font-medium">{agent.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-6 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Large Portrait */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-[#11110F] border border-[#D9D4C9] overflow-hidden relative">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-6 text-white">
                  <div className="font-serif text-2xl">{agent.name}</div>
                  <div className="text-xs text-[#B69A6A] uppercase tracking-wider">{agent.role}</div>
                  {agent.salesVolume && (
                    <div className="text-[11px] text-[#D9D4C9] pt-1">{agent.salesVolume}</div>
                  )}
                </div>
              </div>

              {/* Direct Contact Links */}
              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="w-full py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.18em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B69A6A]" />
                  <span>Call {agent.phone}</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="w-full py-3.5 border border-[#11110F] text-[#11110F] text-xs uppercase tracking-[0.18em] hover:bg-[#11110F] hover:text-[#F5F2EA] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{agent.email}</span>
                </a>
              </div>
            </div>

            {/* Right: Advisor Bio & Details */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
                  MANAGING PARTNER · {agent.locations.join(' · ')}
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#11110F]">
                  {agent.name}
                </h1>
                <p className="text-sm text-[#736F66] font-light">{agent.title}</p>
              </div>

              {/* Bio */}
              <div className="space-y-4 text-sm text-[#11110F]/85 leading-relaxed font-light border-t border-[#D9D4C9]/60 pt-6">
                <p>{agent.bio}</p>
                <p>
                  As an advisor within THE CRACK, {agent.name.split(' ')[0]} works strictly with qualified family offices, trusts, and private collectors seeking discretion, architectural permanence, and unpublicized access.
                </p>
              </div>

              {/* Specialties / Languages / Transactions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 border-t border-[#D9D4C9]/60">
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Specializations</div>
                  <ul className="text-xs text-[#11110F] space-y-1">
                    {agent.specialties.map((spec, i) => (
                      <li key={i}>• {spec}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Territories</div>
                  <ul className="text-xs text-[#11110F] space-y-1">
                    {agent.locations.map((loc, i) => (
                      <li key={i}>• {loc}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-[#736F66]">Career Volume</div>
                  <div className="text-sm font-medium text-[#11110F]">
                    {agent.salesVolume || '$250M+'}
                  </div>
                  <div className="text-[11px] text-[#736F66]">
                    Languages: {agent.languages.join(', ')}
                  </div>
                </div>
              </div>

              {/* Consultation Booking Form */}
              <div className="p-6 bg-[#F5F2EA] border border-[#D9D4C9] space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#B69A6A] font-semibold block">
                    PRIVATE CONSULTATION
                  </span>
                  <h3 className="font-serif text-xl text-[#11110F]">
                    Schedule a Consultation with {agent.name.split(' ')[0]}
                  </h3>
                </div>

                {formSubmitted ? (
                  <div className="p-4 bg-[#386B52]/10 border border-[#386B52] text-xs text-[#11110F] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#386B52]" />
                    <span>Demo interaction acknowledged. No personal details were sent or saved.</span>
                  </div>
                ) : (
                  <form onSubmit={handleConsultationSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={consultationName}
                        onChange={(e) => setConsultationName(e.target.value)}
                        required
                        className="px-3 py-2 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                      />
                      <input
                        type="email"
                        placeholder="Your Email Address"
                        value={consultationEmail}
                        onChange={(e) => setConsultationEmail(e.target.value)}
                        required
                        className="px-3 py-2 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                      />
                    </div>
                    <textarea
                      placeholder="Specific requirements or residence of interest..."
                      rows={2}
                      value={consultationNote}
                      onChange={(e) => setConsultationNote(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A] resize-none"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.18em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors cursor-pointer font-medium"
                    >
                      SCHEDULE A CONSULTATION
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Properties Represented By This Agent */}
        <div className="mt-20">
          <div className="mb-10 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
              FEATURED RESIDENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#11110F]">
              Properties represented by {agent.name}
            </h2>
          </div>

          {representedProperties.length === 0 ? (
            <div className="p-8 border border-[#D9D4C9] bg-[#FAF8F3] text-center text-xs text-[#736F66]">
              Currently representing confidential, off-market listings only. Please inquire directly with the advisor.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {representedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>

      <ViewingBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
export default AgentProfile;
