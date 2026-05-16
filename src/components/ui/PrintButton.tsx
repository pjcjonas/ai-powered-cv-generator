"use client";

export function PrintButton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => window.print()}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        Save as PDF / Print
      </button>
      <p className="text-xs text-gray-500 text-center max-w-xs">
        In the print dialog: select <strong>Save as PDF</strong>, set margins to <strong>None</strong>, and disable <strong>Headers and footers</strong>.
      </p>
    </div>
  );
}
