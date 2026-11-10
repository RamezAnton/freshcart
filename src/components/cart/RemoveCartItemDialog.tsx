"use client";

import { useEffect, useId, useRef } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";

export default function RemoveCartItemDialog({
  title,
  busy,
  error,
  onClose,
  onRemove,
}: {
  title: string;
  busy: boolean;
  error: string;
  onClose: () => void;
  onRemove: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={id}
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !busy) onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border-0 bg-white p-8 text-center shadow-2xl backdrop:bg-gray-950/50"
    >
      <span className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500">
        <Trash2 size={36} aria-hidden="true" />
      </span>
      <h2 id={id} className="text-2xl font-bold text-gray-900">
        Remove Item?
      </h2>
      <p className="mt-3 leading-relaxed text-gray-500">
        Remove <strong className="font-medium text-gray-700">{title}</strong>{" "}
        from your cart?
      </p>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="mt-7 flex gap-3">
        <button
          type="button"
          autoFocus
          disabled={busy}
          onClick={onClose}
          className="flex-1 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onRemove}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600 disabled:opacity-50"
        >
          {busy && <LoaderCircle size={16} className="animate-spin" />}Remove
        </button>
      </div>
    </dialog>
  );
}
