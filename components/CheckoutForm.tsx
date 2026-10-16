"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { countries, PLACEHOLDER_RATES, zoneForCountry } from "@/lib/shipping";
import { Media } from "./Media";
import { useStore } from "./StoreProvider";

type Fields = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

const empty: Fields = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "ZA",
};

const required: (keyof Fields)[] = ["email", "firstName", "lastName", "phone", "address1", "city", "postalCode", "country"];

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  for (const k of required) if (!f[k].trim()) errors[k] = "This field is required.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = "Please enter a valid email address.";
  if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone)) errors.phone = "Please enter a valid phone number.";
  return errors;
}

export function CheckoutForm({ paymentsReady, sandbox }: { paymentsReady: boolean; sandbox: boolean }) {
  const { lines, subtotal, ready } = useStore();
  const [f, setF] = useState<Fields>(empty);
  const [touched, setTouched] = useState(false);
  const [method, setMethod] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "redirecting">("idle");
  const [serverError, setServerError] = useState<string[] | null>(null);

  const zone = zoneForCountry(f.country);
  const selected = zone?.methods.find((m) => m.id === method) ?? zone?.methods[0];
  const shipping = selected?.price ?? 0;
  const errors = useMemo(() => validate(f), [f]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    setServerError(null);
    if (Object.keys(errors).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: f,
          shippingMethod: selected?.id,
          lines: lines.map((l) => ({ slug: l.product.slug, quantity: l.quantity })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.errors ?? ["We couldn't start your payment. Please try again."]);
        setStatus("idle");
        return;
      }
      // Hand over to PayFast's secure hosted payment page.
      setStatus("redirecting");
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.action;
      for (const [k, v] of data.fields as [string, string][]) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch {
      setServerError(["We couldn't reach the server. Please check your connection and try again."]);
      setStatus("idle");
    }
  }

  if (!ready) return <div style={{ minHeight: 320 }} aria-busy="true" />;

  if (!lines.length) {
    return (
      <div className="empty">
        <p className="h3">Your bag is empty</p>
        <Link href="/shop" className="btn">
          Explore the collection
        </Link>
      </div>
    );
  }

  const field = (k: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, span2 = false) => {
    const err = touched ? errors[k] : undefined;
    return (
      <div className={`field ${span2 ? "span-2" : ""}`}>
        <label className="field__label" htmlFor={`co-${k}`}>
          {label}
          {required.includes(k) ? "" : " (optional)"}
        </label>
        <input
          id={`co-${k}`}
          className="input"
          value={f[k]}
          onChange={set(k)}
          aria-invalid={Boolean(err)}
          aria-describedby={err ? `co-${k}-err` : undefined}
          {...props}
        />
        {err && (
          <span id={`co-${k}-err`} className="field__error">
            {err}
          </span>
        )}
      </div>
    );
  };

  return (
    <form className="checkout" onSubmit={submit} noValidate>
      <div>
        {!paymentsReady && (
          <div className="notice notice--error" role="alert" style={{ marginBottom: 40 }}>
            Online payments are not yet enabled on this store, so orders can’t be placed at the moment. Please{" "}
            <Link href="/contact" style={{ textDecoration: "underline" }}>
              contact us
            </Link>{" "}
            and we’ll gladly help.
          </div>
        )}
        {paymentsReady && sandbox && (
          <div className="notice" style={{ marginBottom: 40 }}>
            Test mode: payments run through the PayFast sandbox. No real money is charged.
          </div>
        )}

        <fieldset>
          <legend>Contact</legend>
          <div className="form-grid">
            {field("email", "Email", { type: "email", autoComplete: "email" }, true)}
            {field("phone", "Phone", { type: "tel", autoComplete: "tel" }, true)}
          </div>
        </fieldset>

        <fieldset>
          <legend>Shipping address</legend>
          <div className="form-grid">
            <div className="field span-2">
              <label className="field__label" htmlFor="co-country">
                Country
              </label>
              <select id="co-country" className="select" value={f.country} onChange={(e) => { set("country")(e); setMethod(""); }} autoComplete="country">
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {field("firstName", "First name", { autoComplete: "given-name" })}
            {field("lastName", "Last name", { autoComplete: "family-name" })}
            {field("address1", "Address", { autoComplete: "address-line1" }, true)}
            {field("address2", "Apartment, suite, etc.", { autoComplete: "address-line2" }, true)}
            {field("city", "City", { autoComplete: "address-level2" })}
            {field("province", f.country === "ZA" ? "Province" : "State / region", { autoComplete: "address-level1" })}
            {field("postalCode", "Postal code", { autoComplete: "postal-code" })}
          </div>
        </fieldset>

        <fieldset>
          <legend>Delivery method</legend>
          {zone ? (
            zone.methods.map((m) => (
              <label key={m.id} className="radio-card">
                <input type="radio" name="shipping" value={m.id} checked={selected?.id === m.id} onChange={() => setMethod(m.id)} />
                <span>
                  {m.label}
                  {m.estimate && <span className="muted"> · {m.estimate}</span>}
                </span>
                <span className="radio-card__price">{formatPrice(m.price)}</span>
              </label>
            ))
          ) : (
            <p className="notice">We don’t currently deliver to this country. Please contact us to ask about delivery.</p>
          )}
          {zone?.dutiesNote && (
            <p className="field__hint" style={{ marginTop: 16 }}>
              {zone.dutiesNote}
            </p>
          )}
          {PLACEHOLDER_RATES && process.env.NODE_ENV !== "production" && (
            <p className="field__hint" style={{ marginTop: 16 }}>
              Development note: delivery rates are placeholders set in lib/shipping.ts.
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>Payment</legend>
          <p className="muted" style={{ fontSize: "var(--fs-sm)", maxWidth: "36rem" }}>
            You’ll be taken to PayFast’s secure payment page to pay by card, EFT or another PayFast-supported method. MLAZA never sees
            or stores your card details.
          </p>
        </fieldset>

        {serverError && (
          <div className="notice notice--error" role="alert" style={{ marginBottom: 24 }}>
            <ul style={{ paddingLeft: "1.1em" }}>
              {serverError.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className="btn btn--block" disabled={!paymentsReady || !zone || status !== "idle"}>
          {status === "loading" ? "Preparing secure payment…" : status === "redirecting" ? "Redirecting to PayFast…" : `Pay ${formatPrice(subtotal + shipping)}`}
        </button>
        <p className="field__hint" style={{ marginTop: 14 }}>
          By placing your order you agree to our <Link href="/terms" style={{ textDecoration: "underline" }}>terms and conditions</Link> and{" "}
          <Link href="/returns" style={{ textDecoration: "underline" }}>returns policy</Link>.
        </p>
      </div>

      <aside className="summary-box" aria-label="Order summary">
        <h2 className="h3">Your order</h2>
        <ul style={{ listStyle: "none", display: "grid", gap: 14 }}>
          {lines.map((l) => (
            <li key={l.product.slug} className="mini-line">
              <Media src={l.product.images[0]?.src} alt="" tone="product" showBrief={false} sizes="64px" />
              <span>
                {l.product.name}
                <br />
                <span className="muted">Qty {l.quantity}</span>
              </span>
              <span>{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="totals">
          <div className="totals__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="totals__row">
            <span>Delivery</span>
            <span>{zone ? formatPrice(shipping) : "—"}</span>
          </div>
          <div className="totals__row totals__row--total">
            <span>Total</span>
            <span>{formatPrice(subtotal + shipping)}</span>
          </div>
        </div>
        <Link href="/bag" className="text-btn" style={{ justifySelf: "start" }}>
          Edit bag
        </Link>
      </aside>
    </form>
  );
}
