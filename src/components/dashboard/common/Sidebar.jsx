import {
  LayoutSideContentLeft,
  PlusShape,
  Briefcase,
  Gear,
  House,
  Magnifier,
  Person,
  Persons,
  Factory,
  CreditCard,
  BarsPlay,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import User from "./User";
import Link from "next/link";
import { GrArticle, GrFavorite, GrTransaction } from "react-icons/gr";
import { MdSettingsApplications } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { requireOrgRole } from "better-auth/api";

const Sidebar = async ({ user }) => {
  const navItems =
    user?.role === "user"
      ? [
          {
            icon: House,
            href: "/dashboard/user",
            label: "Home",
          },
          {
            icon: Magnifier,
            href: "/dashboard/user/classes",
            label: "My Bookings",
          },

          {
            icon: PlusShape,
            href: "/dashboard/user/apply-for-trainer",
            label: "Apply for a Trainer",
          },
          {
            icon: GrFavorite,
            href: "/dashboard/user/favorite",
            label: "Favorite Classes",
          },
          {
            icon: GiReturnArrow,
            href: "/",
            label: "Return Home",
          },
        ]
      : user?.role === "trainer"
        ? [
            {
              icon: House,
              href: "/dashboard/trainer",
              label: "Overview",
            },
            {
              icon: PlusShape,
              href: "/dashboard/trainer/classes/new",
              label: "Add Class",
            },
            {
              icon: BarsPlay,
              href: "/dashboard/trainer/classes",
              label: "My Classes",
            },
            {
              icon: PlusShape,
              href: "/dashboard/trainer/forums/new",
              label: "Add Forum",
            },
            {
              icon: Person,
              href: "/dashboard/trainer/forums",
              label: "My Forum posts",
            },
            {
              icon: GiReturnArrow,
              href: "/",
              label: "Return Home",
            },
          ]
        : [
            {
              icon: House,
              href: "/dashboard/admin",
              label: "Overview",
            },
            {
              icon: Persons,
              href: "/dashboard/admin/users",
              label: "Users",
            },
            {
              icon: MdSettingsApplications,
              href: "/dashboard/admin/trainer-applications",
              label: "Trainer Applications",
            },
            {
              icon: FaChalkboardTeacher,
              href: "/dashboard/admin/trainers",
              label: "Manage Trainers",
            },

            {
              icon: CreditCard,
              href: "/dashboard/admin/classes",
              label: "Manage Classes",
            },
            {
              icon: GrArticle,
              href: "/dashboard/admin/forums",
              label: "Manage Forums",
            },
            {
              icon: PlusShape,
              href: "/dashboard/admin/forums/new",
              label: "Create Forum post",
            },
            {
              icon: GrTransaction,
              href: "/dashboard/admin/transactions",
              label: "Transactions",
            },
            {
              icon: GiReturnArrow,
              href: "/",
              label: "Return Home",
            },
          ];
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-black"
          href={item.href}
        >
          <item.icon className="size-5 text-white" />
          <p className="text-white hover:text-white font-bold">{item.label}</p>
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="">
      <aside className="hidden w-64 shrink-0 p-4 lg:block">
        <User /> {navContent}
      </aside>

      <Drawer>
        <Button
          variant="ghost"
          className="lg:hidden py-2 px-4 mt-2 rounded-lg bg-gradient-to-r from-[#071E22] to-[#0F3D3E] text-white shadow-md hover:scale-105 active:scale-95 transition"
        >
          <LayoutSideContentLeft className="w-5 h-5" />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-gradient-to-r from-[#071E22] to-[#0F3D3E]">
              <Drawer.CloseTrigger />
              <Drawer.Header></Drawer.Header>
              <Drawer.Body>
                <User /> {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
};

export default Sidebar;
