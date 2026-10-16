import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How MLAZA collects, uses and protects your personal information." };

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy" updated="[Date]">
      <p>
        MLAZA — House of Cane (“we”, “us”) respects your privacy. This policy explains how we process personal information
        in line with the Protection of Personal Information Act, 2013 (POPIA) and, where applicable, other data-protection laws.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Contact and delivery details you provide at checkout: name, email, phone number and address.</li>
        <li>Order details: the products you buy and the delivery method you choose.</li>
        <li>Messages you send us through the contact form.</li>
        <li>Your email address, if you subscribe to Letters from MLAZA.</li>
      </ul>
      <h2>Payments</h2>
      <p>
        Payments are processed by PayFast on its own secure pages. We do not receive or store your card details. PayFast’s
        own privacy policy applies to the information you provide to it.
      </p>
      <h2>How we use your information</h2>
      <ul>
        <li>To process, deliver and support your orders.</li>
        <li>To reply to your enquiries.</li>
        <li>To send newsletters, only if you have subscribed. You can unsubscribe at any time.</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We share information only with service providers who help us run the store — such as our payment provider, courier,
        email and hosting providers — and only as needed for them to provide their service. [List providers.]
      </p>
      <h2>Your shopping bag</h2>
      <p>
        Your shopping bag is saved in your browser’s local storage so it is still there when you return. It is not sent to us
        until you check out. We do not use advertising or tracking cookies. [Update if analytics are added.]
      </p>
      <h2>Your rights</h2>
      <p>
        You may ask to access, correct or delete your personal information, or object to its processing. To do so, please{" "}
        <Link href="/contact">contact us</Link>. You also have the right to lodge a complaint with the Information Regulator.
      </p>
      <h2>Contact</h2>
      <p>Information Officer: [Name, email address].</p>
    </PolicyPage>
  );
}
