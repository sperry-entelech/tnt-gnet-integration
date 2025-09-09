# TNT Limousine GNET Integration Component

A secure, headless React Server Component for TNT Limousine pricing integration with GNET partners.

## Architecture

- **Server Component**: Pricing logic and token validation handled server-side
- **Client Components**: Interactive form elements with Headless UI
- **Secure**: API tokens never exposed to client-side
- **Headless CSS**: Styled with Tailwind CSS, easily customizable

## Quick Start

```bash
npm install
npm run dev
```

## Usage

### Basic Integration

```tsx
import { TNTPricingTool } from '@/components/TNTPricingTool';

export default function MyPage() {
  return (
    <TNTPricingTool 
      token="your_gnet_api_token"
      theme="dark"
      showLogo={true}
    />
  );
}
```

### With Partner Branding

```tsx
<TNTPricingTool 
  token="your_gnet_api_token"
  theme="light"
  showLogo={true}
  partnerBranding={{
    name: "GNET Partner",
    logo: "/partner-logo.png"
  }}
  className="custom-container"
/>
```

## Environment Variables

```bash
GNET_API_TOKEN=your_production_token
NEXT_PUBLIC_APP_NAME=TNT Limousine GNET Integration
NEXT_PUBLIC_CONTACT_PHONE=(804) 972-4550
NEXT_PUBLIC_CONTACT_EMAIL=info@tntlimousine.com
```

## Features

### Security
- Server-side token validation
- Rate limiting (configurable)
- No sensitive data exposed to client

### Pricing Engine
- 7 vehicle types (Sedan to Limo Bus)
- 3 service types (Hourly, Point-to-Point, Airport)
- Dynamic discounts and surcharges
- Real-time calculations

### Integration Options
- **Embedded**: iframe or direct component integration
- **API Mode**: Server actions for headless integration
- **White-label**: Complete customization support

## API Usage

### Server Action

```tsx
import { submitPricingRequest } from '@/lib/actions';

const formData = new FormData();
formData.append('token', 'your_api_token');
formData.append('serviceType', 'hourly');
formData.append('vehicleType', 'sedan');
formData.append('hours', '3');

const result = await submitPricingRequest(formData);
```

### Direct API Call

```tsx
import { getPricing } from '@/lib/actions';

const result = await getPricing({
  serviceType: 'airport',
  vehicleType: 'sedan',
  airportCode: 'richmond',
  tripType: 'one-way'
}, 'your_api_token');
```

## Integration Examples

### GNET Partner Embed

```html
<iframe 
  src="https://tnt-component.vercel.app?token=PARTNER_TOKEN&theme=light"
  width="100%" 
  height="800"
  frameborder="0">
</iframe>
```

### Custom Styling

```tsx
<TNTPricingTool 
  className="bg-white rounded-lg shadow-xl"
  theme="light"
  token={process.env.GNET_API_TOKEN}
/>
```

## Pricing Structure

- **Sedan**: $100/hr (3hr min), Airport from $105
- **Transit**: $137/hr (3hr min), Airport from $175  
- **Limo Bus**: $208/hr (3hr min), Airport from $225
- **Discounts**: 10% weekdays, 10% for 6+ hours
- **Surcharges**: 25% holidays, $20 after-hours

## Support

- **Phone**: (804) 972-4550
- **Email**: info@tntlimousine.com
- **Integration Help**: Contact TNT technical team

## Deployment

```bash
npm run build
npm run start
```

For Vercel deployment:
```bash
vercel --prod
```