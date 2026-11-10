export interface SidebarHomeProps {
  activePage: SidebarPage;
  onPageChange: (page: SidebarPage) => void;
}

export interface NavItem {
  id: SidebarPage;
  label: string;
  icon: string;
}


export type SidebarPage =
  | "recent"
  | "settings"
  | "invite"
  | "gettingStarted"
  | "templates"
  | "upgrade"
  | "devboxes"
  | "drafts"
  | "folders"
  | "deleted"
  | "shared";