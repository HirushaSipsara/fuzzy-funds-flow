import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <Sidebar />
      
      <div className="lg:pl-16 transition-all duration-300">
        <Header />
        
        <main className={cn("p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  );
};