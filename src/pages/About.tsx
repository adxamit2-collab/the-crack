import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Compass, Shield, Users, CheckCircle2 } from 'lucide-react';
import { agents } from '../data/agents';
import ViewingBookingModal from '../components/property/ViewingBookingModal';

export const About: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-24 pb-28 text-[#11110F]">
      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            ABOUT THE CRACK
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.04] text-[#11110F] font-normal">
            Real estate, <br />
            <span className="italic font-light">considered differently.</span>
          </h1>
          <p className="text-base sm:text-xl text-[#736F66] leading-relaxed font-light pt-3 max-w-2xl">
            Founded on the conviction that a residence is not merely square footage, but a sculpture for living, thinking, and preserving generational tranquility.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="mt-14 aspect-[21/9] bg-[#11110F] overflow-hidden border border-[#D9D4C9]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="THE CRACK Architectural Residence"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section 1: Our Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#D9D4C9]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
              The architecture of silence.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#11110F]/85 font-light leading-relaxed">
            <p>
              In premier global hubs like New York, Los Angeles, Miami, and Aspen, real estate marketing has too often succumbed to loudness and generic superlatives. We founded THE CRACK as an antidote to that noise.
            </p>
            <p>
              We treat residential acquisitions as private fiduciary trusts. We evaluate properties through the eyes of an architect, an archivist, and an asset manager—measuring solar ingress, structural mass, ceiling voids, acoustic insulation, and legal title with rigorous precision.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Our Standards (Dark Section) */}
      <section className="bg-[#11110F] text-[#F5F2EA] py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold">
              RIGOROUS ADVISORY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white">
              Our Standards
            </h2>
            <p className="text-sm text-[#D9D4C9]/75 font-light">
              We reject over 75% of candidate properties to preserve an uncompromising standard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 bg-white/[0.02] space-y-4">
              <div className="font-serif text-3xl text-[#B69A6A]">01</div>
              <h3 className="font-serif text-2xl text-white">Spatial Pedigree</h3>
              <p className="text-xs sm:text-sm text-[#D9D4C9]/75 leading-relaxed font-light">
                Proportion and light cannot be faked with paint. We only represent homes that exhibit genuine architectural poise and enduring spatial flow.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-white/[0.02] space-y-4">
              <div className="font-serif text-3xl text-[#B69A6A]">02</div>
              <h3 className="font-serif text-2xl text-white">Confidential Syndication</h3>
              <p className="text-xs sm:text-sm text-[#D9D4C9]/75 leading-relaxed font-light">
                Off-market discovery protects both seller valuation and buyer privacy. We maintain direct access to family offices and unpublicized estates.
              </p>
            </div>

            <div className="p-8 border border-white/10 bg-white/[0.02] space-y-4">
              <div className="font-serif text-3xl text-[#B69A6A]">03</div>
              <h3 className="font-serif text-2xl text-white">Fiduciary Precision</h3>
              <p className="text-xs sm:text-sm text-[#D9D4C9]/75 leading-relaxed font-light">
                Independent structural surveys, title deed searches, and historical comparable studies accompany every presentation dossier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Network & Key Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            GEOGRAPHIC SPHERE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
            Our Network
          </h2>
          <p className="text-sm text-[#736F66] font-light">
            Anchored in the most competitive luxury markets in North America and international capitals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#D9D4C9] pt-12">
          {[
            { city: 'New York', desc: 'Manhattan, SoHo, Tribeca & Central Park South' },
            { city: 'Miami', desc: 'Miami Beach, Star Island, North Bay Road & Palm Beach' },
            { city: 'Los Angeles', desc: 'Beverly Hills, Bel Air, Hollywood Hills & Malibu' },
            { city: 'Aspen', desc: 'Red Mountain, Downtown Core & Roaring Fork Ranches' }
          ].map((net, i) => (
            <div key={i} className="space-y-2">
              <div className="font-serif text-2xl text-[#11110F]">{net.city}</div>
              <p className="text-xs text-[#736F66] font-light leading-relaxed">{net.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Our People */}
      <section className="bg-[#FAF8F3] border-y border-[#D9D4C9] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
                LEADERSHIP
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#11110F]">
                Our People
              </h2>
              <p className="text-sm text-[#736F66] font-light">
                Meet the senior advisors managing our client relationships and private acquisitions.
              </p>
            </div>

            <Link
              to="/agents"
              className="text-xs uppercase tracking-[0.18em] text-[#11110F] hover:text-[#B69A6A] transition-colors pb-1 border-b border-[#11110F]"
            >
              <span>View All Advisors →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-[#F5F2EA] border border-[#D9D4C9] p-4 text-center space-y-3">
                <div className="aspect-square overflow-hidden bg-[#11110F]">
                  <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#11110F]">{agent.name}</h3>
                  <div className="text-[10px] text-[#B69A6A] uppercase tracking-wider">{agent.title}</div>
                  <div className="text-xs text-[#736F66] mt-0.5">{agent.locations.join(' · ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Contact CTA */}
      <section id="contact" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
          PRIVATE DIALOGUE
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#11110F]">
          Work with THE CRACK
        </h2>
        <p className="text-sm sm:text-base text-[#736F66] font-light max-w-lg mx-auto leading-relaxed">
          Whether you are acquiring your family’s next flagship estate or considering confidential disposition of a landmark property, our managing partners welcome a discreet consultation.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsBookingModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors cursor-pointer"
          >
            Schedule Private Consultation
          </button>
          <a
            href="mailto:private@veraestates.com"
            className="w-full sm:w-auto px-8 py-4 border border-[#11110F] text-[#11110F] text-xs uppercase tracking-[0.2em] hover:bg-[#11110F] hover:text-[#F5F2EA] transition-colors font-medium text-center"
          >
            Direct Partner Email
          </a>
        </div>
      </section>

      <ViewingBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};
export default About;
