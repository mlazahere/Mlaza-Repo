"use client";

import { useState } from "react";

type State = { status: "idle" | "loading" | "success" | "error"; message?: string };

export function NewsletterForm({ id = "newsletter-email" }: { id?: string }) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ status: "error", message: "Please enter a valid email address." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setState({ status: "success", message: "Thank you. Your first letter is on its way." });
      setEmail("");
    } catch (err) {
      setState({ status: "error", message: (err as Error).message });
    }
  }

  return (
    <form className="newsletter__form" onSubmit={submit} noValidate>
      <label htmlFor={id} className="field__label">
        Email address
      </label>
      <div className="newsletter__row">
        <input
          id={id}
          className="input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state.status === "error"}
          aria-describedby={`${id}-msg`}
          required
        />
        <button type="submit" disabled={state.status === "loading"}>
          {state.status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p id={`${id}-msg`} role="status" className={state.status === "error" ? "field__error" : "field__hint"}>
        {state.message ?? "You can unsubscribe at any time. See our privacy policy."}
      </p>
    </form>
  );
}
