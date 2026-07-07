import { Card } from "@/components/ui/card";

export default function StatCard({ title, value, icon: Icon, trend, color = "text-primary" }) {
  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-extrabold mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs mês anterior
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl bg-accent ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}