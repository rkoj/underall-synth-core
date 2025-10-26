import { Server, Database, Network, Shield } from "lucide-react";

export const ControlGrid = () => {
  const controls = [
    {
      icon: Server,
      label: "GOU Server",
      status: "Online",
      color: "success",
      details: "12 instances",
    },
    {
      icon: Database,
      label: "Data Store",
      status: "Syncing",
      color: "accent",
      details: "47.2 TB",
    },
    {
      icon: Network,
      label: "Network",
      status: "Active",
      color: "success",
      details: "2.4 Gb/s",
    },
    {
      icon: Shield,
      label: "Security",
      status: "Protected",
      color: "primary",
      details: "AES-256",
    },
  ];

  return (
    <div className="space-y-4">
      {controls.map((control, i) => {
        const Icon = control.icon;
        return (
          <div
            key={i}
            className="glass-panel rounded-xl p-4 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg bg-${control.color}/10 group-hover:bg-${control.color}/20 transition-colors`}
              >
                <Icon
                  className={`w-6 h-6 text-${control.color} group-hover:scale-110 transition-transform`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-mono font-bold text-sm text-foreground uppercase tracking-wider">
                    {control.label}
                  </h3>
                  <span
                    className={`text-xs font-mono text-${control.color} px-2 py-1 rounded bg-${control.color}/10`}
                  >
                    {control.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm font-mono">
                  {control.details}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
