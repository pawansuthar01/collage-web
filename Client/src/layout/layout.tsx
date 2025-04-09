import { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type LayoutProps = {
  children: ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
export default Layout;
