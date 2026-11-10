"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { LoaderCircle, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import type { Address } from "@/interfaces/account.interface";
import { addressSchema, type AddressValues } from "@/schema/account.schema";
import { toast } from "@/components/ui/toast";
import AccountDialog from "./AccountDialog";
import {
  FormField,
  FormMessage,
  inputClass,
  primaryButton,
} from "./FormControls";

async function addressesRequest(init?: RequestInit): Promise<Address[]> {
  const response = await fetch("/api/account/addresses", {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "Unable to load your addresses.");
  return data.data;
}

function AddAddress({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: (addresses: Address[]) => void;
}) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { name: "", details: "", phone: "", city: "" },
  });
  async function save(values: AddressValues) {
    setError("");
    try {
      const addresses = await addressesRequest({
        method: "POST",
        body: JSON.stringify(values),
      });
      onSaved(addresses);
      toast.add({
        type: "success",
        title: "Address added",
        description: "Your delivery address has been saved.",
      });
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to save your address.",
      );
    }
  }
  return (
    <AccountDialog
      title="Add New Address"
      onClose={onClose}
      busy={isSubmitting}
    >
      <form onSubmit={handleSubmit(save)} noValidate>
        <fieldset disabled={isSubmitting} className="space-y-5">
          <FormField
            id="address-name"
            label="Address Name"
            error={errors.name?.message}
          >
            <input
              {...register("name")}
              id="address-name"
              autoFocus
              placeholder="e.g. Home, Office"
              className={inputClass}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "address-name-error" : undefined}
            />
          </FormField>
          <FormField
            id="address-details"
            label="Full Address"
            error={errors.details?.message}
          >
            <textarea
              {...register("details")}
              id="address-details"
              autoComplete="street-address"
              rows={3}
              placeholder="Street, building, apartment..."
              className={`${inputClass} resize-none`}
              aria-invalid={!!errors.details}
              aria-describedby={
                errors.details ? "address-details-error" : undefined
              }
            />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="address-phone"
              label="Phone Number"
              error={errors.phone?.message}
            >
              <input
                {...register("phone")}
                id="address-phone"
                type="tel"
                autoComplete="tel"
                placeholder="01xxxxxxxxx"
                className={inputClass}
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone ? "address-phone-error" : undefined
                }
              />
            </FormField>
            <FormField
              id="address-city"
              label="City"
              error={errors.city?.message}
            >
              <input
                {...register("city")}
                id="address-city"
                autoComplete="address-level2"
                placeholder="Cairo"
                className={inputClass}
                aria-invalid={!!errors.city}
                aria-describedby={
                  errors.city ? "address-city-error" : undefined
                }
              />
            </FormField>
          </div>
          <FormMessage error={error} />
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${primaryButton} flex-1 px-4`}
            >
              {isSubmitting && (
                <LoaderCircle size={16} className="animate-spin" />
              )}
              {isSubmitting ? "Saving…" : "Add Address"}
            </button>
          </div>
        </fieldset>
      </form>
    </AccountDialog>
  );
}

export default function Addresses() {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<Address | null>(null);
  const [busy, setBusy] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");
    try {
      const result = await addressesRequest({ signal });
      if (!signal?.aborted) setAddresses(result);
    } catch (error) {
      if (!signal?.aborted)
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load your addresses.",
        );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!session?.user.id) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load, session?.user.id]);

  async function remove() {
    if (!deleting) return;
    setBusy(true);
    setDeleteError("");
    try {
      const response = await fetch(
        `/api/account/addresses?id=${encodeURIComponent(deleting._id)}`,
        { method: "DELETE" },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Unable to delete your address.");
      setAddresses(data.data);
      setDeleting(null);
      toast.add({ type: "success", title: "Address deleted" });
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Unable to delete your address.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[60vh]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>
        <button
          type="button"
          disabled={loading || !!error}
          onClick={() => setAdding(true)}
          className={`${primaryButton} px-5 py-2.5`}
        >
          <Plus size={17} aria-hidden="true" />
          Add Address
        </button>
      </div>
      {loading ? (
        <div
          role="status"
          className="flex min-h-64 items-center justify-center gap-3 rounded-3xl border border-gray-100 bg-white p-8 text-gray-500"
        >
          <LoaderCircle size={20} className="animate-spin" />
          Loading addresses…
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-gray-100 bg-white p-8">
          <FormMessage error={error} />
          <button
            type="button"
            onClick={() => void load()}
            className={`${primaryButton} mt-4`}
          >
            Try again
          </button>
        </div>
      ) : addresses.length === 0 ? (
        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center">
          <span className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <MapPin size={30} aria-hidden="true" />
          </span>
          <h3 className="mb-2 text-lg font-bold text-gray-900">
            No Addresses Yet
          </h3>
          <p className="mx-auto mb-6 max-w-sm text-gray-500">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <button
            type="button"
            onClick={() => setAdding(true)}
            className={primaryButton}
          >
            <Plus size={18} aria-hidden="true" />
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address._id}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-primary-100"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 wrap-break-words font-bold text-gray-900">
                    {address.name}
                  </h3>
                  <p className="mb-3 whitespace-pre-line wrap-break-words text-sm text-gray-600">
                    {address.details}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} aria-hidden="true" />
                      {address.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} aria-hidden="true" />
                      {address.city}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Delete ${address.name} address`}
                  onClick={() => {
                    setDeleteError("");
                    setDeleting(address);
                  }}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {adding && (
        <AddAddress onClose={() => setAdding(false)} onSaved={setAddresses} />
      )}
      {deleting && (
        <AccountDialog
          title="Delete Address?"
          busy={busy}
          onClose={() => setDeleting(null)}
        >
          <p className="mb-5 text-sm leading-relaxed text-gray-600">
            Remove <strong>{deleting.name}</strong> from your saved delivery
            addresses?
          </p>
          <FormMessage error={deleteError} />
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => setDeleting(null)}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void remove()}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {busy && <LoaderCircle size={16} className="animate-spin" />}
              {busy ? "Deleting…" : "Delete Address"}
            </button>
          </div>
        </AccountDialog>
      )}
    </div>
  );
}
