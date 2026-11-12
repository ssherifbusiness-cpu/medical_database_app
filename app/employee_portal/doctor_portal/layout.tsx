import type { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

export default function DoctorPortalLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-w-full">
            {/* Doctor Portal Sidebar */}
            <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] shrink-0 z-1">
                <Sidebar />
            </div>

            {/* Main Doctor Portal Content */}
            <div className="p-2 min-w-0 flex-1 overflow-x-auto">
                {children}
            </div>
        </div>
    );
}
