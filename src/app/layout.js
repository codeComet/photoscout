import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SearchProvider } from "@/context/SearchContext";
import NavbarSelector from "@/components/nav/NavbarSelector";

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "PhotoScout",
  description: "Find photos from multiple sources with one click.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${open_sans.variable} antialiased`}>
        <SearchProvider>
          <NavbarSelector/>
          {children}
        </SearchProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
