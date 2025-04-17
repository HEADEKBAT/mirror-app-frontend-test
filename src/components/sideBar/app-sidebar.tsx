import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { SidebarInputs } from "./sidebar-inputs";
import { useAppStore } from "@/store/useAppStore"

export function AppSidebar() {
  const fetchAll = useAppStore((s) => s.fetchAll)
  return (
    <Sidebar>
      <SidebarHeader>
        <Button onClick={() => fetchAll({ onlySettings: true })}>Обновить</Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Настройки</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarInputs />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
