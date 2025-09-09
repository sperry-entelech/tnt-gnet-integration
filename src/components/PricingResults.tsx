'use client';

import clsx from 'clsx';
import type { PricingResponse } from '@/lib/pricing-calculator';

interface PricingResultsProps {
  result: PricingResponse;
  theme: 'dark' | 'light';
}

export function PricingResults({ result, theme }: PricingResultsProps) {
  if (!result.success) {
    return (
      <div className={clsx(
        'mt-8 p-6 rounded-xl border',
        theme === 'dark' 
          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
          : 'bg-red-50 border-red-200 text-red-600'
      )}>
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p>{result.error}</p>
      </div>
    );
  }

  const containerClasses = clsx(
    'mt-8 p-8 rounded-xl border backdrop-blur-lg',
    theme === 'dark'
      ? 'bg-red-500/10 border-red-500/30'
      : 'bg-red-50 border-red-200'
  );

  const titleClasses = clsx(
    'text-2xl font-bold text-center mb-6',
    theme === 'dark' ? 'text-red-400' : 'text-red-600'
  );

  const sectionClasses = clsx(
    'p-5 rounded-lg border',
    theme === 'dark'
      ? 'bg-white/5 border-white/10'
      : 'bg-white border-gray-200'
  );

  const itemClasses = clsx(
    'flex justify-between items-center py-2 border-b text-sm',
    theme === 'dark'
      ? 'border-white/10 text-white'
      : 'border-gray-200 text-gray-900'
  );

  return (
    <div className={containerClasses}>
      <h3 className={titleClasses}>Detailed Price Breakdown</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Service Details */}
        <div className={sectionClasses}>
          <h4 className={clsx(
            'font-semibold mb-4 text-sm uppercase tracking-wider',
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          )}>
            Service Details
          </h4>
          <div className="space-y-1">
            {result.serviceDetails.map((detail, index) => (
              <div key={index} className={itemClasses}>
                <span className="font-medium">{detail.item}:</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className={sectionClasses}>
          <h4 className={clsx(
            'font-semibold mb-4 text-sm uppercase tracking-wider',
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          )}>
            Cost Breakdown
          </h4>
          <div className="space-y-1">
            {result.breakdown.map((item, index) => (
              <div key={index} className={itemClasses}>
                <span className="font-medium">{item.item}</span>
                <span className={clsx(
                  item.amount < 0 ? 'text-green-500' : ''
                )}>
                  {item.amount >= 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className={clsx(
        'text-center py-8 rounded-lg border mb-6',
        theme === 'dark'
          ? 'bg-red-500/10 border-red-500/20'
          : 'bg-red-50 border-red-200'
      )}>
        <div className={clsx(
          'text-4xl font-bold',
          theme === 'dark' ? 'text-red-400' : 'text-red-600'
        )}>
          Total: ${result.totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Contact Information */}
      <div className={clsx(
        'p-6 rounded-lg border text-center',
        theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-gray-200'
      )}>
        <h4 className={clsx(
          'text-xl font-semibold mb-4',
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        )}>
          Ready to Book Your Service?
        </h4>
        <div className="space-y-2">
          <p className={clsx(
            'text-lg',
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          )}>
            Call: <strong>(804) 972-4550</strong>
          </p>
          <p className={clsx(
            'text-lg',
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          )}>
            Email: <strong>info@tntlimousine.com</strong>
          </p>
          <p className={clsx(
            'text-sm mt-4',
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          )}>
            *All prices include gratuity. Additional fees may apply for tolls and parking.
          </p>
        </div>
      </div>

      {/* GNET Integration Features */}
      <div className={clsx(
        'mt-6 p-4 rounded-lg border text-center',
        'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30'
      )}>
        <h4 className="text-blue-400 font-semibold mb-2">Professional Service Features</h4>
        <p className="text-sm opacity-90">
          This quote can be automatically submitted to TNT's dispatch system (FastTrak Invision) 
          and tracked through our Zoho CRM integration. Perfect for seamless affiliate partnerships.
        </p>
      </div>
    </div>
  );
}