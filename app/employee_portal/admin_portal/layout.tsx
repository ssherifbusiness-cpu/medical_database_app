import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex w-max min-w-full">
      <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] shrink-0 z-1">
        <Sidebar />
      </div>
      <div className="p-2 min-w-0 flex-1 p-2 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
