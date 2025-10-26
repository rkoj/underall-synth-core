import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Paperclip, Mic, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "💪 PERFEITO! Sistema Brain All está operacional!\n\nTodas as funcionalidades ativas e prontas para uso profissional.",
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 2,
      role: "user",
      content: "Mostre-me o status completo do sistema",
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "Entendido! Processando sua solicitação...",
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full glass-intense rounded-2xl border border-primary/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-scale-in">
      {/* Chat Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent backdrop-blur-sm">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30 glow-box-cyan animate-glow-pulse">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-primary glow-primary">Under All Intelligence</h2>
              <p className="text-xs text-muted-foreground font-mono">Neural conversation system</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-soft border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-neural glow-box-neon" />
            <span className="text-xs text-success font-mono font-semibold">ONLINE</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
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
        
        {isTyping && (
          <div className="flex gap-3 justify-start animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0 border border-primary/30 glow-box-cyan animate-glow-pulse">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div className="glass-soft border border-primary/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-xs text-muted-foreground font-mono ml-2">Brain All está pensando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-primary/20 p-4 glass-soft">
        <div className="flex gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Paperclip className="w-4 h-4 mr-2" />
            Anexar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Mic className="w-4 h-4 mr-2" />
            Voz
          </Button>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 relative group">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={isTyping}
              className="min-h-[80px] glass-panel border-primary/20 focus-visible:border-primary focus-visible:shadow-[0_0_20px_rgba(0,255,255,0.2)] resize-none transition-all duration-300 font-mono text-sm disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
              <kbd className="px-2 py-1 rounded bg-muted/50 border border-muted">Enter</kbd>
              <span>para enviar</span>
            </div>
          </div>
          <Button
            onClick={handleSend}
            size="icon"
            disabled={!input.trim() || isTyping}
            className="w-14 h-14 shrink-0 bg-gradient-to-br from-primary to-primary-dim hover:from-primary-glow hover:to-primary disabled:opacity-30 disabled:cursor-not-allowed glow-box-cyan transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono">AI online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="font-mono">Sandbox conectado</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 font-mono">
            {messages.length} mensagens
          </p>
        </div>
      </div>
    </div>
  );
};
