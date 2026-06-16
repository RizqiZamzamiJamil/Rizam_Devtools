"use client";

import { useEffect, useRef, useState } from "react";
import { SAMPLE_JSON, SAMPLE_JWT, SAMPLE_URL } from "@/lib/toolbox/examples";
import { stringifyJson } from "@/lib/toolbox/format";
import { createHashDigest } from "@/lib/toolbox/hash";
import { toDateTimeLocal } from "@/lib/toolbox/time";
import type { PersistedState, ToolId, WorkspaceState } from "@/lib/toolbox/types";
import {
  INITIAL_WORKSPACE,
  mergeWorkspace,
  readPersistedWorkspace,
  STORAGE_KEY,
} from "@/lib/toolbox/workspace";

export function useToolboxWorkspace(activeTool: ToolId) {
  const [workspace, setWorkspace] = useState<WorkspaceState>(INITIAL_WORKSPACE);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWorkspace(readPersistedWorkspace().workspace);
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const payload: PersistedState = { activeTool, workspace };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activeTool, hydrated, workspace]);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    [],
  );

  function updateWorkspace<K extends keyof WorkspaceState>(
    key: K,
    value: WorkspaceState[K],
  ) {
    setWorkspace((current) => ({ ...current, [key]: value }));
  }

  function showToast(message: string) {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), 2400);
  }

  async function copyText(value: string, label = "Copied") {
    if (!value) {
      showToast("Nothing to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      showToast(label);
    } catch {
      showToast("Clipboard blocked");
    }
  }

  function resetActiveTool() {
    const defaults = mergeWorkspace();

    setWorkspace((current) => {
      if (activeTool === "json") {
        return {
          ...current,
          jsonInput: INITIAL_WORKSPACE.jsonInput,
          jsonOutput: "",
          jsonStatus: "Ready",
        };
      }
      if (activeTool === "jwt") return { ...current, jwtInput: "" };
      if (activeTool === "base64") {
        return {
          ...current,
          base64Input: INITIAL_WORKSPACE.base64Input,
          base64Mode: "encode",
        };
      }
      if (activeTool === "uuid") {
        return { ...current, uuidCount: 5, uuids: defaults.uuids };
      }
      if (activeTool === "timestamp") {
        return {
          ...current,
          timestampInput: defaults.timestampInput,
          dateInput: defaults.dateInput,
        };
      }
      if (activeTool === "url") {
        return {
          ...current,
          urlInput: INITIAL_WORKSPACE.urlInput,
          urlCodecInput: INITIAL_WORKSPACE.urlCodecInput,
          urlCodecMode: "encode",
        };
      }
      if (activeTool === "hash") {
        return {
          ...current,
          hashInput: INITIAL_WORKSPACE.hashInput,
          hashAlgorithm: "SHA-256",
          hashOutput: "",
        };
      }
      if (activeTool === "case") {
        return { ...current, caseInput: INITIAL_WORKSPACE.caseInput };
      }
      return current;
    });
    showToast("Tool reset");
  }

  async function loadExample() {
    const defaults = mergeWorkspace();

    if (activeTool === "json") {
      const jsonInput = stringifyJson(SAMPLE_JSON);
      setWorkspace((current) => ({
        ...current,
        jsonInput,
        jsonOutput: jsonInput,
        jsonStatus: "Valid JSON",
      }));
    }

    if (activeTool === "jwt") {
      setWorkspace((current) => ({ ...current, jwtInput: SAMPLE_JWT }));
    }

    if (activeTool === "base64") {
      setWorkspace((current) => ({
        ...current,
        base64Input: "Rizam DevTools",
        base64Mode: "encode",
      }));
    }

    if (activeTool === "uuid") {
      setWorkspace((current) => ({
        ...current,
        uuidCount: 5,
        uuids: defaults.uuids,
      }));
    }

    if (activeTool === "timestamp") {
      const sampleDate = new Date("2024-06-02T00:00:00.000Z");
      setWorkspace((current) => ({
        ...current,
        timestampInput: String(Math.floor(sampleDate.getTime() / 1000)),
        dateInput: toDateTimeLocal(sampleDate),
      }));
    }

    if (activeTool === "url") {
      setWorkspace((current) => ({
        ...current,
        urlInput: SAMPLE_URL,
        urlCodecInput: "devtools/rizam fun?tool=json",
        urlCodecMode: "encode",
      }));
    }

    if (activeTool === "hash") {
      const sampleInput = "Rizam DevTools";
      setWorkspace((current) => ({
        ...current,
        hashInput: sampleInput,
        hashAlgorithm: "SHA-256",
        hashOutput: current.hashOutput,
      }));
      const digest = await createHashDigest("SHA-256", sampleInput);
      setWorkspace((current) => ({ ...current, hashOutput: digest }));
    }

    if (activeTool === "case") {
      setWorkspace((current) => ({
        ...current,
        caseInput: "rizam developer toolbox",
      }));
    }

    showToast("Contoh dimuat");
  }

  return {
    copyText,
    hydrated,
    loadExample,
    resetActiveTool,
    showToast,
    toast,
    updateWorkspace,
    workspace,
  };
}
