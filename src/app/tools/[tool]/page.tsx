import { notFound } from "next/navigation";
import { ToolboxPage } from "@/components/layout/toolbox-page";
import { isToolId, tools } from "@/lib/toolbox/tools";
import type { ToolId } from "@/lib/toolbox/types";

export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.id }));
}

type ToolPageParams = {
  params: Promise<{ tool: string }>;
};

export async function generateMetadata({ params }: ToolPageParams) {
  const { tool: toolId } = await params;
  const definition = tools.find((tool) => tool.id === toolId);

  if (!definition) {
    return {
      title: "Rizam DevTools",
    };
  }

  return {
    title: `${definition.name} | Rizam DevTools`,
    description: definition.description,
  };
}

export default async function ToolPage({ params }: ToolPageParams) {
  const { tool } = await params;

  if (!isToolId(tool)) notFound();

  return <ToolboxPage activeTool={tool as ToolId} />;
}
