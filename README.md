# TNT Limousine GNET Integration

A secure, production-ready React Server Component for integrating TNT Limousine pricing with GNET partner platforms.

## 🎯 Features

- **🔒 Secure**: Server-side token validation, no sensitive data exposed to client
- **⚡ Fast**: React Server Components with optimized pricing calculations  
- **🎨 Customizable**: Headless UI components with Tailwind CSS
- **📱 Responsive**: Mobile-friendly interface that works everywhere
- **🚀 Production-Ready**: Built for enterprise integration requirements

## 🚀 Quick Start

```bash
git clone https://github.com/sperry-entelech/tnt-gnet-integration.git
cd tnt-gnet-integration
npm install
npm run dev
```

## 💼 Integration Examples

### Basic Usage
```tsx
import { TNTPricingTool } from '@/components/TNTPricingTool';

export default function Page() {
  return (
    <TNTPricingTool 
      token="your_gnet_api_token"
      theme="dark"
      showLogo={true}
    />
  );
}
```

## 📞 Contact

**TNT Limousine**
- Phone: (804) 972-4550
- Email: sedan@tntauto.com

*Built with Next.js 15, React Server Components, Tailwind CSS, and Headless UI*
