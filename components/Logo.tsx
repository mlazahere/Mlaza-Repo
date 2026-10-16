import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/mlaza-logo.png";

/**
 * The official MLAZA mark — the supplied artwork, unaltered.
 * Always rendered on a dark surface (see globals.css → Logo).
 */
export function Logo({ className = "", priority = false, link = true }: { className?: string; priority?: boolean; link?: boolean }) {
  const img = (
    <Image src={logo} alt="MLAZA — House of Cane" priority={priority} sizes="160px" style={{ height: "100%", width: "auto" }} />
  );
  if (!link) return <span className={`logo ${className}`}>{img}</span>;
  return (
    <Link href="/" className={`logo ${className}`} aria-label="MLAZA — House of Cane, home">
      {img}
    </Link>
  );
}
