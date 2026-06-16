"use client";

export function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-expanded={isOpen}
      aria-label={isOpen ? "Tutup sidebar toolbox" : "Buka sidebar toolbox"}
      className={`flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border border-brand-cyan/38 bg-brand-cyan/10 transition hover:bg-brand-cyan/16 sm:h-10 sm:w-10 lg:hidden ${
        isOpen ? "is-open" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`h-0.5 w-4.5 rounded-full bg-white transition duration-200 sm:w-5 ${
          isOpen ? "translate-y-1.5 rotate-45" : ""
        }`}
      />
      <span
        className={`h-0.5 w-4.5 rounded-full bg-white transition duration-200 sm:w-5 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-4.5 rounded-full bg-white transition duration-200 sm:w-5 ${
          isOpen ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      />
    </button>
  );
}
