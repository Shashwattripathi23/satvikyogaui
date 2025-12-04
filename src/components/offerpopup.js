"use client";

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Gift, ArrowRight } from 'lucide-react';

/**
 * OfferPopup Component
 * * A modal that appears automatically to showcase New Year offers.
 * Designed with a "Satvik" aesthetic (clean, calming, nature-inspired).
 */
const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Trigger popup to appear 1.5 seconds after page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // window.scrollTo(0, 6500);
    setIsOpen(false);
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <>
      {/* Backdrop & Modal Container */}
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Dark Backdrop with Blur */}
        <div 
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
          onClick={handleClose}
        ></div>

        {/* Modal Card */}
        <div 
          className={`relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
            isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
          }`}
        >
          {/* Decorative Header Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-green-100 to-emerald-50 z-0">
            {/* Abstract minimalist circles decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pistache-200/50 rounded-full blur-2xl"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl"></div>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-stone-500 hover:text-stone-800 transition-colors shadow-sm backdrop-blur-md"
            aria-label="Close offer"
          >
            <X size={20} />
          </button>

          {/* Content Wrapper */}
          <div className="relative z-10 px-8 pt-10 pb-8">
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4 text-amber-500">
                <Sparkles size={28} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-serif text-stone-800 font-medium mb-2">
                New Year Offers!
              </h2>
              <p className="text-stone-500 text-sm">
                Start your journey to inner peace this year.
              </p>
            </div>

            {/* Offers List */}
            <div className="space-y-4 mb-8">
              {/* Offer 1 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-green-200 transition-colors group">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">15% Off</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    On all 6-month bookings. Commit to your wellness today.
                  </p>
                </div>
              </div>

              {/* Offer 2 */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-amber-200 transition-colors group">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Gift size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Free 2-Day Retreat</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Included with online lesson plans when you book for 6 months.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button 
              className="w-full py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-stone-200"
              onClick={() => {
                // Add your navigation logic here, e.g., router.push('/booking')
                console.log("Navigate to booking");
                handleClose();
              }}
            >
              Claim Offer
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center mt-4 text-xs text-stone-400">
              *Valid until Jan 31st. Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferPopup;