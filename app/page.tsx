import ExploreSection from '@/components/templates/ExploreSection';
import InfoSection from '@/components/templates/InfoSection';
import { Landing } from '@/components/templates/Landing';

export default function Home() {
  return (
    <div>
      <Landing />
      <InfoSection />
      <ExploreSection />
    </div>
  );
}
