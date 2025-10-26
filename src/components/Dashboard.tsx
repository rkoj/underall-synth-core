import { ControlGrid } from "./ControlGrid";
import { NeuralTerminal } from "./NeuralTerminal";

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-primary glow-cyan">
            System Dashboard
          </h2>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            Real-time monitoring and control center
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-soft border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-neural" />
          <span className="text-sm text-success font-mono font-semibold">All Systems Operational</span>
        </div>
      </div>
      
      <ControlGrid />
      <NeuralTerminal />
    </div>
  );
};
