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
    <Sidebar className="border-r border-primary/20 bg-background/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-primary/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-sm">BA</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-display font-bold text-sm text-primary">Brain All</h2>
              <p className="text-xs text-muted-foreground">Manus 1.5</p>
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
                      relative group transition-all duration-200
                      ${activeId === item.id 
                        ? "bg-primary/10 text-primary border-l-2 border-primary" 
                        : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground/60">{item.time}</p>
                      </div>
                    )}
                    {!isCollapsed && activeId === item.id && (
                      <ChevronRight className="w-4 h-4 shrink-0" />
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
