import { Activity, Cpu, HardDrive, Zap } from "lucide-react";
import { AIStatusNode } from "./AIStatusNode";
import { NeuralTerminal } from "./NeuralTerminal";
import { SandboxPanel } from "./SandboxPanel";
import { ControlGrid } from "./ControlGrid";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <header className="glass-intense rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-primary glow-cyan">
              UNDERGLASS.AI
            </h1>
            <p className="text-muted-foreground text-sm mt-1 font-mono">
              Intelligence has a texture.
            </p>
          </div>
          <div className="flex gap-4">
            <AIStatusNode 
              icon={Cpu} 
              label="Neural Core" 
              status="active" 
              value="98.3%" 
            />
            <AIStatusNode 
              icon={Activity} 
              label="Processing" 
              status="working" 
              value="2.4k ops/s" 
            />
            <AIStatusNode 
              icon={HardDrive} 
              label="Storage" 
              status="idle" 
              value="47.2 TB" 
            />
            <AIStatusNode 
              icon={Zap} 
              label="Power" 
              status="active" 
              value="342W" 
            />
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Neural Terminal - Takes 2 columns */}
        <div className="lg:col-span-2">
          <NeuralTerminal />
        </div>

        {/* Control Grid - Takes 1 column */}
        <div className="space-y-6">
          <ControlGrid />
        </div>
      </div>

      {/* Sandbox Panel - Full Width */}
      <SandboxPanel />
    </div>
  );
};
