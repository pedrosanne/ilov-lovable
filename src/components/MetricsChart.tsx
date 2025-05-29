
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Seg', views: 45, clicks: 3 },
  { day: 'Ter', views: 89, clicks: 7 },
  { day: 'Qua', views: 120, clicks: 12 },
  { day: 'Qui', views: 95, clicks: 8 },
  { day: 'Sex', views: 156, clicks: 15 },
  { day: 'Sáb', views: 203, clicks: 22 },
  { day: 'Dom', views: 178, clicks: 18 }
];

export function MetricsChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Visualizações"
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Cliques"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
