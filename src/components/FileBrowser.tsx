import { useState, useEffect } from "react";
import { File, Folder, Trash2, Plus, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileItem {
  name: string;
  size: string;
  date: string;
}

export const FileBrowser = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const API_BASE = "https://brain.underall.com/api";

  // Listar ficheiros
  const loadFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/files/list`);
      if (!response.ok) throw new Error("Failed to load files");
      
      const data = await response.json();
      
      // Parse ls output
      const lines = data.files.split('\n').filter((line: string) => 
        line && !line.startsWith('total') && !line.startsWith('d')
      );
      
      const parsedFiles: FileItem[] = lines.map((line: string) => {
        const parts = line.trim().split(/\s+/);
        return {
          name: parts[parts.length - 1],
          size: parts[4] || "0",
          date: `${parts[5]} ${parts[6]}` || "",
        };
      }).filter((f: FileItem) => f.name && f.name !== '.' && f.name !== '..');
      
      setFiles(parsedFiles);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar ficheiros",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Ler ficheiro
  const readFile = async (filename: string) => {
    try {
      const response = await fetch(`${API_BASE}/files/read/${filename}`);
      if (!response.ok) throw new Error("Failed to read file");
      
      const data = await response.json();
      setFileContent(data.content);
      setSelectedFile(filename);
      setShowViewDialog(true);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao ler ficheiro",
        variant: "destructive",
      });
    }
  };

  // Criar ficheiro
  const createFile = async () => {
    if (!newFileName.trim()) {
      toast({
        title: "Erro",
        description: "Nome do ficheiro é obrigatório",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/files/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: newFileName,
          content: newFileContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to create file");

      toast({
        title: "Sucesso",
        description: `Ficheiro ${newFileName} criado!`,
      });

      setNewFileName("");
      setNewFileContent("");
      setShowCreateDialog(false);
      loadFiles();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar ficheiro",
        variant: "destructive",
      });
    }
  };

  // Apagar ficheiro
  const deleteFile = async (filename: string) => {
    if (!confirm(`Tem certeza que deseja apagar ${filename}?`)) return;

    try {
      const response = await fetch(`${API_BASE}/files/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });

      if (!response.ok) throw new Error("Failed to delete file");

      toast({
        title: "Sucesso",
        description: `Ficheiro ${filename} apagado!`,
      });

      loadFiles();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao apagar ficheiro",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="flex flex-col h-full glass-intense rounded-2xl border border-primary/20 overflow-hidden">
      {/* Header */}
      <div className="border-b border-primary/20 p-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <Folder className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-sm text-primary">File Browser</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={loadFiles}
            size="sm"
            variant="ghost"
            disabled={loading}
            className="hover:bg-primary/10"
          >
            Atualizar
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary/20 hover:bg-primary/30">
                <Plus className="w-4 h-4" />
                Novo Ficheiro
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-intense border-primary/20">
              <DialogHeader>
                <DialogTitle>Criar Novo Ficheiro</DialogTitle>
                <DialogDescription>
                  Crie um novo ficheiro no workspace do Bastion
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome do Ficheiro</label>
                  <Input
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="exemplo.txt"
                    className="glass-panel border-primary/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Conteúdo</label>
                  <Textarea
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    placeholder="Conteúdo do ficheiro..."
                    className="glass-panel border-primary/20 min-h-[200px] font-mono text-sm"
                  />
                </div>
                <Button onClick={createFile} className="w-full">
                  Criar Ficheiro
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Folder className="w-12 h-12 mb-2 opacity-50" />
            <p>Nenhum ficheiro encontrado</p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-3 rounded-lg glass-soft border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <File className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium font-mono">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => readFile(file.name)}
                    className="h-8 w-8 hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteFile(file.name)}
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* View File Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="glass-intense border-primary/20 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-mono">{selectedFile}</DialogTitle>
            <DialogDescription>Conteúdo do ficheiro</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <pre className="text-sm font-mono p-4 glass-panel rounded-lg border border-primary/10">
              {fileContent}
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

