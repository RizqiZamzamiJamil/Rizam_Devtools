"use client";

import { Copy } from "lucide-react";
import { useMemo } from "react";
import { DetailRow } from "@/components/ui/detail-row";
import { TextArea } from "@/components/ui/form-fields";
import { Panel } from "@/components/ui/panel";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolButton } from "@/components/ui/tool-button";
import { getErrorMessage, stringifyJson } from "@/lib/toolbox/format";
import { decodeJwtPart } from "@/lib/toolbox/jwt";
import { formatUnixDate } from "@/lib/toolbox/time";
import type { ToolProps } from "./tool-props";

export function JwtTool({ copyText, updateWorkspace, workspace }: ToolProps) {
  const decoded = useMemo(() => {
    const token = workspace.jwtInput.trim();
    if (!token) return { status: "Waiting", header: "", payload: "", claims: [] };

    const parts = token.split(".");
    if (parts.length < 2) {
      return { status: "Invalid JWT", header: "", payload: "", claims: [] };
    }

    try {
      const header = decodeJwtPart(parts[0]) as Record<string, unknown>;
      const payload = decodeJwtPart(parts[1]) as Record<string, unknown>;
      const claims = [
        ["Issuer", payload.iss],
        ["Subject", payload.sub],
        [
          "Audience",
          Array.isArray(payload.aud) ? payload.aud.join(", ") : payload.aud,
        ],
        ["Issued at", formatUnixDate(payload.iat)],
        ["Not before", formatUnixDate(payload.nbf)],
        ["Expires", formatUnixDate(payload.exp)],
        ["Algorithm", header.alg],
        ["Type", header.typ],
      ].filter(([, value]) => value);

      return {
        status: "Decoded",
        header: stringifyJson(header),
        payload: stringifyJson(payload),
        claims,
      };
    } catch (error) {
      return {
        status: getErrorMessage(error, "Invalid JWT"),
        header: "",
        payload: "",
        claims: [],
      };
    }
  }, [workspace.jwtInput]);

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <Panel className="p-4">
        <div className="mb-3">
          <StatusPill tone={decoded.status === "Decoded" ? "ok" : "muted"}>
            {decoded.status}
          </StatusPill>
        </div>
        <TextArea
          heightClass="h-72"
          label="Token"
          onChange={(value) => updateWorkspace("jwtInput", value)}
          testId="jwt-token"
          value={workspace.jwtInput}
        />
      </Panel>

      <div className="grid items-start gap-4">
        <Panel className="p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <StatusPill tone="warn">Not verified</StatusPill>
            <div className="flex flex-wrap gap-2">
              <ToolButton
                icon={Copy}
                onClick={() => copyText(decoded.header, "Header copied")}
              >
                Header
              </ToolButton>
              <ToolButton
                icon={Copy}
                onClick={() => copyText(decoded.payload, "Payload copied")}
              >
                Payload
              </ToolButton>
            </div>
          </div>
          <div className="grid items-start gap-3 lg:grid-cols-2">
            <TextArea
              heightClass="h-52"
              label="Header"
              readOnly
              testId="jwt-header"
              value={decoded.header}
            />
            <TextArea
              heightClass="h-52"
              label="Payload"
              readOnly
              testId="jwt-payload"
              value={decoded.payload}
            />
          </div>
        </Panel>

        <Panel className="p-4">
          <dl>
            {decoded.claims.length > 0 ? (
              decoded.claims.map(([label, value]) => (
                <DetailRow key={String(label)} label={String(label)} value={String(value)} />
              ))
            ) : (
              <p className="text-sm font-semibold text-white/48">No claims</p>
            )}
          </dl>
        </Panel>
      </div>
    </div>
  );
}
