import "./Sidebarhome.css";
import type { NavItem } from '../types/sidehome';
import type { SidebarHomeProps } from '../types/sidehome';
import type { SidebarPage } from '../types/sidehome';





const primaryItems: NavItem[] = [
  {
    id: "recent",
    label: "Recent",
    icon: "fas fa-clock",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "fas fa-cog",
  },
  {
    id: "invite",
    label: "Invite Members",
    icon: "fas fa-user-plus",
  },
  {
    id: "gettingStarted",
    label: "Get Started",
    icon: "fas fa-rocket",
  },
  {
    id: "templates",
    label: "Explore Templates",
    icon: "fas fa-th-large",
  },
  {
    id: "upgrade",
    label: "Upgrade",
    icon: "fas fa-arrow-up",
  },
];

const secondaryItems: NavItem[] = [
  {
    id: "devboxes",
    label: "Devboxes & Sandboxes",
    icon: "fas fa-code",
  },
  {
    id: "drafts",
    label: "Drafts",
    icon: "fas fa-pencil-alt",
  },
  {
    id: "folders",
    label: "All Folders",
    icon: "fas fa-folder",
  },
  {
    id: "deleted",
    label: "Recently Deleted",
    icon: "fas fa-trash",
  },
  {
    id: "shared",
    label: "Shared With Me",
    icon: "fas fa-users",
  },
];

function NavigationSection({
  items,
  activePage,
  onPageChange,
}: {
  items: NavItem[];
  activePage: SidebarPage;
  onPageChange: (page: SidebarPage) => void;
}) {
  return (
    <ul className="nav-list">
      {items.map((item) => (
        <li
          key={item.id}
          className={activePage === item.id ? "active" : ""}
          onClick={() => onPageChange(item.id)}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function SidebarHome({
  activePage,
  onPageChange,
}: SidebarHomeProps) {
  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-top">
        <div className="workspace-info">
          <span className="workspace-icon">📁</span>
          <span className="workspace-name">User Workspace</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <NavigationSection
          items={primaryItems}
          activePage={activePage}
          onPageChange={onPageChange}
        />

        <div className="divider"></div>

        <NavigationSection
          items={secondaryItems}
          activePage={activePage}
          onPageChange={onPageChange}
        />
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="credit-card">
          <div>
            <h4>Credits</h4>
            <p>0 / 400</p>
          </div>

          <button className="upgrade-btn">
            Upgrade
          </button>
        </div>

        <button className="usage-btn">
          View Usage
        </button>
      </div>
    </aside>
  );
}