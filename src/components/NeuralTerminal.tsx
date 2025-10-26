import { Terminal, ChevronRight, Play, Download, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

export const NeuralTerminal = () => {
  const [logs, setLogs] = useState([
    { time: "14:23:41", type: "INFO", message: "Neural core initialized successfully" },
    { time: "14:23:42", type: "SUCCESS", message: "GPU Server connection established" },
    { time: "14:23:43", type: "INFO", message: "Loading AI models: GPT-4, Claude-3.5" },
    { time: "14:23:44", type: "WARNING", message: "GPU memory usage: 87%" },
    { time: "14:23:45", type: "SUCCESS", message: "Sandbox environment ready" },
    { time: "14:23:46", type: "INFO", message: "Monitoring 2,451 active operations" },
  ]);
  
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = () => {
    if (!command.trim() || isProcessing) return;
    
    const newTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs([...logs, { 
      time: newTime, 
      type: "INFO", 
      message: `$ ${command}` 
    }]);
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setLogs(prev => [...prev, {
        time: newTime,
        type: "SUCCESS",
        message: `Command executed: ${command}`
      }]);
      setIsProcessing(false);
      setCommand("");
    }, 800);
  };

  const clearLogs = () => setLogs([]);

  return (
    <div className="glass-intense rounded-2xl p-6 border border-primary/20 h-[500px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-scale-in">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary/10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 glow-box-cyan animate-glow-pulse">
          <Terminal className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-mono font-bold text-primary uppercase tracking-wider glow-cyan">
            Neural Terminal
          </span>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            Real-time system monitoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearLogs}
            className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/20 hover:text-primary transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
          <div className="flex gap-1.5 ml-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.15s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 font-mono text-sm scroll-smooth"
      >
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex items-start gap-3 hover:bg-primary/5 p-2 rounded-lg transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: `${i * 0.02}s` }}
          >
            <span className="text-muted-foreground/70 text-xs font-mono shrink-0 group-hover:text-muted-foreground transition-colors">
              {log.time}
            </span>
            <span
              className={`text-xs font-bold uppercase shrink-0 px-2 py-0.5 rounded ${
                log.type === "SUCCESS"
                  ? "text-success bg-success/10 border border-success/20"
                  : log.type === "WARNING"
                  ? "text-accent bg-accent/10 border border-accent/20"
                  : log.type === "ERROR"
                  ? "text-destructive bg-destructive/10 border border-destructive/20"
                  : "text-primary bg-primary/10 border border-primary/20"
              }`}
            >
              {log.type}
            </span>
            <span className="text-foreground/90 group-hover:text-foreground transition-colors flex-1">
              {log.message}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center gap-2 p-2 animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="text-xs text-primary font-mono ml-2">Processing...</span>
          </div>
        )}
      </div>

      {/* Command Input */}
      <div className="mt-4 pt-4 border-t border-primary/10">
        <div className="flex items-center gap-2 glass-panel rounded-xl p-3 border border-primary/20 focus-within:border-primary focus-within:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
          <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand();
            }}
            disabled={isProcessing}
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-mono text-sm disabled:opacity-50"
          />
          <Button
            size="icon"
            onClick={handleCommand}
            disabled={!command.trim() || isProcessing}
            className="h-8 w-8 bg-gradient-to-br from-primary to-primary-dim hover:from-primary-glow hover:to-primary disabled:opacity-30 glow-box-cyan transition-all duration-300"
          >
            <Play className="w-3.5 h-3.5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground/60 font-mono mt-2 flex items-center gap-2">
          <span className="text-primary">Tip:</span> Type commands like 'status', 'deploy', 'logs', etc.
        </p>
      </div>
    </div>
  );
};
