import { Terminal, ChevronRight } from "lucide-react";
import { useState } from "react";

export const NeuralTerminal = () => {
  const [logs] = useState([
    { time: "14:23:41", type: "INFO", message: "Neural core initialized successfully" },
    { time: "14:23:42", type: "SUCCESS", message: "GOU Server connection established" },
    { time: "14:23:43", type: "INFO", message: "Loading AI models: GPT-4, Claude-3" },
    { time: "14:23:44", type: "WARNING", message: "GPU memory usage: 87%" },
    { time: "14:23:45", type: "SUCCESS", message: "Sandbox environment ready" },
    { time: "14:23:46", type: "INFO", message: "Monitoring 2,451 active operations" },
  ]);

  return (
    <div className="glass-intense rounded-2xl p-6 border border-primary/20 h-[500px] flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary/10">
        <Terminal className="w-5 h-5 text-primary" />
        <span className="text-sm font-mono font-bold text-primary uppercase tracking-wider">
          Neural Terminal
        </span>
        <div className="flex-1" />
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex items-start gap-3 hover:bg-primary/5 p-2 rounded transition-colors"
          >
            <span className="text-muted-foreground text-xs">{log.time}</span>
            <span
              className={`text-xs font-bold uppercase ${
                log.type === "SUCCESS"
                  ? "text-success"
                  : log.type === "WARNING"
                  ? "text-accent"
                  : "text-primary"
              }`}
            >
              {log.type}
            </span>
            <span className="text-foreground/80">{log.message}</span>
          </div>
        ))}
      </div>

      {/* Command Input */}
      <div className="mt-4 pt-4 border-t border-primary/10">
        <div className="flex items-center gap-2 glass-panel rounded-lg p-3">
          <ChevronRight className="w-4 h-4 text-primary" />
          <input
            type="text"
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};
