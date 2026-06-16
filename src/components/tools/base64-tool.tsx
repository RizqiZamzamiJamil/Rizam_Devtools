"use client";

import { Copy, RefreshCcw } from "lucide-react";
import { useMemo } from "react";
import { TextArea, Select } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { decodeBase64ToUtf8, encodeUtf8ToBase64 } from "@/lib/toolbox/base64";
import { getErrorMessage } from "@/lib/toolbox/format";
import type { Base64Mode } from "@/lib/toolbox/types";
import type { ToolProps } from "./tool-props";

export function Base64Tool({
  copyText,
  showToast,
  updateWorkspace,
  workspace,
}: ToolProps) {
  const result = useMemo(() => {
    if (!workspace.base64Input) return { value: "", error: "" };

    try {
      return {
        value:
          workspace.base64Mode === "encode"
            ? encodeUtf8ToBase64(workspace.base64Input)
            : decodeBase64ToUtf8(workspace.base64Input),
        error: "",
      };
    } catch (error) {
      return {
        value: "",
        error: getErrorMessage(error, "Unable to process Base64"),
      };
    }
  }, [workspace.base64Input, workspace.base64Mode]);

  function switchBase64Mode(nextMode: Base64Mode) {
    if (nextMode === workspace.base64Mode) return;

    if (result.value && !result.error) {
      updateWorkspace("base64Input", result.value);
    } else if (workspace.base64Input) {
      showToast("Output belum valid untuk ditukar");
    }

    updateWorkspace("base64Mode", nextMode);
  }

  return (
    <div className="grid items-start gap-4 xl:grid-cols-2">
      <Panel className="p-4">
        <div className="mb-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <Select
            label="Mode"
            onChange={switchBase64Mode}
            options={["encode", "decode"]}
            value={workspace.base64Mode}
          />
          <ToolButton
            icon={RefreshCcw}
            onClick={() =>
              switchBase64Mode(
                workspace.base64Mode === "encode" ? "decode" : "encode",
              )
            }
          >
            Switch
          </ToolButton>
        </div>
        <TextArea
          heightClass="h-56"
          label="Input"
          onChange={(value) => updateWorkspace("base64Input", value)}
          testId="base64-input"
          value={workspace.base64Input}
        />
      </Panel>

      <Panel className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <StatusPill tone={result.error ? "warn" : "ok"}>
            {result.error || "Ready"}
          </StatusPill>
          <ToolButton
            icon={Copy}
            onClick={() => copyText(result.value, "Base64 result copied")}
          >
            Copy
          </ToolButton>
        </div>
        <TextArea
          heightClass="h-56"
          label="Output"
          readOnly
          testId="base64-output"
          value={result.value}
        />
      </Panel>
    </div>
  );
}
