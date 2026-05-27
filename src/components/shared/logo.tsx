import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  href?: string;
};

export default function Logo({
  size = "md",
  href = "/",
}: LogoProps) {
  const sizes = {
    sm: {
      img: 28,
      text: "text-base",
    },
    md: {
      img: 36,
      text: "text-lg",
    },
    lg: {
      img: 48,
      text: "text-2xl",
    },
  };

  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-white transition hover:opacity-80"
    >
      <Image
        src="/icon.png"
        alt="CodeCrew Logo"
        width={sizes[size].img}
        height={sizes[size].img}
        priority
      />

      <span className={`font-semibold tracking-tight ${sizes[size].text}`}>
        CodeCrew
      </span>
    </Link>
  );
}