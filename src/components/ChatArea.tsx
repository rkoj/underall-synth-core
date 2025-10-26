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
    <div className="flex flex-col h-full glass-intense rounded-2xl border border-primary/20 overflow-hidden">
      {/* Chat Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-primary">PRÓXIMA FASE: RAG + MEMORY</h2>
          <p className="text-sm text-muted-foreground font-mono">
            Vou criar sistema de memória para Brain All "lembrar" contexto!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-neural" />
          <span className="text-xs text-muted-foreground">ao vivo</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-primary/10 border border-primary/20"
                  : "glass-soft border border-primary/10"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs text-muted-foreground/60 mt-2 block">{message.timestamp}</span>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-accent">U</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-primary/20 p-4">
        <div className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enviar mensagem para Brain All..."
            className="min-h-[60px] bg-background/50 border-primary/20 focus-visible:border-primary resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="w-12 h-12 shrink-0 bg-primary hover:bg-primary/90 glow-cyan"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
