import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  className 
}: StatsCardProps) => {
  return (
    <Card className={cn("shadow-soft hover:shadow-cute transition-smooth", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">
              {typeof value === 'number' && value > 1000 
                ? `$${(value / 1000).toFixed(1)}k`
                : typeof value === 'number' && title.toLowerCase().includes('$')
                ? `$${value.toFixed(2)}`
                : value
              }
            </div>
            {description && (
              <CardDescription className="text-xs">
                {description}
              </CardDescription>
            )}
          </div>
          
          {trend && (
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1 px-2 py-1",
                trend.isPositive 
                  ? "text-green-600 border-green-200 bg-green-50" 
                  : "text-red-600 border-red-200 bg-red-50"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="text-xs font-medium">
                {Math.abs(trend.value)}%
              </span>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};