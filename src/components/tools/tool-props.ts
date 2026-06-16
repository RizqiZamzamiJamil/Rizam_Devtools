import type { WorkspaceState, WorkspaceUpdater } from "@/lib/toolbox/types";

export type ToolProps = {
  copyText: (value: string, label?: string) => Promise<void>;
  showToast: (message: string) => void;
  updateWorkspace: WorkspaceUpdater;
  workspace: WorkspaceState;
};
