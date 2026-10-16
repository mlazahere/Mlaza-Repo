import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";
import { formatPrice } from "@/lib/format";
import { shippingZones } from "@/lib/shipping";

export const metadata: Metadata = { title: "Shipping and Delivery", description: "Delivery options, costs and customs information for MLAZA orders." };

export default function ShippingPage() {
  return (
    <PolicyPage title="Shipping and Delivery" intro="We deliver within South Africa and to selected international destinations.">
      <h2>Delivery options</h2>
      <p>Available delivery methods and their cost are shown at checkout once you enter your address.</p>
      {shippingZones.map((z) => (
        <div key={z.id}>
          <h3>{z.label}</h3>
          <ul>
            {z.methods.map((m) => (
              <li key={m.id}>
                {m.label}: {formatPrice(m.price)}
                {m.estimate && ` · ${m.estimate}`}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Processing</h2>
      <p>
        Pieces marked <em>Available</em> are prepared for dispatch after payment is confirmed. Pieces marked <em>Made to
        order</em> are woven after your order is placed; we will confirm the expected lead time by email.
        [Confirm processing times.]
      </p>
      <h2>Tracking</h2>
      <p>When your order is dispatched we will email you the courier’s tracking details. [Confirm courier and tracking process.]</p>
      <h2>International orders, customs and duties</h2>
      <p>
        Orders shipped outside South Africa may be subject to import duties, taxes and brokerage fees charged by the
        destination country. These charges are not included in your order total and are the responsibility of the
        recipient. We recommend checking with your local customs office before ordering.
      </p>
      <h2>Questions</h2>
      <p>
        For help with delivery, please <Link href="/contact">contact us</Link>.
      </p>
    </PolicyPage>
  );
}
