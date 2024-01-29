import Navbar from "@/components/navbar";
import React from "react";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
