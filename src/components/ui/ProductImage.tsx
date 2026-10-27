import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  PackageSearch,
  Smartphone,
  Tv,
  Watch,
} from "lucide-react";
import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  category?: string;
}

function ProductFallbackIcon({ label }: { label: string }) {
  const value = label.toLowerCase();
  const props = { size: 30, "aria-hidden": true as const };

  if (/phone|smartphone|iphone|galaxy|pixel/.test(value)) return <Smartphone {...props} />;
  if (/laptop|notebook|macbook|computer/.test(value)) return <Laptop {...props} />;
  if (/headphone|earbud|audio|speaker/.test(value)) return <Headphones {...props} />;
  if (/television|\btv\b|monitor|display/.test(value)) return <Tv {...props} />;
  if (/watch|wearable/.test(value)) return <Watch {...props} />;
  if (/camera|lens/.test(value)) return <Camera {...props} />;
  if (/game|console|playstation|xbox/.test(value)) return <Gamepad2 {...props} />;

  return <PackageSearch {...props} />;
}

function ProductImage({
  src,
  alt,
  className = "h-full w-full object-contain",
  fallbackClassName = "h-full w-full",
  category = "",
}: ProductImageProps) {
  const [failedSource, setFailedSource] = useState("");
  const unavailable = !src || failedSource === src;

  if (unavailable) {
    return (
      <span
        role="img"
        aria-label={`${alt} image unavailable`}
        className={`flex items-center justify-center bg-slate-100 text-slate-400 ${fallbackClassName}`}
      >
        <ProductFallbackIcon label={`${category} ${alt}`} />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSource(src)}
    />
  );
}

export default ProductImage;
