import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SandboxServersPanel } from "@/components/SandboxServersPanel";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";

const Index = () => {
  const [showSandbox, setShowSandbox] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-14 border-b border-primary/20 glass-intense flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="font-display font-bold text-primary glow-cyan">BRAIN ALL</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSandbox(!showSandbox)}
              className="gap-2"
            >
              <PanelRightOpen className="w-4 h-4" />
              {showSandbox ? "Fechar" : "Sandbox"}
            </Button>
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
