import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  AlertHexaIcon,
  // BoxCubeIcon,
  BoltIcon,
  // CalenderIcon,
  ChatIcon,
  ChevronDownIcon,
  DollarLineIcon,
  GridIcon,
  HorizontaLDots,
  //ListIcon,
  LockIcon,
  // PageIcon,
  PieChartIcon,
  PlugInIcon,
  CalenderIcon,
  ShootingStarIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { usePermissions } from "../hooks/usePermissions";

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: NavItem[];
  pro?: boolean;
  new?: boolean;
  permission?: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
    permission: "view_dashboard",
  },
  {
    icon: <PlugInIcon />,
    name: "System Issues",
    path: "/system-issues",
  },
  {
    icon: <UserCircleIcon />,
    name: "Verification",
    path: "/verification",
    permission: "verification",
  },
  {
    icon: <UserCircleIcon />,
    name: "Users",
    path: "/users",
    permission: "user_verifications",
  },
  {
    icon: <AlertHexaIcon />,
    name: "Moderation",
    path: "/moderation",
    pro: false,
    permission: "user_verifications",
  },
  {
    icon: <ShootingStarIcon />,
    name: "All Interests",
    path: "/interests",
    pro: false,
    permission: "manage_interests",
  },
  {
    icon: <ChatIcon />,
    name: "Forums Category",
    path: "/forums-category",
    pro: false,
    permission: "manage_forums",
  },
  {
    icon: <CalenderIcon />,
    name: "Events",
    path: "/events",
    pro: false,
    permission: "manage_events",
  },
  {
    icon: <ChatIcon />,
    name: "Messaging Control",
    path: "/coming-soon",
    pro: false,
  },
  {
    icon: <DollarLineIcon />,
    name: "Payments",
    path: "/payments/subscriptions",
    pro: false,
  },
  {
    icon: <ShootingStarIcon />,
    name: "Stickers",
    path: "/stickers",
    pro: false,
  },
  {
    icon: <PieChartIcon />,
    name: "Analytics",
    path: "/analytics",
    permission: "view_analytics",
  },
  {
    icon: <BoltIcon />,
    name: "Settings",
    path: "/settings",
  },
  {
    icon: <LockIcon />,
    name: "Audit Log",
    path: "/audit-log",
  },
  {
    icon: <UserCircleIcon />,
    name: "Sub-admins",
    path: "/sub-admins",
    permission: "create_subadmin",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <BoltIcon />,
    name: "Settings",
    path: "/settings",
  },
  {
    icon: <LockIcon />,
    name: "Audit Log",
    path: "/audit-log",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { hasPermission } = usePermissions();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );

  const isActive = useCallback(
    (path?: string) => {
      if (!path) return false;
      return (
        location.pathname === path || location.pathname.startsWith(path + "/")
      );
    },
    [location.pathname],
  );

  useEffect(() => {
    const newExpandedMenus: Record<string, boolean> = {};

    const checkActive = (items: NavItem[]) => {
      items.forEach((item) => {
        if (item.subItems) {
          const hasActiveChild = item.subItems.some(
            (sub) =>
              (sub.path && isActive(sub.path)) ||
              (sub.subItems &&
                sub.subItems.some(
                  (nested) => nested.path && isActive(nested.path),
                )),
          );

          if (hasActiveChild) {
            newExpandedMenus[item.name] = true;
            // Recursive check for deeper levels
            checkActive(item.subItems);
          }
        }
      });
    };

    checkActive([...navItems, ...othersItems]);
    setExpandedMenus((prev) => ({ ...prev, ...newExpandedMenus }));
  }, [location.pathname, isActive]);

  const handleToggle = (name: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return (
      <ul className={`flex flex-col ${level > 0 ? "gap-1 mt-1" : "gap-4"}`}>
        {items.map((nav) => {
          // Check permission
          if (nav.permission && !hasPermission(nav.permission)) return null;

          const isMenuOpen = expandedMenus[nav.name];
          const active = nav.path ? isActive(nav.path) : false;
          // Active if any child is active
          const isChildActive = nav.subItems?.some(
            (sub) =>
              (sub.path && isActive(sub.path)) ||
              (sub.subItems &&
                sub.subItems.some(
                  (nested) => nested.path && isActive(nested.path),
                )),
          );

          return (
            <li key={nav.name} className={`${level > 0 ? "ml-4" : ""}`}>
              {nav.subItems ? (
                <div>
                  <button
                    onClick={() => handleToggle(nav.name)}
                    className={`menu-item group w-full ${active || isChildActive
                      ? "menu-item-active"
                      : "menu-item-inactive"
                      } cursor-pointer ${!isExpanded && !isHovered && level === 0
                        ? "lg:justify-center"
                        : "lg:justify-start"
                      }`}
                  >
                    {/* Only show icon for top level or if specified */}
                    {nav.icon && (
                      <span
                        className={`menu-item-icon-size ${active || isChildActive
                          ? "menu-item-active"
                          : "menu-item-inactive"
                          }`}
                      >
                        {nav.icon}
                      </span>
                    )}

                    {(isExpanded || isHovered || isMobileOpen || level > 0) && (
                      <>
                        <span
                          className={`menu-item-text truncate ${level > 0 && !nav.icon ? "ml-0" : ""}`}
                        >
                          {nav.name}
                        </span>
                        <ChevronDownIcon
                          className={`ml-auto w-5 h-5 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""
                            }`}
                        />
                      </>
                    )}
                  </button>
                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    {(isExpanded || isHovered || isMobileOpen) &&
                      renderNavItems(nav.subItems, level + 1)}
                  </div>
                </div>
              ) : (
                <Link
                  to={nav.path || "#"}
                  className={`menu-item group ${active ? "menu-item-active" : "menu-item-inactive"
                    } ${!isExpanded && !isHovered && level === 0 ? "lg:justify-center" : "lg:justify-start"}`}
                >
                  {nav.icon && (
                    <span
                      className={`menu-item-icon-size ${active ? "menu-item-active" : "menu-item-inactive"
                        }`}
                    >
                      {nav.icon}
                    </span>
                  )}

                  {(isExpanded || isHovered || isMobileOpen || level > 0) && (
                    <span
                      className={`menu-item-text truncate ${level > 0 && !nav.icon ? "ml-0" : ""}`}
                    >
                      {nav.name}
                    </span>
                  )}
                  {nav.new && (isExpanded || isHovered || isMobileOpen) && (
                    <span className="ml-auto menu-dropdown-badge menu-dropdown-badge-active">
                      new
                    </span>
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
          }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <div className="mx-auto">
                <img
                  className="dark:hidden"
                  src="/images/logo/Mainlogo.png"
                  alt="Logo"
                  width={150}
                  height={40}
                />
                <img
                  className="hidden dark:block"
                  src="/images/logo/logo-dark.svg"
                  alt="Logo"
                  width={150}
                  height={40}
                />
              </div>
            </>
          ) : (
            <img
              src="/images/logo/logoicon.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderNavItems(navItems)}
            </div>
            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderNavItems(othersItems)}
            </div> */}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
