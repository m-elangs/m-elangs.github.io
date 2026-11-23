"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { usePageTransition } from "@/components/providers/TransitionProvider";

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/** next/link yang memainkan curtain transition sebelum berpindah halaman. */
export default function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    const targetPath = href.split("#")[0] || "/";
    if (targetPath === pathname) return;

    event.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
