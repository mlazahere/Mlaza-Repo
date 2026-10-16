import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Terms and Conditions", description: "The terms that apply when you shop with MLAZA." };

export default function TermsPage() {
  return (
    <PolicyPage title="Terms and Conditions" updated="[Date]">
      <p>These terms apply to purchases made on this website from MLAZA — House of Cane, [registered company name and number, address].</p>
      <h2>Products</h2>
      <p>
        Our pieces are made by hand from natural cane. Small variations in colour, texture and weave are part of their
        character and are not defects. Product images are as accurate as possible, but screens vary.
      </p>
      <h2>Prices and payment</h2>
      <p>
        Prices are shown in South African rand (ZAR). [State whether prices include VAT.] Payment is taken through PayFast at
        checkout. Your order is accepted once payment is confirmed and we send you an order confirmation email.
      </p>
      <h2>Delivery</h2>
      <p>
        Delivery is described in our <Link href="/shipping">shipping and delivery</Link> information. Risk passes to you on
        delivery. International customers are responsible for any import duties and taxes.
      </p>
      <h2>Returns</h2>
      <p>
        Please see our <Link href="/returns">returns and exchanges</Link> policy.
      </p>
      <h2>Intellectual property</h2>
      <p>The MLAZA name, logo, designs, photographs and text on this site belong to MLAZA and may not be used without permission.</p>
      <h2>Liability</h2>
      <p>[Limitation of liability clause, subject to the Consumer Protection Act.]</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of South Africa.</p>
      <h2>Electronic Communications and Transactions Act</h2>
      <p>[Supplier information required by section 43 of the ECT Act: full name, legal status, physical address, contact details, registration number.]</p>
    </PolicyPage>
  );
}
