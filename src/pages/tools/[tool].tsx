import type { GetStaticPaths, GetStaticProps } from "next";
import Json from "../json";
import Jwt from "../jwt";
import Base64 from "../base64";
import Uuid from "../uuid";
import Timestamp from "../timestamp";
import Url from "../url";
import Hash from "../hash";
import Case from "../case";
import { tools, type ToolId } from "@/utils/tools";

const pages = {
  json: Json,
  jwt: Jwt,
  base64: Base64,
  uuid: Uuid,
  timestamp: Timestamp,
  url: Url,
  hash: Hash,
  case: Case,
};

export default function LegacyTool({ tool }: { tool: ToolId }) {
  const Page = pages[tool];
  return <Page />;
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: tools.map((tool) => ({ params: { tool: tool.id } })),
  fallback: false,
});
export const getStaticProps: GetStaticProps = (context) => ({
  props: { tool: context.params?.tool },
});
