import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";

import Navigator from "./Navigator";
import TokenMarquee from "./TokenMarquee";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <TokenMarquee />
      
      <div className="flex flex-col flex-1 h-full">
        <Outlet />
      </div>
      
      {location.pathname !== "/chat" && <Footer />}
      
      <Navigator />
    </div>
  );
};

export default Layout;
