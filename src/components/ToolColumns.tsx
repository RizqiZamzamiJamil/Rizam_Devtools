import { Children, useId, useState, type ReactNode } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function ToolColumns({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const columns = Children.toArray(children);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3" data-workspace>
      <Tabs
        value={active}
        onChange={(_, value: number) => setActive(value)}
        aria-label="Panel alat"
        className="shrink-0"
        sx={{ display: { xs: "flex", md: "none" } }}
        variant="fullWidth"
      >
        {["Input", "Hasil"].map((label, index) => (
          <Tab
            key={label}
            label={label}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
          />
        ))}
      </Tabs>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:gap-5">
        {columns.map((column, index) => (
          <div
            key={index}
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            data-tool-column={index === 0 ? "input" : "output"}
            className={`${active === index ? "flex" : "hidden"} min-h-0 min-w-0 flex-col md:flex ${index === 0 ? "overflow-hidden" : "overflow-y-auto overscroll-contain [&_.tool-panel]:max-h-none [&_.tool-panel]:shrink-0"}`}
            tabIndex={index === 1 ? 0 : undefined}
          >
            {column}
          </div>
        ))}
      </div>
    </div>
  );
}
