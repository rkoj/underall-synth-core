import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const ChatArea = () => {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "💪 PERFEITO! Vou criar o BRAINDOC agora!\n\nDocumento profundo e completo de tudo que fizemos!\n\nComeçando! 📝",
      timestamp: "18:06",
    },
    {
      id: 2,
      role: "user",
      content: "Criar sistema RAG e Memory para contexto persistente",
      timestamp: "18:05",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // Handle message sending
    setInput("");
  };

  return (
    <div className="flex flex-col h-full glass-intense rounded-2xl border border-primary/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-scale-in">
      {/* Chat Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent backdrop-blur-sm">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-bold text-lg text-primary glow-cyan">PRÓXIMA FASE: RAG + MEMORY</h2>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-soft border border-success/30">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-neural glow-box-neon" />
              <span className="text-xs text-success font-mono font-semibold">AO VIVO</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            Sistema de memória para Brain All "lembrar" contexto completo
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        {/* Ambient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in relative`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {message.role === "assistant" && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0 border border-primary/30 glow-box-cyan animate-glow-pulse">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] ${
                message.role === "user"
                  ? "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.1)]"
                  : "glass-soft border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-primary/10">
                <span className="text-xs text-muted-foreground/60 font-mono">{message.timestamp}</span>
                {message.role === "assistant" && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-primary/40" />
                    <div className="w-1 h-1 rounded-full bg-primary/60" />
                    <div className="w-1 h-1 rounded-full bg-primary" />
                  </div>
                )}
              </div>
            </div>
            {message.role === "user" && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center shrink-0 border border-accent/30">
                <span className="text-xs font-bold text-accent glow-amber">U</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-primary/20 p-4 glass-soft">
        <div className="flex gap-3">
          <div className="flex-1 relative group">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enviar mensagem para Brain All..."
              className="min-h-[60px] glass-panel border-primary/20 focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(0,255,255,0.2)] resize-none transition-all duration-300 font-mono text-sm pr-20"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
              <span>Enter</span>
              <span className="text-muted-foreground/40">•</span>
              <span>Shift+Enter para nova linha</span>
            </div>
          </div>
          <Button
            onClick={handleSend}
            size="icon"
            disabled={!input.trim()}
            className="w-14 h-14 shrink-0 bg-gradient-to-br from-primary to-primary-dim hover:from-primary-glow hover:to-primary disabled:opacity-30 disabled:cursor-not-allowed glow-box-cyan transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono">AI online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="font-mono">Sandbox conectado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
