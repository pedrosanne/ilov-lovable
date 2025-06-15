
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAdminChartData } from '@/hooks/useAdminCharts';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = {
  approved: '#22c55e',
  pending: '#f59e0b',
  rejected: '#ef4444',
  primary: '#3b82f6',
};

export function AdminCharts() {
  const { data: chartData, isLoading } = useAdminChartData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const adsStatusData = chartData?.adsData.reduce((acc, day) => {
    acc.approved += day.approved;
    acc.pending += day.pending;
    acc.rejected += day.rejected;
    return acc;
  }, { approved: 0, pending: 0, rejected: 0 });

  const pieData = [
    { name: 'Aprovados', value: adsStatusData?.approved || 0, color: COLORS.approved },
    { name: 'Pendentes', value: adsStatusData?.pending || 0, color: COLORS.pending },
    { name: 'Rejeitados', value: adsStatusData?.rejected || 0, color: COLORS.rejected },
  ].filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Gráfico de Anúncios por Dia */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Anúncios dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.adsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill={COLORS.approved} name="Aprovados" />
              <Bar dataKey="pending" fill={COLORS.pending} name="Pendentes" />
              <Bar dataKey="rejected" fill={COLORS.rejected} name="Rejeitados" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Pizza - Status dos Anúncios */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Anúncios</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Verificações */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Verificações dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.verificationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke={COLORS.primary} name="Total" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" stroke={COLORS.approved} name="Aprovadas" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke={COLORS.pending} name="Pendentes" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Novos Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Novos Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="newUsers" fill={COLORS.primary} name="Novos Usuários" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
