import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./sideBar/app-sidebar";
import { useAppStore } from "@/store/useAppStore";
import { PostLayoutRenderer } from "./layout/PostLayoutRenderer";

export default function Layout() {
  const { fetchAll } = useAppStore();

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <PostLayoutRenderer />
      </main>
    </SidebarProvider>
  );
}
