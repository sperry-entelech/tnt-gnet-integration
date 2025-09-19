# TNT Limousine GNET React Component Integration

## 🚀 Quick Start for GNET Platform

### Installation
```bash
npm install @tnt-limousine/gnet-pricing-component
```

### Basic Usage in GNET Platform
```tsx
import { TNTPricingTool } from '@tnt-limousine/gnet-pricing-component';

export default function BookingPage() {
  return (
    <div className="booking-container">
      <h1>Book TNT Limousine Services</h1>

      <TNTPricingTool
        token={process.env.TNT_GNET_API_TOKEN}
        theme="light"
        partnerBranding={{
          name: "GNET Platform",
          logo: "/gnet-logo.png"
        }}
        onBookingSubmit={(bookingData) => {
          // Handle completed booking
          console.log('TNT Booking:', bookingData);
          // Forward to your booking system
        }}
      />
    </div>
  );
}
```

## 🔧 Integration Options

### 1. Full Component (Recommended)
```tsx
<TNTPricingTool
  token="your_tnt_api_token"
  theme="light"
  showLogo={true}
  onBookingSubmit={handleBooking}
  className="custom-styling"
/>
```

### 2. Headless Integration
```tsx
import { calculateTNTPricing } from '@tnt-limousine/gnet-pricing-component';

const pricing = await calculateTNTPricing({
  serviceType: 'airport',
  vehicleType: 'sedan',
  airportCode: 'richmond',
  tripType: 'one-way'
}, 'your_api_token');
```

## 📋 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `token` | string | required | TNT GNET API token |
| `theme` | 'light' \| 'dark' | 'dark' | UI theme |
| `showLogo` | boolean | true | Show TNT branding |
| `partnerBranding` | object | undefined | GNET branding info |
| `onBookingSubmit` | function | undefined | Booking completion handler |
| `className` | string | '' | Custom CSS classes |

## 🎯 Booking Data Structure

When a customer completes a booking, your `onBookingSubmit` handler receives:

```typescript
interface TNTBooking {
  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Service Details
  serviceType: 'hourly' | 'point-to-point' | 'airport';
  vehicleType: 'sedan' | 'suv' | 'van' | 'stretch' | 'coach' | 'transit' | 'limo-bus';
  serviceDate: string;
  serviceTime: string;

  // Locations
  pickupLocation: string;
  dropoffLocation?: string;

  // Pricing
  totalPrice: number;
  breakdown: Array<{item: string, amount: number}>;

  // Additional
  specialRequests?: string;
  passengers: number;
  hours?: number; // For hourly service
}
```

## 🔐 Authentication

### Get Your TNT API Token
1. Contact TNT Limousine: (804) 972-4550
2. Request GNET partner API access
3. Receive production token for integration

### Environment Variables
```bash
# Required
TNT_GNET_API_TOKEN=your_production_token

# Optional
TNT_BOOKING_WEBHOOK_URL=https://gnet.com/webhooks/tnt-bookings
GNET_PARTNER_ID=your_gnet_partner_id
```

## 📱 Mobile Support

The component is fully responsive and optimized for:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🎨 Styling & Customization

### Custom Themes
```tsx
<TNTPricingTool
  theme="light"
  className="custom-container"
  style={{
    '--tnt-primary': '#dc2626',
    '--tnt-secondary': '#1f2937'
  }}
/>
```

### GNET Brand Integration
```tsx
<TNTPricingTool
  partnerBranding={{
    name: "GNET Platform",
    logo: "/gnet-logo.png",
    colors: {
      primary: "#your-brand-color",
      secondary: "#your-secondary-color"
    }
  }}
/>
```

## 🔄 Real-Time Updates

### Webhook Notifications (Optional)
Configure webhook URL to receive booking confirmations:

```typescript
// GNET webhook endpoint
POST /webhooks/tnt-booking
{
  "bookingId": "TNT-12345",
  "gnetPartnerId": "your_partner_id",
  "customerEmail": "customer@email.com",
  "totalAmount": 245.00,
  "status": "confirmed",
  "tntBookingDetails": { /* full booking object */ }
}
```

## 📊 Service Coverage

### Vehicle Types Available
- **Sedan** - $100/hr, Airport from $105
- **SUV** - $137/hr, Airport from $175
- **Van** - $150/hr, Airport from $190
- **Stretch Limo** - $185/hr, Airport from $200
- **Coach Bus** - $208/hr, Airport from $225
- **Transit** - $137/hr, Airport from $175
- **Limo Bus** - $208/hr, Airport from $225

### Service Areas
- **Primary**: Richmond, VA metro area
- **Airport Coverage**: RIC, BWI, DCA, IAD
- **Radius**: 100+ miles from Richmond

## 🆘 Support & Integration Help

### TNT Technical Team
- **Phone**: (804) 972-4550
- **Email**: info@tntlimousine.com
- **Integration Support**: Available during business hours

### Common Integration Issues
1. **Token Authentication Errors**: Verify production token
2. **CORS Issues**: Ensure your domain is whitelisted
3. **Mobile Display**: Check responsive breakpoints
4. **Booking Submission**: Verify webhook endpoint

## 🚀 Production Deployment

### Performance Optimization
- Component uses React Server Components for optimal performance
- Pricing calculations happen server-side for security
- Minimal client-side JavaScript footprint

### Security Best Practices
- ✅ API tokens validated server-side only
- ✅ No sensitive data exposed to browser
- ✅ Rate limiting built-in
- ✅ HTTPS required for production

## 📈 Business Benefits

### For GNET Platform
- **Revenue Share**: Commission on TNT bookings
- **Enhanced Service**: Professional transportation option
- **Customer Retention**: Premium service offering

### For Customers
- **Instant Quotes**: Real-time TNT pricing
- **Professional Service**: 33+ years experience
- **Reliable Transportation**: Richmond's top-rated service

---

**Ready to integrate TNT Limousine services into your GNET platform!**

Contact TNT at (804) 972-4550 to activate your integration and start earning revenue from premium transportation bookings.