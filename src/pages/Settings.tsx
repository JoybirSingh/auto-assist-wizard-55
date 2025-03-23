
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SettingsPanel from '@/components/settings/SettingsPanel';
import Nav from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingWizard from '@/components/settings/OnboardingWizard';

export default function Settings() {
  const [searchParams] = useSearchParams();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    const onboarding = searchParams.get('onboarding');
    setShowOnboarding(onboarding === 'true');
  }, [searchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="container flex-1 py-12">
        {showOnboarding ? (
          <OnboardingWizard />
        ) : (
          <SettingsPanel />
        )}
      </div>
      <Footer />
    </div>
  );
}
