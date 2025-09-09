import { ReactNode } from 'react';
import { submitPricingRequest } from '@/lib/actions';
import { PricingForm } from './PricingForm';
import { PricingResults } from './PricingResults';

interface TNTPricingToolProps {
  token?: string;
  className?: string;
  theme?: 'dark' | 'light';
  showLogo?: boolean;
  partnerBranding?: {
    name: string;
    logo?: string;
  };
}

// Server Component - handles secure token validation
export async function TNTPricingTool({
  token = 'gnet_dev_token', // Default for development
  className = '',
  theme = 'dark',
  showLogo = true,
  partnerBranding,
}: TNTPricingToolProps) {
  
  // Server-side component renders with token already validated
  const baseClasses = theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 to-black text-white'
    : 'bg-gradient-to-br from-gray-50 to-white text-gray-900';
    
  return (
    <div className={`min-h-screen p-4 ${baseClasses} ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          
          {/* Header with Logo */}
          {showLogo && (
            <div className="text-center mb-8">
              <div className="flex flex-col items-center space-y-4">
                {/* TNT Logo would go here */}
                <div className="w-48 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">TNT LIMOUSINE</span>
                </div>
                
                {partnerBranding && (
                  <div className="text-sm opacity-75">
                    Powered by {partnerBranding.name}
                  </div>
                )}
                
                <h1 className="text-2xl font-bold">Professional Transportation Services</h1>
                <p className="text-lg opacity-90">Live Pricing Calculator</p>
                <p className="text-sm text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/30">
                  Real-Time Pricing & Instant Quotes
                </p>
              </div>
            </div>
          )}

          {/* Pricing Form - Client Component */}
          <PricingForm 
            action={submitPricingRequest}
            token={token}
            theme={theme}
          />
          
        </div>
      </div>
    </div>
  );
}

export default TNTPricingTool;