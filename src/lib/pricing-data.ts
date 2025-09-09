// TNT Limousine Pricing Data - Server Side Only
export const pricingData = {
  vehicles: {
    'sedan': {
      name: 'Sedan',
      unitNo: '04/05',
      capacity: 3,
      roundTrip: {
        baseHourly: 60,
        gratuity: 12,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 100,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 95,
        gratuityFlat: 40,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 155
      },
      airportRates: {
        richmond: 105,
        charlottesville: 333,
        national: 450,
        dulles: 460,
        bwi: 657
      }
    },
    'transit': {
      name: 'Transit',
      unitNo: '',
      capacity: '12-15',
      roundTrip: {
        baseHourly: 90,
        gratuity: 19,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 137,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 165,
        gratuityFlat: 40,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 225
      },
      airportRates: {
        richmond: 175,
        charlottesville: 525,
        national: 700,
        dulles: 710,
        bwi: 854
      }
    },
    'executive-mini-bus': {
      name: 'Executive Mini Bus',
      unitNo: '09',
      capacity: 12,
      roundTrip: {
        baseHourly: 95,
        gratuity: 19,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 142,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 170,
        gratuityFlat: 50,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 240
      }
    },
    'mini-bus-sofa': {
      name: 'Mini Bus (Sofa)',
      unitNo: '01',
      capacity: 10,
      roundTrip: {
        baseHourly: 95,
        gratuity: 19,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 142,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 170,
        gratuityFlat: 50,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 240
      }
    },
    'stretch-limo': {
      name: 'Stretch Limo',
      unitNo: '03',
      capacity: 8,
      roundTrip: {
        baseHourly: 113,
        gratuity: 19,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 160,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 230,
        gratuityFlat: 50,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 300
      }
    },
    'sprinter-limo': {
      name: 'Sprinter Limo',
      unitNo: '02',
      capacity: 10,
      roundTrip: {
        baseHourly: 113,
        gratuity: 19,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 160,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 260,
        gratuityFlat: 50,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 330
      },
      airportRates: {
        richmond: 194,
        charlottesville: 575,
        national: 780,
        dulles: 790,
        bwi: 910
      }
    },
    'limo-bus': {
      name: 'Limo Bus',
      unitNo: '10',
      capacity: 18,
      roundTrip: {
        baseHourly: 152,
        gratuity: 28,
        fuelSurcharge: 10,
        mileageCharge: 18,
        totalHourly: 208,
        minHours: 3
      },
      pointToPoint: {
        baseHourly: 300,
        gratuityFlat: 50,
        fuelSurcharge: 10,
        mileageCharge: 10,
        totalHourly: 370
      },
      airportRates: {
        richmond: 225,
        charlottesville: 624,
        national: 1020,
        dulles: 1045,
        bwi: 1265
      }
    }
  },
  surcharges: {
    afterHourPickupFee: 20,
    discounts: {
      sixPlusHourTrip: 0.10,
      mondayThursdayService: 0.10,
      lateInquiry: 0.15
    },
    holidaySurcharge: 0.25
  }
} as const;

export const airportNames = {
  richmond: 'Richmond International (RIC)',
  charlottesville: 'Charlottesville/Williamsburg',
  national: 'Reagan National (DCA)',
  dulles: 'Washington Dulles (IAD)',
  bwi: 'Baltimore Washington (BWI)'
} as const;

export type VehicleType = keyof typeof pricingData.vehicles;
export type AirportCode = keyof typeof airportNames;
export type ServiceType = 'hourly' | 'point-to-point' | 'airport';
export type DayType = 'weekday' | 'weekend' | 'holiday';