import Image from "next/image";

type Tone = "light" | "dark" | "product";

type Props = {
  src?: string;
  alt: string;
  /** Art-direction brief shown on the placeholder until photography is supplied. */
  brief?: string;
  tone?: Tone;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Product name shown centred on product placeholders. */
  mark?: string;
  showBrief?: boolean;
};

/**
 * Responsive image with an honest placeholder. When `src` is empty the
 * component renders a tonal, clearly labelled stand-in instead of a stock or
 * AI-generated photo, so nothing misrepresents the real products.
 */
export function Media({
  src,
  alt,
  brief,
  tone = "light",
  sizes = "100vw",
  priority,
  className = "",
  style,
  mark,
  showBrief = true,
}: Props) {
  return (
    <div className={`media ${className}`} style={style}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="media__img" />
      ) : (
        <div
          className={`placeholder ${tone === "dark" ? "placeholder--dark" : tone === "product" ? "placeholder--product" : ""}`}
          role="img"
          aria-label={alt}
        >
          {mark && <span className="placeholder__product-mark" aria-hidden="true">{mark}</span>}
          {showBrief && brief && (
            <span className="placeholder__label" aria-hidden="true">
              <strong>Image to come</strong>
              {brief}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
