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

const Sidebar = ({ user }) => {
  // console.log(user);

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
            href: "/dashboard/user/jobs",
            label: "Jobs",
          },

          {
            icon: Gear,
            href: "/dashboard/user/settings",
            label: "Settings",
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
              icon: Factory,
              href: "/dashboard/admin/trainers",
              label: "Trainers",
            },
            {
              icon: Briefcase,
              href: "/dashboard/admin/jobs",
              label: "Jobs",
            },

            {
              icon: CreditCard,
              href: "/dashboard/admin/payments",
              label: "Payment",
            },
            {
              icon: Gear,
              href: "/dashboard/admin/settings",
              label: "Settings",
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
        <Button variant="secondary" className="lg:hidden">
          <LayoutSideContentLeft className="" />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="bg-gradient-to-b from-[#0b1220] via-gray-900 to-black">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {" "}
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
