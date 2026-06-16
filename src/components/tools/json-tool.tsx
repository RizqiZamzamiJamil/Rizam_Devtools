"use client";

import { CheckCircle2, Copy, Shuffle, Wand2 } from "lucide-react";
import { TextArea } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { getErrorMessage, stringifyJson } from "@/lib/toolbox/format";
import type { ToolProps } from "./tool-props";

export function JsonTool({
  copyText,
  showToast,
  updateWorkspace,
  workspace,
}: ToolProps) {
  function parseJson() {
    return JSON.parse(workspace.jsonInput);
  }

  function formatJson() {
    try {
      const output = stringifyJson(parseJson());
      updateWorkspace("jsonOutput", output);
      updateWorkspace("jsonStatus", "Valid JSON");
      showToast("JSON formatted");
    } catch (error) {
      updateWorkspace("jsonStatus", getErrorMessage(error, "Invalid JSON"));
    }
  }

  function minifyJson() {
    try {
      const output = JSON.stringify(parseJson());
      updateWorkspace("jsonOutput", output);
      updateWorkspace("jsonStatus", "Valid JSON");
      showToast("JSON minified");
    } catch (error) {
      updateWorkspace("jsonStatus", getErrorMessage(error, "Invalid JSON"));
    }
  }

  function validateJson() {
    try {
      parseJson();
      updateWorkspace("jsonStatus", "Valid JSON");
      showToast("JSON valid");
    } catch (error) {
      updateWorkspace("jsonStatus", getErrorMessage(error, "Invalid JSON"));
    }
  }

  return (
    <div className="grid items-start gap-4 xl:grid-cols-2">
      <Panel className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <StatusPill
            tone={workspace.jsonStatus === "Valid JSON" ? "ok" : "muted"}
          >
            {workspace.jsonStatus}
          </StatusPill>
          <div className="flex flex-wrap gap-2">
            <ToolButton icon={CheckCircle2} onClick={validateJson}>
              Validate
            </ToolButton>
            <ToolButton icon={Wand2} onClick={formatJson} variant="primary">
              Format
            </ToolButton>
            <ToolButton icon={Shuffle} onClick={minifyJson}>
              Minify
            </ToolButton>
          </div>
        </div>
        <TextArea
          heightClass="h-80"
          label="Input"
          onChange={(value) => updateWorkspace("jsonInput", value)}
          testId="json-input"
          value={workspace.jsonInput}
        />
      </Panel>

      <Panel className="p-4">
        <div className="mb-3 flex items-center justify-end">
          <ToolButton
            icon={Copy}
            onClick={() => copyText(workspace.jsonOutput, "JSON copied")}
          >
            Copy
          </ToolButton>
        </div>
        <TextArea
          heightClass="h-80"
          label="Output"
          readOnly
          testId="json-output"
          value={workspace.jsonOutput}
        />
      </Panel>
    </div>
  );
}
