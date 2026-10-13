import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Upload, Loader2, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { saveDemoLead } from '../utils/demoLeadStore';

export const ListProperty: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyType, setPropertyType] = useState('Luxury Residence');
  const [estimatedValue, setEstimatedValue] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles(names);
      showToast(`${names.length} photographs staged for review.`, 'info', 'Assets Uploaded');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required.';
    if (!phone.trim()) newErrors.phone = 'Direct telephone number is required.';
    if (!propertyAddress.trim()) newErrors.propertyAddress = 'Property address is required.';
    if (!estimatedValue.trim()) newErrors.estimatedValue = 'Target or estimated value in USD is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const saved = saveDemoLead('property-listing');
    window.setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showToast(saved ? 'Demo interaction acknowledged. No form details were sent or saved.' : 'Demo confirmation shown, but local saving was unavailable.', saved ? 'info' : 'error', 'Demo Mode');
    }, 250);
  };

  return (
    <div className="bg-[#F5F2EA] min-h-screen pt-28 pb-28 text-[#11110F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A6A] font-semibold block">
            PRIVATE VALUATION &amp; REPRESENTATION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#11110F] leading-tight font-normal">
            Your property deserves <br />
            <span className="italic font-light">the right story.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#736F66] font-light leading-relaxed">
            We represent significant residences with editorial reverence, discreet syndication, and direct access to vetted private capital across the globe.
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 sm:p-14 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-[#386B52]/10 text-[#386B52] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B69A6A] font-semibold">
                DEMO SUBMISSION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#11110F]">
                Your demo request is recorded.
              </h2>
              <p className="text-xs sm:text-sm text-[#736F66] max-w-md mx-auto leading-relaxed">
                Thank you, {name}. This is a frontend demo. No request was sent to an agent. Connect a secure backend or CRM before using this form in production.
              </p>
            </div>

            <div className="p-5 bg-[#F5F2EA] border border-[#D9D4C9]/70 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#736F66]">Property:</span>
                <span className="font-medium text-[#11110F]">{propertyAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777367]">Typology:</span>
                <span className="font-medium text-[#11110F]">{propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#777367]">Estimated Valuation:</span>
                <span className="font-medium text-[#11110F]">{estimatedValue}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/properties"
                className="px-8 py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors font-medium"
              >
                Browse Current Residences
              </Link>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3.5 border border-[#11110F] text-[#11110F] text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-[#FAF8F3] border border-[#D9D4C9] p-8 sm:p-12 shadow-sm space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  placeholder="e.g. William Sterling"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                />
                {errors.name && <p className="text-[11px] text-[#A04238] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="sterling@familyoffice.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                />
                {errors.email && <p className="text-[11px] text-[#A04238] mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                  Direct Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  placeholder="+1 (212) 555-0144"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                />
                {errors.phone && <p className="text-[11px] text-[#A04238] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                  Property Address &amp; Market *
                </label>
                <input
                  type="text"
                  value={propertyAddress}
                  placeholder="e.g. 740 Park Ave, New York or Carbon Beach, Malibu"
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                />
                {errors.propertyAddress && <p className="text-[11px] text-[#A04238] mt-1">{errors.propertyAddress}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                >
                  <option value="Luxury Residence">Luxury Residence / Estate</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="City Apartment">City Loft / Apartment</option>
                  <option value="Alpine Compound">Alpine Compound</option>
                  <option value="Waterfront Villa">Waterfront Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                  Estimated Value (USD) *
                </label>
                <input
                  type="text"
                  value={estimatedValue}
                  placeholder="e.g. $12,500,000"
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                />
                {errors.estimatedValue && <p className="text-[11px] text-[#A04238] mt-1">{errors.estimatedValue}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                Message &amp; Architectural Context
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention unique architect, privacy constraints, views, or desired transaction timeframe..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A] resize-none"
              />
            </div>

            {/* Optional Imagery */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                Attach Architectural Floorplans or Photography (Optional)
              </label>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D9D4C9] hover:border-[#B69A6A] bg-[#F5F2EA] cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-[#B69A6A] mb-1.5 stroke-1" />
                <span className="text-xs text-[#11110F]">Upload confidential files or site plans</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleSimulateUpload}
                  className="hidden"
                />
              </label>
              {uploadedFiles.length > 0 && (
                <div className="mt-2 text-xs text-[#386B52] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{uploadedFiles.length} file(s) attached</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#D9D4C9]">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditing Submission...</span>
                  </>
                ) : (
                  <>
                    <span>REQUEST A PRIVATE VALUATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-[#736F66] mt-3">
                All inquiries are protected by standard private client non-disclosure agreements.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default ListProperty;
