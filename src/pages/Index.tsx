import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SandboxServersPanel } from "@/components/SandboxServersPanel";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";
import underallLogo from "@/assets/underall-logo.png";

const Index = () => {
  const [showSandbox, setShowSandbox] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-background via-background to-background/95">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        </div>

        <AppSidebar />
        
        <div className="flex-1 flex flex-col relative z-10">
          {/* Top Bar */}
          <header className="h-16 border-b border-primary/20 glass-intense flex items-center justify-between px-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-primary/10 transition-colors" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-background/50 flex items-center justify-center border border-primary/30 glow-box-primary animate-glow-pulse overflow-hidden">
                  <img src={underallLogo} alt="Under All Logo" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl text-primary glow-primary tracking-tight">UNDER ALL</h1>
                  <p className="text-xs text-muted-foreground font-mono">Intelligence System v1.5</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-soft border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse-neural" />
                <span className="text-xs text-success font-mono font-semibold">ONLINE</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSandbox(!showSandbox)}
                className="gap-2 hover:bg-primary/10 hover:text-primary transition-all"
              >
                <PanelRightOpen className="w-4 h-4" />
                {showSandbox ? "Fechar Sandbox" : "Abrir Sandbox"}
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-6">
              <ChatArea />
            </div>
            
            {showSandbox && (
              <SandboxServersPanel onClose={() => setShowSandbox(false)} />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
