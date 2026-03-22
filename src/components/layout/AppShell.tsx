import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

export default function AppShell({ children, title, actions }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-[60px] border-b border-rim bg-void/80 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-display text-xl tracking-[3px] text-text-primary">
            {title}
          </h1>
          <div className="flex items-center gap-3">
            {/* Live badge */}
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-mint bg-mint/10 border border-mint/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-blink" />
              Protocol Active
            </span>
            {actions}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
