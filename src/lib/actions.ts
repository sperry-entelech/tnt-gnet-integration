'use server';

import { calculatePrice } from './pricing-calculator';
import type { PricingRequest, PricingResponse } from './pricing-calculator';

// Server-side token validation (placeholder - implement your actual auth)
function validateGnetToken(token?: string): boolean {
  // In production, validate against your auth system
  const validTokens = [
    process.env.GNET_API_TOKEN,
    'gnet_dev_token', // Dev token for testing
  ].filter(Boolean);
  
  return token ? validTokens.includes(token) : false;
}

export async function getPricing(
  request: PricingRequest,
  token?: string
): Promise<PricingResponse> {
  
  // Validate token server-side
  if (!validateGnetToken(token)) {
    return {
      serviceDetails: [],
      breakdown: [],
      totalPrice: 0,
      success: false,
      error: 'Unauthorized: Invalid API token'
    };
  }

  // Rate limiting (basic implementation)
  // In production, use Redis or similar for distributed rate limiting
  
  try {
    const result = calculatePrice(request);
    
    // Log the request for analytics (server-side only)
    console.log('Pricing request:', {
      timestamp: new Date().toISOString(),
      serviceType: request.serviceType,
      vehicleType: request.vehicleType,
      totalPrice: result.totalPrice,
      success: result.success
    });
    
    return result;
  } catch (error) {
    console.error('Pricing calculation error:', error);
    return {
      serviceDetails: [],
      breakdown: [],
      totalPrice: 0,
      success: false,
      error: 'Internal server error'
    };
  }
}

// Server action for form submission
export async function submitPricingRequest(formData: FormData): Promise<PricingResponse> {
  const token = formData.get('token') as string;
  
  const request: PricingRequest = {
    serviceType: formData.get('serviceType') as any,
    vehicleType: formData.get('vehicleType') as any,
    hours: formData.get('hours') ? parseInt(formData.get('hours') as string) : undefined,
    dayType: formData.get('dayType') as any,
    airportCode: formData.get('airportCode') as any,
    tripType: formData.get('tripType') as any,
    serviceTime: formData.get('serviceTime') as string,
    pickupLocation: formData.get('pickupLocation') as string,
    dropoffLocation: formData.get('dropoffLocation') as string,
    serviceDate: formData.get('serviceDate') as string,
  };

  return getPricing(request, token);
}