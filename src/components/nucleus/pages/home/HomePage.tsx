import { useState } from "react";

import { HeaderHome } from "../../component/home/HeaderHome";
import { SidebarHome } from "../../component/home/SidebarHome";
import type { SidebarPage } from "../../component/types/sidehome";
import { TemplatesGallery } from "../../component/home/TemplatesGallery";
import "./HomePage.css";

export function HomePage() {
  const [activePage, setActivePage] =
    useState<SidebarPage>("recent");

  const renderContent = () => {
    switch (activePage) {
      case "recent":
        return <RecentPage />;

      case "settings":
        return <SettingsPage />;

      case "invite":
        return <InvitePage />;

      case "gettingStarted":
        return <GettingStartedPage />;

      case "templates":
        return (
          <TemplatesGallery
            initialCategory="Popular"
          />
        );

      case "upgrade":
        return <UpgradePage />;

      case "devboxes":
        return <DevboxesPage />;

      case "drafts":
        return <DraftsPage />;

      case "folders":
        return <FoldersPage />;

      case "deleted":
        return <DeletedPage />;

      case "shared":
        return <SharedPage />;

      default:
        return <RecentPage />;
    }
  };

  return (
    <div className="home">
      <HeaderHome />

      <div className="home-body">
        <SidebarHome
          activePage={activePage}
          onPageChange={setActivePage}
        />

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

/* ---------- Pages ---------- */

function RecentPage() {
  return (
    <div className="content-card">
      <h2>You have no recent work</h2>

      <p>
        Get started by exploring templates or creating a
        new project.
      </p>

      <div className="action-buttons">
        <button className="primary-btn">
          Explore Templates
        </button>

        <button className="secondary-btn">
          + Create New
        </button>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="content-card">
      <h2>Settings</h2>
      <p>Manage your account settings and preferences.</p>
    </div>
  );
}

function InvitePage() {
  return (
    <div className="content-card">
      <h2>Invite Members</h2>
      <p>Invite teammates to collaborate on projects.</p>
    </div>
  );
}

function GettingStartedPage() {
  return (
    <div className="content-card">
      <h2>Getting Started</h2>
      <p>
        Learn how to use the application with a quick
        walkthrough.
      </p>
    </div>
  );
}

function UpgradePage() {
  return (
    <div className="content-card">
      <h2>Upgrade</h2>
      <p>
        Unlock premium features and increase your
        available credits.
      </p>
    </div>
  );
}

function DevboxesPage() {
  return (
    <div className="content-card">
      <h2>Devboxes & Sandboxes</h2>
      <p>
        Manage your development environments and testing
        workspaces.
      </p>
    </div>
  );
}

function DraftsPage() {
  return (
    <div className="content-card">
      <h2>Drafts</h2>
      <p>No drafts available.</p>
    </div>
  );
}

function FoldersPage() {
  return (
    <div className="content-card">
      <h2>Folders</h2>
      <p>Organize your projects into folders.</p>
    </div>
  );
}

function DeletedPage() {
  return (
    <div className="content-card">
      <h2>Recently Deleted</h2>
      <p>Your deleted projects will appear here.</p>
    </div>
  );
}

function SharedPage() {
  return (
    <div className="content-card">
      <h2>Shared With Me</h2>
      <p>Projects shared by other users.</p>
    </div>
  );
}