
import { InsightsSection } from '@/components/dashboard/InsightsSection';
import { QuickActions } from '@/components/dashboard/QuickActions';

export function InsightsAndActionsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <InsightsSection />
      <QuickActions />
    </div>
  );
}
