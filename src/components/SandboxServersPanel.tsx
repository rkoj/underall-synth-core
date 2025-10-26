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
    <div className="w-[450px] h-full glass-intense border-l border-primary/20 flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Server className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-primary">Computador de Brain All</h3>
            <p className="text-xs text-muted-foreground">Brain All está a usar o Editor</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Server List */}
      <div className="border-b border-primary/20 p-3 space-y-2">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => setActiveServer(server)}
            className={`
              w-full p-3 rounded-lg text-left transition-all duration-200
              ${activeServer.id === server.id 
                ? "bg-primary/10 border border-primary/30" 
                : "glass-soft hover:bg-primary/5 border border-transparent"
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{server.name}</span>
              <Badge className={`text-xs ${getStatusColor(server.status)}`}>
                {server.status}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground space-y-1 font-mono">
              <div>Host: {server.host}</div>
              <div>User: {server.user}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Terminal Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-primary/20 p-2 flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted-foreground">BRAINDOC.md</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Play className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Square className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <RotateCw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="font-mono text-xs space-y-2">
            {logs.map((log, idx) => (
              <div key={idx} className={log.startsWith("#") ? "text-primary" : "text-muted-foreground"}>
                {log}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Progress Bar */}
        <div className="border-t border-primary/20 p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>✅ Testar sistema completo e criar checkpoint final</span>
            <span>5/5</span>
          </div>
          <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full w-full bg-primary glow-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
};
