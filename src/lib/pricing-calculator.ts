import { pricingData, airportNames } from './pricing-data';
import type { VehicleType, AirportCode, ServiceType, DayType } from './pricing-data';

export interface PricingRequest {
  serviceType: ServiceType;
  vehicleType: VehicleType;
  hours?: number;
  dayType?: DayType;
  airportCode?: AirportCode;
  tripType?: 'one-way' | 'round-trip';
  serviceTime?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  serviceDate?: string;
}

export interface PriceBreakdownItem {
  item: string;
  amount: number;
}

export interface ServiceDetail {
  item: string;
  value: string;
}

export interface PricingResponse {
  serviceDetails: ServiceDetail[];
  breakdown: PriceBreakdownItem[];
  totalPrice: number;
  success: boolean;
  error?: string;
}

export function calculatePrice(request: PricingRequest): PricingResponse {
  try {
    const { serviceType, vehicleType, hours, dayType, airportCode, tripType, serviceTime } = request;
    const vehicle = pricingData.vehicles[vehicleType];
    
    if (!vehicle) {
      return {
        serviceDetails: [],
        breakdown: [],
        totalPrice: 0,
        success: false,
        error: 'Invalid vehicle type'
      };
    }

    let basePrice = 0;
    let breakdown: PriceBreakdownItem[] = [];
    let serviceDetails: ServiceDetail[] = [];
    
    if (serviceType === 'hourly') {
      const actualHours = Math.max(hours || 3, vehicle.roundTrip.minHours);
      
      serviceDetails.push(
        { item: 'Service Type', value: 'Hourly (Round Trip)' },
        { item: 'Vehicle', value: `${vehicle.name} ${vehicle.unitNo ? '(' + vehicle.unitNo + ')' : ''}` },
        { item: 'Hours', value: `${actualHours} hours` },
        { item: 'Day Type', value: dayType === 'weekday' ? 'Mon-Thu (Discount)' : dayType === 'weekend' ? 'Weekend' : 'Holiday' }
      );
      
      breakdown.push(
        { item: `Base Rate (${actualHours} hrs × $${vehicle.roundTrip.baseHourly})`, amount: vehicle.roundTrip.baseHourly * actualHours },
        { item: `Gratuity (${actualHours} hrs × $${vehicle.roundTrip.gratuity})`, amount: vehicle.roundTrip.gratuity * actualHours },
        { item: `Fuel Surcharge (${actualHours} hrs × $${vehicle.roundTrip.fuelSurcharge})`, amount: vehicle.roundTrip.fuelSurcharge * actualHours },
        { item: `Mileage Charge (${actualHours} hrs × $${vehicle.roundTrip.mileageCharge})`, amount: vehicle.roundTrip.mileageCharge * actualHours }
      );
      
      basePrice = vehicle.roundTrip.totalHourly * actualHours;
      
      // Apply discounts/surcharges
      if (dayType === 'weekday') {
        const discount = basePrice * pricingData.surcharges.discounts.mondayThursdayService;
        breakdown.push({ item: 'Monday-Thursday Discount (10%)', amount: -discount });
        basePrice -= discount;
      } else if (dayType === 'holiday') {
        const surcharge = basePrice * pricingData.surcharges.holidaySurcharge;
        breakdown.push({ item: 'Holiday Surcharge (25%)', amount: surcharge });
        basePrice += surcharge;
      }
      
      if (actualHours >= 6) {
        const discount = basePrice * pricingData.surcharges.discounts.sixPlusHourTrip;
        breakdown.push({ item: '6+ Hour Discount (10%)', amount: -discount });
        basePrice -= discount;
      }
      
    } else if (serviceType === 'point-to-point') {
      serviceDetails.push(
        { item: 'Service Type', value: 'Point to Point' },
        { item: 'Vehicle', value: `${vehicle.name} ${vehicle.unitNo ? '(' + vehicle.unitNo + ')' : ''}` }
      );
      
      breakdown.push(
        { item: 'Base Rate', amount: vehicle.pointToPoint.baseHourly },
        { item: 'Gratuity (Flat)', amount: vehicle.pointToPoint.gratuityFlat },
        { item: 'Fuel Surcharge', amount: vehicle.pointToPoint.fuelSurcharge },
        { item: 'Mileage Charge', amount: vehicle.pointToPoint.mileageCharge }
      );
      
      basePrice = vehicle.pointToPoint.totalHourly;
      
    } else if (serviceType === 'airport') {
      if (!airportCode || !('airportRates' in vehicle) || !vehicle.airportRates || !vehicle.airportRates[airportCode]) {
        return {
          serviceDetails: [],
          breakdown: [],
          totalPrice: 0,
          success: false,
          error: 'Airport transfer not available for this vehicle'
        };
      }
      
      serviceDetails.push(
        { item: 'Service Type', value: 'Airport Transfer' },
        { item: 'Vehicle', value: `${vehicle.name} ${vehicle.unitNo ? '(' + vehicle.unitNo + ')' : ''}` },
        { item: 'Airport', value: airportNames[airportCode] },
        { item: 'Trip Type', value: tripType === 'round-trip' ? 'Round Trip' : 'One Way' }
      );
      
      basePrice = ('airportRates' in vehicle) ? vehicle.airportRates[airportCode] : 0;
      if (tripType === 'round-trip') {
        basePrice *= 1.8; // Round trip pricing adjustment
      }
      
      breakdown.push({ item: `${airportNames[airportCode]} - ${tripType}`, amount: basePrice });
    }
    
    // Check for after-hour pickup
    if (serviceTime) {
      const hour = parseInt(serviceTime.split(':')[0]);
      if (hour >= 23 || hour < 6) {
        breakdown.push({ item: 'After-Hour Pickup Fee (11pm-6am)', amount: pricingData.surcharges.afterHourPickupFee });
        basePrice += pricingData.surcharges.afterHourPickupFee;
      }
    }
    
    return {
      serviceDetails,
      breakdown,
      totalPrice: Math.round(basePrice * 100) / 100, // Round to 2 decimal places
      success: true
    };
    
  } catch (error) {
    return {
      serviceDetails: [],
      breakdown: [],
      totalPrice: 0,
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred calculating the price'
    };
  }
}