"use client";

import { useEffect, useState } from "react";
import { MobileDrawer } from "./mobile-drawer";
import { Sidebar } from "./sidebar";
import { Toast } from "./toast";
import { ToolActions } from "./tool-actions";
import { ToolHeader } from "./tool-header";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { useToolboxWorkspace } from "@/hooks/use-toolbox-workspace";
import { getToolDefinition } from "@/lib/toolbox/tools";
import type { ToolId } from "@/lib/toolbox/types";

export function ToolboxPage({ activeTool }: { activeTool: ToolId }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const definition = getToolDefinition(activeTool);
  const workspaceApi = useToolboxWorkspace(activeTool);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <main className="toolbox-bg h-svh overflow-hidden bg-brand-bg text-white">
      <div className="flex h-full min-h-0">
        <aside className="hidden h-full w-[22rem] shrink-0 p-4 pr-0 lg:block">
          <Sidebar
            activeTool={activeTool}
          />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <ToolHeader
            definition={definition}
            hydrated={workspaceApi.hydrated}
            isSidebarOpen={isSidebarOpen}
            onExample={workspaceApi.loadExample}
            onReset={workspaceApi.resetActiveTool}
            onToggleSidebar={() => setIsSidebarOpen((current) => !current)}
          />

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-4 lg:px-5 lg:py-4">
            <div className="mx-auto w-full max-w-[96rem]">
              <div className="mb-3 flex justify-end lg:hidden">
                <ToolActions
                  compact
                  onExample={workspaceApi.loadExample}
                  onReset={workspaceApi.resetActiveTool}
                />
              </div>
              <ToolRenderer activeTool={activeTool} {...workspaceApi} />
            </div>
          </div>
        </div>
      </div>

      <MobileDrawer
        activeTool={activeTool}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <Toast message={workspaceApi.toast} />
    </main>
  );
}
