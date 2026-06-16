"use client";

import { Copy, RefreshCcw } from "lucide-react";
import { useMemo } from "react";
import { DetailRow } from "@/components/ui/detail-row";
import { Input, Select, TextArea } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { getErrorMessage } from "@/lib/toolbox/format";
import type { UrlCodecMode } from "@/lib/toolbox/types";
import { normalizeUrlInput } from "@/lib/toolbox/url";
import type { ToolProps } from "./tool-props";

export function UrlTool({
  copyText,
  showToast,
  updateWorkspace,
  workspace,
}: ToolProps) {
  const parsed = useMemo(() => {
    const normalized = normalizeUrlInput(workspace.urlInput);
    if (!normalized) return { error: "No URL", rows: [], params: [] };

    try {
      const url = new URL(normalized);
      return {
        error: "",
        rows: [
          ["Protocol", url.protocol],
          ["Username", url.username],
          ["Password", url.password ? "Set" : ""],
          ["Host", url.host],
          ["Hostname", url.hostname],
          ["Port", url.port],
          ["Pathname", url.pathname],
          ["Search", url.search],
          ["Hash", url.hash],
          ["Origin", url.origin],
          ["Normalized", url.href],
        ].filter(([, value]) => value) as [string, string][],
        params: Array.from(url.searchParams.entries()),
      };
    } catch (error) {
      return { error: getErrorMessage(error, "Invalid URL"), rows: [], params: [] };
    }
  }, [workspace.urlInput]);

  const codecResult = useMemo(() => {
    if (!workspace.urlCodecInput) return { value: "", error: "" };

    try {
      return {
        value:
          workspace.urlCodecMode === "encode"
            ? encodeURIComponent(workspace.urlCodecInput)
            : decodeURIComponent(workspace.urlCodecInput),
        error: "",
      };
    } catch (error) {
      return {
        value: "",
        error: getErrorMessage(error, "Unable to process URL text"),
      };
    }
  }, [workspace.urlCodecInput, workspace.urlCodecMode]);

  function switchUrlCodecMode(nextMode: UrlCodecMode) {
    if (nextMode === workspace.urlCodecMode) return;

    if (codecResult.value && !codecResult.error) {
      updateWorkspace("urlCodecInput", codecResult.value);
    } else if (workspace.urlCodecInput) {
      showToast("Output belum valid untuk ditukar");
    }

    updateWorkspace("urlCodecMode", nextMode);
  }

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <Panel className="p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <StatusPill tone={parsed.error ? "warn" : "ok"}>
            {parsed.error || "Parsed"}
          </StatusPill>
          <ToolButton
            icon={Copy}
            onClick={() =>
              copyText(
                parsed.rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
                "URL details copied",
              )
            }
          >
            Copy
          </ToolButton>
        </div>
        <Input
          label="URL"
          onChange={(value) => updateWorkspace("urlInput", value)}
          value={workspace.urlInput}
        />
        <dl className="mt-4">
          {parsed.rows.map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </dl>
        <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
          <div className="border-b border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black uppercase text-white/42">
            Query Params
          </div>
          {parsed.params.length > 0 ? (
            <div className="max-h-56 divide-y divide-white/10 overflow-y-auto">
              {parsed.params.map(([key, value], index) => (
                <div
                  className="grid gap-2 px-3 py-2 font-mono text-sm sm:grid-cols-[12rem_1fr]"
                  key={`${key}-${index}`}
                >
                  <span className="break-all text-brand-cyan">{key}</span>
                  <span className="break-all text-white/82">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="px-3 py-3 text-sm font-semibold text-white/48">
              No params
            </p>
          )}
        </div>
      </Panel>

      <Panel className="p-4">
        <div className="grid gap-3">
          <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto] xl:grid-cols-1">
            <Select
              label="Codec"
              onChange={switchUrlCodecMode}
              options={["encode", "decode"]}
              value={workspace.urlCodecMode}
            />
            <ToolButton
              icon={RefreshCcw}
              onClick={() =>
                switchUrlCodecMode(
                  workspace.urlCodecMode === "encode" ? "decode" : "encode",
                )
              }
            >
              Switch
            </ToolButton>
          </div>
          <TextArea
            heightClass="h-40"
            label="Text"
            onChange={(value) => updateWorkspace("urlCodecInput", value)}
            testId="url-codec-input"
            value={workspace.urlCodecInput}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <StatusPill tone={codecResult.error ? "warn" : "ok"}>
              {codecResult.error || "Ready"}
            </StatusPill>
            <ToolButton
              icon={Copy}
              onClick={() => copyText(codecResult.value, "URL text copied")}
            >
              Copy
            </ToolButton>
          </div>
          <TextArea
            heightClass="h-40"
            label="Result"
            readOnly
            testId="url-codec-output"
            value={codecResult.value}
          />
        </div>
      </Panel>
    </div>
  );
}
