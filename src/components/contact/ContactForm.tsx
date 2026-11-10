"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import {
  FormField,
  inputClass,
  primaryButton,
} from "@/components/account/FormControls";

export default function ContactForm() {
  const [draft, setDraft] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `FreshCart — ${data.get("subject")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    const href = `mailto:support@freshcart.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft(href);
    window.location.assign(href);
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <FormField id="contact-name" label="Full Name">
          <input
            id="contact-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="John Doe"
            className={inputClass}
          />
        </FormField>
        <FormField id="contact-email" label="Email Address">
          <input
            id="contact-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField id="contact-subject" label="Subject">
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Select a subject
          </option>
          {[
            "General Inquiry",
            "Order Support",
            "Shipping Question",
            "Returns & Refunds",
            "Product Information",
            "Feedback & Suggestions",
            "Other",
          ].map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </FormField>
      <FormField id="contact-message" label="Message">
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="How can we help you?"
          className={`${inputClass} resize-y`}
        />
      </FormField>
      <button
        type="submit"
        className={`${primaryButton} w-full px-8 py-3.5 md:w-auto`}
      >
        <Send size={17} aria-hidden="true" />
        Send Message
      </button>
      <p className="text-xs text-gray-500">
        Opens your email app. Review and send your message there.
      </p>
      {draft && (
        <p
          role="status"
          className="rounded-xl bg-primary-50 p-4 text-sm text-primary-800"
        >
          Your email draft is ready. If your email app didn’t open,{" "}
          <a href={draft} className="font-semibold underline">
            open the draft again
          </a>{" "}
          or email support@freshcart.com.
        </p>
      )}
    </form>
  );
}
