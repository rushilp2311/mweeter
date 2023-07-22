import FollowedSection from "@/components/FollowedSection";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className="h-full w-full flex items-center">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
