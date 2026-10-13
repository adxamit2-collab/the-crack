import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Building2 } from 'lucide-react';
import { Property } from '../../types';
import { agents } from '../../data/agents';
import { properties } from '../../data/properties';
import { useToast } from '../../context/ToastContext';
import { saveDemoLead } from '../../utils/demoLeadStore';

interface ViewingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
}

export const ViewingBookingModal: React.FC<ViewingBookingModalProps> = ({
  isOpen,
  onClose,
  property: initialProperty,
}) => {
  const { showToast } = useToast();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    initialProperty ? initialProperty.id : properties[0]?.id || ''
  );
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentProperty =
    initialProperty ||
    properties.find((p) => p.id === selectedPropertyId) ||
    properties[0];

  const assignedAgent = agents.find((a) => a.id === currentProperty?.agentId) || agents[0];

  const timeSlots = ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '05:30 PM'];

  // Next 7 available dates
  const today = new Date();
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return {
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`, 
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !selectedDate) {
      newErrors.date = 'Please select a preferred viewing date.';
      setErrors(newErrors);
      return;
    }

    if (step === 2 && !selectedTime) {
      newErrors.time = 'Please select a preferred viewing time slot.';
      setErrors(newErrors);
      return;
    }

    if (step === 3) {
      if (!name.trim()) newErrors.name = 'Full name is required.';
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
      if (!phone.trim() || phone.length < 8) {
        newErrors.phone = 'Please provide a valid direct phone number.';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      // Submit
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const saved = saveDemoLead('viewing-request');
    window.setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      showToast(
        saved ? 'Demo interaction acknowledged. No form details were sent or saved.' : 'Demo confirmation shown, but local saving was unavailable.',
        saved ? 'info' : 'error',
        'Demo Mode'
      );
    }, 250);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('11:30 AM');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#FBF9F5] border border-[#D8D2C7] max-w-xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close booking modal"
          className="absolute top-4 right-4 p-2 text-[#77736B] hover:text-[#1B1B19] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Step 5: Success Confirmation */
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-[#386B52]/10 text-[#386B52] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B69A6A] font-semibold">
                DEMO SUBMISSION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#11110F]">
                Your demo viewing request is recorded.
              </h3>
              <p className="text-xs text-[#736F66] max-w-md mx-auto leading-relaxed">
                Thank you, {name}. This is a frontend demo. No viewing was booked and no agent was notified. Connect a secure backend or CRM before production use.
              </p>
            </div>

            <div className="bg-[#F5F2EA] border border-[#D9D4C9]/70 p-5 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-[#D9D4C9]/50 pb-2">
                <span className="text-[#736F66] uppercase tracking-wider">Property</span>
                <span className="font-serif text-sm font-medium text-[#11110F]">{currentProperty.title}</span>
              </div>
              <div className="flex justify-between border-b border-[#D9D4C9]/50 pb-2">
                <span className="text-[#736F66] uppercase tracking-wider">Date &amp; Time</span>
                <span className="font-medium text-[#11110F]">
                  {selectedDate || 'Upcoming Schedule'}, {selectedTime}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#D9D4C9]/50 pb-2">
                <span className="text-[#736F66] uppercase tracking-wider">Location</span>
                <span className="text-[#11110F]">{currentProperty.address}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[#736F66] uppercase tracking-wider">Representing Advisor</span>
                <div className="flex items-center gap-2">
                  <img
                    src={assignedAgent.image}
                    alt={assignedAgent.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="font-medium text-[#11110F]">{assignedAgent.name}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.2em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors font-medium cursor-pointer"
            >
              Back to Residence
            </button>
          </div>
        ) : (
          /* Multi-step Form */
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#B69A6A] font-semibold">
                PRIVATE VIEWING EXPERIENCE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#11110F]">
                Book a Private Viewing
              </h3>
              <p className="text-xs text-[#736F66]">
                Step {step} of 4 • Confidential &amp; tailored to your schedule
              </p>
            </div>

            {/* Stepper indicator */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1 transition-colors duration-300 ${
                    s <= step ? 'bg-[#B69A6A]' : 'bg-[#D9D4C9]/40'
                  }`}
                />
              ))}
            </div>

            {/* Selected Property preview if opened from header */}
            {!initialProperty && (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-[#736F66]">
                  Select Residence of Interest
                </label>
                <select
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} — {p.location} ({p.price})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {initialProperty && (
              <div className="flex items-center gap-3 p-3 bg-[#F5F2EA] border border-[#D9D4C9]/60">
                <Building2 className="w-5 h-5 text-[#B69A6A] shrink-0" />
                <div className="overflow-hidden">
                  <div className="font-serif text-sm font-medium text-[#11110F] truncate">
                    {currentProperty.title}
                  </div>
                  <div className="text-[11px] text-[#736F66]">
                    {currentProperty.location} · {currentProperty.price}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Select Date */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-[#11110F] font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B69A6A]" />
                    <span>Select Preferred Date</span>
                  </label>
                  {errors.date && (
                    <span className="text-[11px] text-[#A04238]">{errors.date}</span>
                  )}
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => {
                          setSelectedDate(item.iso);
                          setErrors({});
                        }}
                        className={`p-2.5 text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#11110F] text-[#F5F2EA] border-[#11110F]'
                            : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
                        }`}
                      >
                        <div className="text-[9px] uppercase tracking-wider text-[#736F66]">
                          {item.dayName}
                        </div>
                        <div className="font-serif text-lg font-medium py-0.5">
                          {item.dayNumber}
                        </div>
                        <div className="text-[9px] uppercase text-[#736F66]">
                          {item.month}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Select Time */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-wider text-[#11110F] font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B69A6A]" />
                    <span>Select Time Slot</span>
                  </label>
                  {errors.time && (
                    <span className="text-[11px] text-[#A04238]">{errors.time}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 px-4 text-xs tracking-wider border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#11110F] text-[#F5F2EA] border-[#11110F]'
                            : 'bg-white border-[#D9D4C9] text-[#11110F] hover:border-[#B69A6A]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-[#736F66] leading-relaxed">
                  * Viewings average 45-60 minutes including structural walkthrough with the representing managing partner.
                </p>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    placeholder="e.g. Eleanor Vance"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                  />
                  {errors.name && (
                    <p className="text-[11px] text-[#A04238] mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    placeholder="vance@familyoffice.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#A04238] mt-1">{errors.email}</p>
                  )}
                </div>

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
                  {errors.phone && (
                    <p className="text-[11px] text-[#A04238] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Special Request / Message */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#736F66] mb-1 font-medium">
                    Specific Inquiries or Logistics (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="E.g., Private security clearance required, or architect team joining the inspection."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D4C9] text-xs text-[#11110F] focus:outline-none focus:border-[#B69A6A] resize-none"
                  />
                </div>

                <div className="p-3 bg-[#F5F2EA] border border-[#D9D4C9]/60 text-xs space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-[#B69A6A] font-semibold">
                    Review Summary
                  </div>
                  <div className="text-[#11110F] font-medium">
                    {currentProperty.title}
                  </div>
                  <div className="text-[#736F66]">
                    Date: {selectedDate || 'Upcoming'} at {selectedTime}
                  </div>
                  <div className="text-[#736F66]">
                    Contact: {name} ({email}, {phone})
                  </div>
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D9D4C9]/60">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  disabled={isLoading}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#736F66] hover:text-[#11110F] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={isLoading}
                className="px-6 py-2.5 bg-[#11110F] text-[#F5F2EA] text-xs uppercase tracking-[0.18em] hover:bg-[#B69A6A] hover:text-[#11110F] transition-colors flex items-center gap-2 font-medium cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <span>{step === 4 ? 'Confirm Viewing' : 'Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ViewingBookingModal;
