"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("loading");
    setErrors({});
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        else setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("sent");
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="notice notice--success" role="status">
        Thank you — your message has been sent. We’ll be in touch soon.
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <span id={`c-${k}-err`} className="field__error">
        {errors[k]}
      </span>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="form-grid">
      <div className="field">
        <label className="field__label" htmlFor="c-name">Name</label>
        <input id="c-name" name="name" className="input" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "c-name-err" : undefined} required />
        {err("name")}
      </div>
      <div className="field">
        <label className="field__label" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" className="input" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "c-email-err" : undefined} required />
        {err("email")}
      </div>
      <div className="field">
        <label className="field__label" htmlFor="c-topic">Topic</label>
        <select id="c-topic" name="topic" className="select" defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>An existing order</option>
          <option>Product question</option>
          <option>Returns and exchanges</option>
          <option>Press and collaborations</option>
        </select>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="c-order">Order reference (optional)</label>
        <input id="c-order" name="order" className="input" />
      </div>
      <div className="field span-2">
        <label className="field__label" htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" className="textarea" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "c-message-err" : undefined} required />
        {err("message")}
      </div>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <div className="notice notice--error span-2" role="alert">
          {error}
        </div>
      )}
      <div className="span-2">
        <button type="submit" className="btn" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
