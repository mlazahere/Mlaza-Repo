import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Returns and Exchanges", description: "How returns and exchanges work at MLAZA." };

export default function ReturnsPage() {
  return (
    <PolicyPage title="Returns and Exchanges" intro="We want every piece to be one you keep. If it isn’t right, here’s how we can help.">
      <h2>Returns window</h2>
      <p>
        You may request a return within [X] days of receiving your order. Items must be unused, in their original
        condition, with all packaging and dust bags included.
      </p>
      <h2>Made-to-order pieces</h2>
      <p>[State whether made-to-order pieces can be returned or exchanged, and on what terms.]</p>
      <h2>How to start a return</h2>
      <ul>
        <li>
          <Link href="/contact">Contact us</Link> with your order reference and the item you’d like to return.
        </li>
        <li>We will reply with return instructions and the return address.</li>
        <li>Pack the item carefully so that its shape is protected in transit.</li>
      </ul>
      <h2>Refunds</h2>
      <p>
        Once we have received and inspected your return, we will refund the original payment method within [X] working
        days. [State whether delivery costs are refunded.]
      </p>
      <h2>Exchanges</h2>
      <p>[Describe the exchange process.]</p>
      <h2>Damaged or faulty items</h2>
      <p>If your piece arrives damaged, please contact us within [X] days of delivery with photographs so we can put it right.</p>
      <h2>Your statutory rights</h2>
      <p>This policy does not affect your rights under the South African Consumer Protection Act or other applicable law.</p>
    </PolicyPage>
  );
}
