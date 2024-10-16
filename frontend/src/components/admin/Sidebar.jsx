"use client";

import { useState } from "react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

// Define navigation links
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Branches", href: "/branches", icon: UsersIcon, current: false },
  { name: "Bookings", href: "/bookings", icon: UsersIcon, current: false },
  { name: "Treatments", href: "/treatments", icon: FolderIcon, current: false },
  {
    name: "Top Services",
    href: "/topservices",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Testimonials",
    href: "/testimonials",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Consultants",
    href: "/consultants",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Duty Doctors",
    href: "/duty-doctors",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Jobs", href: "/jobpostings", icon: ChartPieIcon, current: false },
  {
    name: "Applications",
    href: "/applications",
    icon: ChartPieIcon,
    current: false,
  },
  { name: "Messages", href: "/messages", icon: ChartPieIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs transform transition duration-300 ease-in-out">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
              <div className="flex h-16 items-center">
                <img
                  alt="Your Company"
                  src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png"
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-700 text-white"
                            : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon className="h-6 w-6" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                    >
                      <Cog6ToothIcon className="h-6 w-6" />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for larger screens */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
          <div className="flex h-16 items-center">
            <img
              alt="Your Company"
              src="https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png"
              className="h-8 w-auto"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-700 text-white"
                        : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="mt-auto">
                <a
                  href="#"
                  className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                >
                  <Cog6ToothIcon className="h-6 w-6" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-72 flex flex-col flex-grow">
        <header className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          {/* Separator */}
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-900/10 lg:hidden"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <form action="#" method="GET" className="relative flex flex-1">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              />
              <input
                id="search-field"
                name="search"
                type="search"
                placeholder="Search..."
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              />
            </form>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full bg-gray-50"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    >
                      Tom Cook
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 text-gray-400"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem
                    as="button"
                    onClick={() => alert("Your Profile Clicked")}
                  >
                    <span className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                      <ChevronDownIcon className="h-6 w-6" />
                      Your Profile
                    </span>
                  </MenuItem>

                  <MenuItem as="button" onClick={handleLogout}>
                    <span className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                      <ChevronDownIcon className="h-6 w-6" />
                      Log out
                    </span>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </>
  );
}

// {userNavigation.map((item) => (
//   <MenuItem key={item.name}>
//     <a
//       href={item.href}
//       className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
//     >
//       {item.name}
//     </a>
//   </MenuItem>
// ))}
