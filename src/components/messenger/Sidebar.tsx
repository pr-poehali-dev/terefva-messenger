import Icon from '@/components/ui/icon';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  navItems: NavItem[];
}

export default function Sidebar({ activeTab, onTabChange, navItems }: SidebarProps) {
  return (
    <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-6">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-2xl font-bold">
        T
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-muted ${
              activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
            title={item.label}
          >
            <Icon name={item.icon as any} size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}
