import type React from "react";

import { Home, MessageSquare, Compass } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center py-2 px-4 focus:outline-none focus:ring-2 focus:ring-iris-teal focus:ring-offset-2 focus:ring-offset-iris-dark rounded-lg"
      aria-label={label}
    >
      {isActive ? (
        <div className="w-6 h-6 bg-iris-teal rounded-full mb-1 flex items-center justify-center">
          <div className="w-3 h-3 bg-iris-dark rounded-full"></div>
        </div>
      ) : (
        <div className="w-6 h-6 mb-1 flex items-center justify-center">
          {icon}
        </div>
      )}
      <span
        className={`text-xs font-medium ${
          isActive ? "text-iris-teal" : "text-iris-gray"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function BottomNavigation() {
  const handleNavClick = (section: string) => {
    // TODO: Implement navigation with react router
    console.log(`Navigate to ${section}`);
  };

  return (
    <div className="bg-iris-dark border-t border-iris-border">
      <div className="flex justify-around items-center py-2">
        <NavItem
          icon={<Home className="w-6 h-6 text-iris-gray" />}
          label="Insights"
          onClick={() => handleNavClick("insights")}
        />

        <NavItem
          icon={<MessageSquare className="w-6 h-6 text-iris-gray" />}
          label="Chat"
          onClick={() => handleNavClick("chat")}
        />

        <NavItem
          icon={null}
          label="Iris"
          isActive={true}
          onClick={() => handleNavClick("iris")}
        />

        <NavItem
          icon={<Compass className="w-6 h-6 text-iris-gray" />}
          label="Explore"
          onClick={() => handleNavClick("explore")}
        />
      </div>
    </div>
  );
}
