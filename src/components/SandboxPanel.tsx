import { Box, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

export const SandboxPanel = () => {
  return (
    <div className="glass-intense rounded-2xl p-6 border border-primary/20">
      {/* Sandbox Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Box className="w-6 h-6 text-primary glow-cyan" />
          <h2 className="text-2xl font-display font-bold text-primary uppercase tracking-wider">
            Sandbox Environment
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-success/10 hover:text-success">
            <Play className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
            <Pause className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Holographic Visualization Area */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          <div className="w-32 h-32 rounded-full border-4 border-primary/40 animate-pulse-neural glow-cyan" />
          <div className="w-24 h-24 rounded-full border-4 border-accent/40 animate-float glow-amber" />
          <div className="w-28 h-28 rounded-full border-4 border-success/40 animate-pulse glow-neon" />
        </div>

        {/* Status Overlay */}
        <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase">Status</p>
              <p className="text-sm font-mono font-bold text-success">Environment Ready</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase">Active Tests</p>
              <p className="text-sm font-mono font-bold text-primary">3 Running</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase">Uptime</p>
              <p className="text-sm font-mono font-bold text-foreground">127:42:18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
