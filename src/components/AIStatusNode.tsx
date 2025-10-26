import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIStatusNodeProps {
  icon: LucideIcon;
  label: string;
  status: "active" | "idle" | "working";
  value: string;
}

export const AIStatusNode = ({ icon: Icon, label, status, value }: AIStatusNodeProps) => {
  const statusColors = {
    active: "text-success glow-neon border-success/40",
    working: "text-accent glow-amber border-accent/40",
    idle: "text-muted-foreground border-muted/40",
  };

  const pulseAnimation = {
    active: "animate-pulse-neural",
    working: "animate-pulse",
    idle: "",
  };

  return (
    <div
      className={cn(
        "glass-panel rounded-xl p-4 min-w-[140px] transition-all duration-300 hover:scale-105",
        "border",
        statusColors[status],
        pulseAnimation[status]
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className={cn("w-5 h-5", statusColors[status])} />
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className={cn("text-2xl font-bold font-mono", statusColors[status])}>
        {value}
      </div>
    </div>
  );
};
