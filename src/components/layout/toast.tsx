export function Toast({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-lg border border-brand-cyan/30 bg-[#10151d] px-4 py-3 text-center text-sm font-extrabold text-white">
      {message}
    </div>
  );
}
