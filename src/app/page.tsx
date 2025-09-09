import { TNTPricingTool } from '@/components/TNTPricingTool';

export default function Home() {
  return (
    <TNTPricingTool 
      token="gnet_dev_token"
      theme="dark"
      showLogo={true}
      partnerBranding={{
        name: "GNET Partner Demo"
      }}
    />
  );
}
