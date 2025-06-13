import NavbarProfile from "../navbar-profile";
import Footer from "../footer";

interface NavbarFooterLayoutProps {
  children?: React.ReactNode;
}

const NavbarFooterLayout = ({ children }: NavbarFooterLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarProfile className="fixed top-0 left-0 right-0 z-50" />

      <main className="flex flex-col flex-1 pt-25">{children}</main>

      <Footer />
    </div>
  );
};

export default NavbarFooterLayout;
