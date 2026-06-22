import Sidebar from "@/components/dashboard/common/Sidebar";
import { requireRole } from "@/lib/core/session";

export default async function AdminLayout({ children }) {
  const user = await requireRole("admin");

  return (
    // <div className="flex min-h-screen w-full">
    //   <aside className="w-[260px] bg-gradient-to-r from-[#071E22] to-[#0F3D3E] text-white">
    //     <Sidebar user={user} />
    //   </aside>

    //   <main className="flex-1">{children}</main>
    // </div>
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="hidden md:block w-[260px] shrink-0 bg-gradient-to-r from-[#071E22] to-[#0F3D3E]  text-white min-h-screen">
        <Sidebar user={user} />
      </aside>

      {/* Mobile Top + Main */}
      <main className="flex-1 min-w-0 w-full min-h-screen pl-2 bg-gradient-to-r from-[#071E22] to-[#0F3D3E] ">
        {/* Mobile Sidebar Placeholder (optional) */}
        <div className="md:hidden mb-4">
          <Sidebar user={user} />
        </div>

        {children}
      </main>
    </div>
  );
}
