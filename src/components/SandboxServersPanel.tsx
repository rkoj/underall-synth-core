import { useState } from "react";
import { X, Server, Terminal, Play, Square, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface SandboxServer {
  id: string;
  name: string;
  status: "running" | "stopped" | "starting";
  host: string;
  user: string;
  workspace: string;
}

export const SandboxServersPanel = ({ onClose }: { onClose: () => void }) => {
  const [servers] = useState<SandboxServer[]>([
    {
      id: "1",
      name: "Brain Executor",
      status: "running",
      host: "192.168.100.20",
      user: "root",
      workspace: "/root/brain_workspace",
    },
    {
      id: "2",
      name: "RAG Memory Server",
      status: "running",
      host: "192.168.100.21",
      user: "admin",
      workspace: "/home/rag_system",
    },
    {
      id: "3",
      name: "Test Sandbox",
      status: "stopped",
      host: "192.168.100.22",
      user: "test",
      workspace: "/opt/sandbox",
    },
  ]);

  const [activeServer, setActiveServer] = useState(servers[0]);
  const [logs] = useState([
    "# Logs",
    "journalctl -u brain-api -f",
    "",
    "# Testar manualmente",
    "cd /root/ai-agent",
    "source venv/bin/activate",
    "python brain_api.py",
    "```",
    "",
    "---",
    "",
    "### **★★3. Brain Executor★★",
    "",
    "**★★Descrição:★★**",
    "Cliente SSH que conecta ao Bastion para executar código remotamente.",
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-success/20 text-success border-success/30";
      case "stopped":
        return "bg-muted text-muted-foreground border-muted";
      case "starting":
        return "bg-accent/20 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  return (
    <div className="w-[450px] h-full glass-intense border-l border-primary/20 flex flex-col animate-slide-in-right shadow-[-20px_0_60px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between bg-gradient-to-l from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 glow-box-cyan animate-glow-pulse">
            <Server className="w-5 h-5 text-primary" />
          </div>
            <div>
              <h3 className="font-display font-bold text-sm text-primary glow-primary">Sandbox Servers</h3>
              <p className="text-xs text-muted-foreground font-mono">
                {servers.filter(s => s.status === "running").length} / {servers.length} ativos
              </p>
            </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Server List */}
      <div className="border-b border-primary/20 p-3 space-y-2 max-h-[280px] overflow-y-auto">
        {servers.map((server, index) => (
          <button
            key={server.id}
            onClick={() => setActiveServer(server)}
            className={`
              w-full p-3 rounded-xl text-left transition-all duration-300 group
              ${activeServer.id === server.id 
                ? "bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/40 shadow-[0_0_20px_rgba(0,255,255,0.15)]" 
                : "glass-soft hover:bg-primary/8 border border-primary/10 hover:border-primary/20"
              }
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server className={`w-3.5 h-3.5 ${activeServer.id === server.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-semibold ${activeServer.id === server.id ? "text-primary" : ""}`}>
                  {server.name}
                </span>
              </div>
              <Badge className={`text-xs font-mono ${getStatusColor(server.status)}`}>
                {server.status}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 font-mono pl-5">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/50">→</span>
                <span>{server.host}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/50">@</span>
                <span>{server.user}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Terminal Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-primary/20 p-2 flex items-center justify-between glass-panel">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-mono text-primary glow-primary">{activeServer.name}</span>
            <span className="text-xs text-muted-foreground/50">•</span>
            <span className="text-xs font-mono text-muted-foreground">BRAINDOC.md</span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 hover:bg-success/20 hover:text-success transition-colors"
            >
              <Play className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive transition-colors"
            >
              <Square className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 hover:bg-primary/20 hover:text-primary transition-colors"
            >
              <RotateCw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 bg-background/30">
          <div className="font-mono text-xs space-y-2">
            {logs.map((log, idx) => (
              <div 
                key={idx} 
                className={`
                  transition-colors animate-fade-in
                  ${log.startsWith("#") ? "text-primary font-semibold" : "text-muted-foreground"}
                  ${log.startsWith("★★") ? "text-accent glow-amber" : ""}
                `}
                style={{ animationDelay: `${idx * 0.02}s` }}
              >
                {log}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Progress Bar */}
        <div className="border-t border-primary/20 p-3 glass-panel">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground font-mono">✅ Sistema completo e checkpoint final</span>
            <span className="text-primary font-bold font-mono">5/5</span>
          </div>
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden border border-primary/20 shadow-inner">
            <div className="h-full w-full bg-gradient-to-r from-primary via-primary-glow to-primary animate-shimmer-slow bg-[length:200%_100%] shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-muted-foreground/60 font-mono">Progresso total</span>
            <span className="text-success font-mono font-semibold">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
