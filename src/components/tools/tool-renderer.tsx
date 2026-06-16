"use client";

import { Base64Tool } from "./base64-tool";
import { CaseTool } from "./case-tool";
import { HashTool } from "./hash-tool";
import { JsonTool } from "./json-tool";
import { JwtTool } from "./jwt-tool";
import { TimestampTool } from "./timestamp-tool";
import type { ToolProps } from "./tool-props";
import { UrlTool } from "./url-tool";
import { UuidTool } from "./uuid-tool";
import type { ToolId } from "@/lib/toolbox/types";

export function ToolRenderer({
  activeTool,
  ...toolProps
}: ToolProps & { activeTool: ToolId }) {
  if (activeTool === "json") return <JsonTool {...toolProps} />;
  if (activeTool === "jwt") return <JwtTool {...toolProps} />;
  if (activeTool === "base64") return <Base64Tool {...toolProps} />;
  if (activeTool === "uuid") return <UuidTool {...toolProps} />;
  if (activeTool === "timestamp") return <TimestampTool {...toolProps} />;
  if (activeTool === "url") return <UrlTool {...toolProps} />;
  if (activeTool === "hash") return <HashTool {...toolProps} />;
  return <CaseTool {...toolProps} />;
}
