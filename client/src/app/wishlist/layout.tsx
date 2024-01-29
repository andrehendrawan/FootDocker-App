import Navbar from "@/components/navbar";
import React from "react";

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
