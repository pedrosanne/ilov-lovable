
import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { TrafficSourceChart } from '@/components/dashboard/TrafficSourceChart';

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <EngagementChart />
      <TrafficSourceChart />
    </div>
  );
}
