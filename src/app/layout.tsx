import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Visionyze Test",
  description: "Stripe + Next.js + Prisma"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div>
          <header >
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
