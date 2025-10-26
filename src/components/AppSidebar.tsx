import { useState } from "react";
import { FileText, MessageSquare, Database, Settings, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const conversationItems = [
  { id: 1, title: "Como criar um sandbox para agentes de IA", icon: MessageSquare, time: "2h atrás" },
  { id: 2, title: "Executar código remoto no Bastion", icon: FileText, time: "5h atrás" },
  { id: 3, title: "Criar projetos e ficheiros", icon: FileText, time: "1d atrás" },
  { id: 4, title: "Ver status do sistema", icon: Database, time: "2d atrás" },
  { id: 5, title: "Gerir workspace", icon: Settings, time: "3d atrás" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const [activeId, setActiveId] = useState(1);
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-primary/20 glass-intense">
      <SidebarHeader className="border-b border-primary/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 glow-box-cyan animate-glow-pulse">
            <span className="text-primary font-bold text-sm glow-cyan">BA</span>
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h2 className="font-display font-bold text-sm text-primary glow-cyan">Brain All</h2>
              <p className="text-xs text-muted-foreground font-mono">Manus 1.5 • Active</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground/70">
            {!isCollapsed && "Todas as tarefas"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveId(item.id)}
                    className={`
                      relative group transition-all duration-300
                      ${activeId === item.id 
                        ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-l-2 border-primary shadow-[0_0_15px_rgba(0,255,255,0.15)]" 
                        : "hover:bg-primary/5 text-muted-foreground hover:text-foreground hover:border-l-2 hover:border-primary/30"
                      }
                      before:absolute before:inset-0 before:opacity-0 before:transition-opacity
                      ${activeId === item.id ? "before:opacity-100" : "hover:before:opacity-100"}
                    `}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 transition-all ${activeId === item.id ? "text-primary" : ""}`} />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 animate-fade-in">
                        <p className={`text-sm truncate font-medium ${activeId === item.id ? "text-primary" : ""}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground/60 font-mono">{item.time}</p>
                      </div>
                    )}
                    {!isCollapsed && activeId === item.id && (
                      <ChevronRight className="w-4 h-4 shrink-0 text-primary animate-pulse" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
