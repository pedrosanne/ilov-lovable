import { EngagementChart } from '@/components/dashboard/EngagementChart';
import { TrafficSourceChart } from '@/components/dashboard/TrafficSourceChart';

export function ChartsSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="w-full min-w-0">
          <EngagementChart />
        </div>
        <div className="w-full min-w-0">
          <TrafficSourceChart />
        </div>
      </div>
    </div>
  );
}
