"use client";

import { Copy, Hash } from "lucide-react";
import { Select, TextArea } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { ToolButton } from "@/components/ui/tool-button";
import { createHashDigest, hashAlgorithms } from "@/lib/toolbox/hash";
import type { HashAlgorithm } from "@/lib/toolbox/types";
import type { ToolProps } from "./tool-props";

export function HashTool({
  copyText,
  showToast,
  updateWorkspace,
  workspace,
}: ToolProps) {
  async function generateHash() {
    try {
      const digest = await createHashDigest(
        workspace.hashAlgorithm,
        workspace.hashInput,
      );
      updateWorkspace("hashOutput", digest);
      showToast("Hash generated");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Unable to generate hash");
    }
  }

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <Panel className="p-4">
        <TextArea
          heightClass="h-72"
          label="Input"
          onChange={(value) => updateWorkspace("hashInput", value)}
          testId="hash-input"
          value={workspace.hashInput}
        />
      </Panel>

      <Panel className="p-4">
        <div className="grid gap-3">
          <Select<HashAlgorithm>
            label="Algorithm"
            onChange={(value) => updateWorkspace("hashAlgorithm", value)}
            options={hashAlgorithms}
            value={workspace.hashAlgorithm}
          />
          <ToolButton icon={Hash} onClick={generateHash} variant="primary">
            Generate
          </ToolButton>
          <ToolButton
            icon={Copy}
            onClick={() => copyText(workspace.hashOutput, "Hash copied")}
          >
            Copy
          </ToolButton>
          <TextArea
            heightClass="h-40"
            label="Digest"
            readOnly
            testId="hash-output"
            value={workspace.hashOutput}
          />
        </div>
      </Panel>
    </div>
  );
}
