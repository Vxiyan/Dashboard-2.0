import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
    Gamepad2, 
    Home, 
    MapPin, 
    StickyNote, 
    Library, 
    Link as LinkIcon,
    Settings,
    Zap,
    User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { User as UserEntity } from "@/entities/User";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Coordinates", 
    url: createPageUrl("Coordinates"),
    icon: MapPin,
  },
  {
    title: "Notes",
    url: createPageUrl("Notes"), 
    icon: StickyNote,
  },
  {
    title: "Game Library",
    url: createPageUrl("GameLibrary"),
    icon: Library,
  },
  {
    title: "Quick Links",
    url: createPageUrl("QuickLinks"),
    icon: LinkIcon,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await UserEntity.me();
        setUser(currentUser);
      } catch (error) {
        console.log("User not authenticated");
      }
    };
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <style>
        {`
          :root {
            --gaming-primary: #00d9ff;
            --gaming-secondary: #00ff88;
            --gaming-accent: #ff0080;
            --gaming-dark: #0a0a0f;
            --gaming-darker: #050507;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.5);
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(100, 116, 139, 0.5);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.7);
          }

          ::selection {
            background: rgba(6, 182, 212, 0.3);
            color: #ffffff;
          }

          .enhanced-backdrop {
            backdrop-filter: blur(20px) saturate(180%);
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.1);
          }
        `}
      </style>
      
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar className="enhanced-backdrop border-r-0">
            <SidebarHeader className="border-b border-slate-700/30 p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                </div>
                <div>
                  <h2 className="font-bold text-xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    GameHQ
                  </h2>
                  <p className="text-xs text-slate-400">Gaming Command Center</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-3">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-slate-800/60 hover:text-cyan-400 transition-all duration-300 rounded-xl mb-1 group relative overflow-hidden ${
                            location.pathname === item.url 
                              ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                              : 'text-slate-300 hover:shadow-md hover:shadow-slate-900/50'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-3 py-3 relative z-10">
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-medium">{item.title}</span>
                            {location.pathname === item.url && (
                              <div className="absolute right-2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-8">
                <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Status
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-2 space-y-3">
                    <div className="flex items-center gap-3 text-sm bg-slate-800/30 rounded-lg p-2 border border-slate-700/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                      <span className="text-slate-300">Online</span>
                      <div className="ml-auto w-1 h-4 bg-gradient-to-t from-green-400/0 to-green-400/50 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3 text-sm bg-slate-800/30 rounded-lg p-2 border border-slate-700/30">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-slate-300">Level 42</span>
                      <div className="ml-auto text-xs text-yellow-400">Elite</div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-700/30 p-4">
              <div className="flex items-center gap-3 bg-slate-800/30 rounded-xl p-3 border border-slate-700/30">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-slate-900"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-200 text-sm truncate">
                    {user?.full_name || 'Gamer'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">Ready to play</p>
                </div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col relative">
            <header className="enhanced-backdrop border-b border-slate-700/30 px-6 py-4 md:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-slate-800/60 p-2 rounded-xl transition-all duration-200 text-slate-300 hover:text-cyan-400" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    GameHQ
                  </h1>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none"></div>
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
