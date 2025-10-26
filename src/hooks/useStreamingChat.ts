import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const useStreamingChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Olá! Sou a Under All Intelligence. Como posso ajudá-lo com automação e sistemas inteligentes?",
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: userMessage,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    let assistantContent = "";
    const assistantId = messages.length + 2;

    try {
      const CHAT_URL = `https://brain.underall.com/api/chat`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          model: "llama3.1:8b"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        toast({
          title: "Erro",
          description: errorData.detail || errorData.error || "Erro ao comunicar com AI",
          variant: "destructive",
        });
        
        setIsLoading(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      const upsertAssistant = (content: string) => {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.id === assistantId) {
            return prev.map((m) => 
              m.id === assistantId ? { ...m, content } : m
            );
          }
          return [...prev, {
            id: assistantId,
            role: "assistant" as const,
            content,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          }];
        });
      };

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              upsertAssistant(assistantContent);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              upsertAssistant(assistantContent);
            }
          } catch { /* ignore */ }
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Erro",
        description: "Falha ao comunicar com AI. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return { messages, sendMessage, isLoading };
};

