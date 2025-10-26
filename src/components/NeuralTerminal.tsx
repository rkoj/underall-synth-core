import { useState, useEffect, useRef } from "react";
import { useTerminalWebSocket } from "@/hooks/useTerminalWebSocket";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Terminal, Trash2 } from "lucide-react";

export const NeuralTerminal = () => {
  const { outputs, isConnected, executeCommand, clearTerminal } = useTerminalWebSocket();
  const [command, setCommand] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleExecute = () => {
    if (!command.trim()) return;
    executeCommand(command);
    setCommand("");
  };

  return (
    <div className="flex flex-col h-full glass-intense rounded-2xl border border-primary/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 glow-box-cyan">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-sm text-primary glow-primary">Neural Terminal</h2>
            <p className="text-xs text-muted-foreground font-mono">Remote code execution</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft border ${isConnected ? 'border-success/30' : 'border-destructive/30'}`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'} animate-pulse-neural`} />
            <span className={`text-xs font-mono font-semibold ${isConnected ? 'text-success' : 'text-destructive'}`}>
              {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
          <Button
            onClick={clearTerminal}
            size="icon"
            variant="ghost"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Terminal Output */}
      <ScrollArea className="flex-1 p-4 bg-black/60 font-mono text-sm" ref={scrollRef}>
        {outputs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground/50">
            <div className="text-center">
              <Terminal className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>Terminal pronto. Digite um comando...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {outputs.map((output, i) => (
              <div key={i} className="animate-fade-in">
                {output.type === "connected" && (
                  <div className="text-success">
                    <span className="text-muted-foreground">[{output.timestamp}]</span> {output.data.message}
                  </div>
                )}
                {output.type === "output" && output.data.stdout && (
                  <div className="text-primary/90">
                    {output.data.stdout}
                  </div>
                )}
                {output.type === "error" && output.data.stderr && (
                  <div className="text-destructive">
                    {output.data.stderr}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-primary/20 p-4 glass-soft">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono text-sm">$</span>
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleExecute()}
              placeholder="Digite um comando..."
              disabled={!isConnected}
              className="pl-8 font-mono bg-black/50 border-primary/20 focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(84,117,98,0.2)] disabled:opacity-50"
            />
          </div>
          <Button
            onClick={handleExecute}
            disabled={!command.trim() || !isConnected}
            className="bg-gradient-to-br from-primary to-primary-dim hover:from-primary-glow hover:to-primary disabled:opacity-30"
          >
            Executar
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground/60">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'}`} />
              <span className="font-mono">{isConnected ? 'Bastion conectado' : 'Bastion desconectado'}</span>
            </div>
          </div>
          <p className="font-mono">
            {outputs.length} comandos executados
          </p>
        </div>
      </div>
    </div>
  );
};

