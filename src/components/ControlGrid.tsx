import { Activity, Cpu, Database, Zap, HardDrive, Network } from "lucide-react";
import { AIStatusNode } from "./AIStatusNode";

export const ControlGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 animate-fade-in">
      <AIStatusNode
        icon={Cpu}
        label="CPU Load"
        status="active"
        value="47%"
      />
      <AIStatusNode
        icon={Database}
        label="Memory"
        status="working"
        value="8.2GB"
      />
      <AIStatusNode
        icon={Network}
        label="Network"
        status="active"
        value="2.4GB/s"
      />
      <AIStatusNode
        icon={HardDrive}
        label="Storage"
        status="idle"
        value="234GB"
      />
      <AIStatusNode
        icon={Activity}
        label="Tasks"
        status="active"
        value="23"
      />
      <AIStatusNode
        icon={Zap}
        label="GPU"
        status="working"
        value="89%"
      />
    </div>
  );
};
