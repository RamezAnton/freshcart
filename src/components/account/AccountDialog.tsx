"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export default function AccountDialog({
  title,
  children,
  onClose,
  busy = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  busy?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    ref.current?.showModal();
    ref.current
      ?.querySelector<HTMLInputElement>("input, textarea, select")
      ?.focus();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border-0 bg-white p-0 shadow-2xl backdrop:bg-gray-950/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            disabled={busy}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
