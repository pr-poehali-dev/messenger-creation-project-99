import { type Tab } from "./data";
import ContactsTab from "./ContactsTab";
import SearchTab from "./SearchTab";
import NotificationsGalleryTab from "./NotificationsGalleryTab";
import ProfileSettingsTab from "./ProfileSettingsTab";

interface TabContentProps {
  activeTab: Tab;
}

export default function TabContent({ activeTab }: TabContentProps) {
  if (activeTab === "contacts") return <ContactsTab />;
  if (activeTab === "search") return <SearchTab />;
  if (activeTab === "notifications" || activeTab === "gallery") return <NotificationsGalleryTab activeTab={activeTab} />;
  if (activeTab === "profile" || activeTab === "settings") return <ProfileSettingsTab activeTab={activeTab} />;
  return null;
}
