import ExploreSection from '@/components/templates/ExploreSection';
import { Hero } from '@/components/templates/Hero';
import InfoSection from '@/components/templates/InfoSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <InfoSection />
      <ExploreSection />
    </div>
  );
}
