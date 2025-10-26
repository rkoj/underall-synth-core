import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "@/components/ui/use-toast";

interface TerminalOutput {
  type: "output" | "error" | "connected";
  data: any;
  timestamp: string;
}

export const useTerminalWebSocket = () => {
  const [outputs, setOutputs] = useState<TerminalOutput[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Conectar ao WebSocket
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return; // Já conectado
    }

    const ws = new WebSocket("wss://brain.underall.com/ws/terminal");

    ws.onopen = () => {
      console.log("Terminal WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        const output: TerminalOutput = {
          type: message.type,
          data: message.data,
          timestamp: new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          }),
        };

        setOutputs(prev => [...prev, output]);

        if (message.type === "connected") {
          toast({
            title: "Terminal Conectado",
            description: message.data.message,
          });
        }
      } catch (error) {
        console.error("Error parsing Terminal WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("Terminal WebSocket error:", error);
      toast({
        title: "Erro de Conexão",
        description: "Falha ao conectar ao Terminal WebSocket",
        variant: "destructive",
      });
    };

    ws.onclose = () => {
      console.log("Terminal WebSocket disconnected");
      setIsConnected(false);
    };

    wsRef.current = ws;
  }, []);

  // Desconectar
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      // Enviar comando exit antes de fechar
      wsRef.current.send(JSON.stringify({ command: "exit" }));
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  // Executar comando
  const executeCommand = useCallback((command: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      toast({
        title: "Não Conectado",
        description: "Terminal não está conectado. Conectando...",
        variant: "destructive",
      });
      connect();
      return;
    }

    // Enviar comando
    wsRef.current.send(JSON.stringify({ command }));

    // Adicionar comando ao output (para mostrar no terminal)
    const commandOutput: TerminalOutput = {
      type: "output",
      data: { stdout: `$ ${command}\n` },
      timestamp: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
    };
    setOutputs(prev => [...prev, commandOutput]);
  }, [connect]);

  // Limpar terminal
  const clearTerminal = useCallback(() => {
    setOutputs([]);
  }, []);

  // Conectar automaticamente ao montar
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    outputs,
    isConnected,
    executeCommand,
    clearTerminal,
    connect,
    disconnect,
  };
};

