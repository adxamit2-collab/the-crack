import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { saveDemoLead } from '../../utils/demoLeadStore';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Luxury Residence');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('3');
  const [area, setArea] = useState('2400');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!address.trim()) newErrors.address = 'Property address or sector is required.';
    if (!name.trim()) newErrors.name = 'Your name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email address required.';
    if (!phone.trim()) newErrors.phone = 'Contact telephone is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const saved = saveDemoLead('valuation');
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast(saved ? 'Demo interaction acknowledged. No form details were sent or saved.' : 'Demo confirmation shown, but local saving was unavailable.', saved ? 'info' : 'error', 'Demo Mode');
    }, 250);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#FBF9F5] border border-[#D8D2C7] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close valuation modal"
          className="absolute top-4 right-4 p-2 text-[#77736B] hover:text-[#1B1B19] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-5">
            <div className="w-14 h-14 mx-auto bg-[#3E7657]/10 text-[#3E7657] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A88A58] font-medium">
                Demo Submission
              </span>
              <h3 className="font-serif text-2xl text-[#1B1B19]">
                Demo valuation request recorded.
              </h3>
              <p className="text-xs text-[#77736B] leading-relaxed max-w-sm mx-auto">
                Thank you, {name}. This is a frontend demo. No request was sent to an agent. Connect a secure backend or CRM before using this form in production.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-[0.2em] hover:bg-[#A88A58] transition-colors font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#A88A58] font-medium">
                Market Appraisal
              </span>
              <h3 className="font-serif text-2xl text-[#1B1B19]">Thinking about selling?</h3>
              <p className="text-xs text-[#77736B] leading-relaxed">
                Discover what your property could command in today’s private prime market.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                  Property Address / Neighborhood *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 740 Park Avenue, New York or Star Island, Miami"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                />
                {errors.address && <p className="text-[11px] text-[#A84B43] mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                  >
                    <option value="Luxury Residence">Luxury Residence</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="City Apartment">City Apartment</option>
                    <option value="Family Home">Family Home</option>
                    <option value="Commercial Floor">Commercial Floor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                    Approx Area (sqft)
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                    Bedrooms
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                  >
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                    Bathrooms
                  </label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                  >
                    <option value="2">2 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="4">4 Bathrooms</option>
                    <option value="5+">5+ Bathrooms</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-[#D8D2C7]/60 pt-3 space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Full legal or preferred name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                  />
                  {errors.name && <p className="text-[11px] text-[#A84B43] mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      placeholder="name@domain.com"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                    />
                    {errors.email && <p className="text-[11px] text-[#A84B43] mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#77736B] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      placeholder="+880 17..."
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#D8D2C7] text-xs text-[#1B1B19] focus:outline-none focus:border-[#A88A58]"
                    />
                    {errors.phone && <p className="text-[11px] text-[#A84B43] mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#191918] text-[#F5F2EC] text-xs uppercase tracking-[0.2em] hover:bg-[#A88A58] transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Calculating Valuation...</span>
                </>
              ) : (
                <>
                  <span>Request Valuation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default ValuationModal;
