import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

interface ThinkingStep {
  type: "planning" | "executing" | "analyzing" | "error" | "success";
  content: string;
  timestamp: string;
}

interface AgentResult {
  success: boolean;
  result?: any;
  error?: string;
}

export const useAgentWebSocket = () => {
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const [result, setResult] = useState<AgentResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Conectar ao WebSocket
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return; // Já conectado
    }

    const ws = new WebSocket("wss://brain.underall.com/ws/agent");

    ws.onopen = () => {
      console.log("Agent WebSocket connected");
      setIsConnected(true);
      toast({
        title: "Conectado",
        description: "Agent WebSocket conectado com sucesso!",
      });
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "thinking") {
          const step: ThinkingStep = {
            type: message.data.type,
            content: message.data.content,
            timestamp: new Date().toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            }),
          };
          setThinkingSteps(prev => [...prev, step]);
        } else if (message.type === "result") {
          setResult(message.data);
          setIsRunning(false);
          toast({
            title: "Concluído",
            description: "Agent terminou a execução!",
          });
        } else if (message.type === "error") {
          setResult({ success: false, error: message.data.error });
          setIsRunning(false);
          toast({
            title: "Erro",
            description: message.data.error,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Agent WebSocket error:", error);
      toast({
        title: "Erro de Conexão",
        description: "Falha ao conectar ao Agent WebSocket",
        variant: "destructive",
      });
    };

    ws.onclose = () => {
      console.log("Agent WebSocket disconnected");
      setIsConnected(false);
      setIsRunning(false);
    };

    wsRef.current = ws;
  }, []);

  // Desconectar
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Executar tarefa
  const runAgent = useCallback((request: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      toast({
        title: "Não Conectado",
        description: "WebSocket não está conectado. Conectando...",
        variant: "destructive",
      });
      connect();
      return;
    }

    if (isRunning) {
      toast({
        title: "Agent Ocupado",
        description: "Aguarde o agent terminar a tarefa atual",
        variant: "destructive",
      });
      return;
    }

    // Limpar estado anterior
    setThinkingSteps([]);
    setResult(null);
    setIsRunning(true);

    // Enviar pedido
    wsRef.current.send(JSON.stringify({ request }));

    toast({
      title: "Agent Iniciado",
      description: "Processando sua solicitação...",
    });
  }, [isRunning, connect]);

  // Conectar automaticamente ao montar
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    thinkingSteps,
    result,
    isRunning,
    isConnected,
    runAgent,
    connect,
    disconnect,
  };
};

