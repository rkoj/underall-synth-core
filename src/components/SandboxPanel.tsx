import { Code2, FileCode, FolderOpen, GitBranch, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export const SandboxPanel = () => {
  const files = [
    { name: "brain_api.py", icon: FileCode, status: "modified" },
    { name: "rag_system.ts", icon: FileCode, status: "new" },
    { name: "memory_store.db", icon: FolderOpen, status: "synced" },
    { name: "config.yaml", icon: FileCode, status: "synced" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "modified": return "text-accent";
      case "new": return "text-success";
      case "synced": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="glass-intense rounded-2xl border border-primary/20 h-full flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="border-b border-primary/20 p-4 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 glow-box-cyan animate-glow-pulse">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-primary glow-cyan">Sandbox Workspace</h3>
            <p className="text-xs text-muted-foreground font-mono">Active files: {files.length}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 border border-primary/30 text-primary">
            <GitBranch className="w-3 h-3 mr-2" />
            Commit
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-to-r from-success/20 to-success/10 hover:from-success/30 hover:to-success/20 border border-success/30 text-success">
            <Terminal className="w-3 h-3 mr-2" />
            Run
          </Button>
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {files.map((file, index) => (
            <button
              key={file.name}
              className="w-full p-3 rounded-xl glass-soft hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all duration-300 text-left group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <file.icon className={`w-4 h-4 ${getStatusColor(file.status)} transition-transform group-hover:scale-110`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono truncate text-foreground group-hover:text-primary transition-colors">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{file.status}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(file.status)} animate-pulse`} />
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="border-t border-primary/20 p-3 glass-panel">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-mono">Lines</p>
            <p className="text-sm font-bold text-primary glow-cyan">2,451</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-mono">Files</p>
            <p className="text-sm font-bold text-success glow-neon">47</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-mono">Commits</p>
            <p className="text-sm font-bold text-accent glow-amber">128</p>
          </div>
        </div>
      </div>
    </div>
  );
};
