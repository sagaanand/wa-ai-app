import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { HowItWorks } from '../components/HowItWorks';
import { WhatsAppConnection } from '../components/WhatsAppConnection';
import { AIConversation } from '../components/AIConversation';
import { WhoIsItFor } from '../components/WhoIsItFor';
import { HumanControl } from '../components/HumanControl';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';

interface HomePageProps {
  onOpenConnect: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConnect }) => {
  return (
    <>
      <SEOHead path="/" />
      <Hero onConnectClick={onOpenConnect} />
      <Benefits />
      <HowItWorks />
      <WhatsAppConnection onConnectClick={onOpenConnect} />
      <AIConversation />
      <WhoIsItFor />
      <HumanControl />
      <FAQ />
      <FinalCTA onConnectClick={onOpenConnect} />
    </>
  );
};
