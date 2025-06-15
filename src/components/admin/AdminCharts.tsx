
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Gráfico de Anúncios por Dia */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Anúncios dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData?.adsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
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
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Status dos Anúncios</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                fontSize={11}
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Verificações dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData?.verificationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
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
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Novos Usuários</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData?.usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="newUsers" fill={COLORS.primary} name="Novos Usuários" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
