import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import userLogo from '../assets/user-logo.webp'; // Adjust the path as necessary
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // Import icons

const navigation = [
  { name: 'Home', to: '/', current: true, public: true },
  // Add other public navigation items here if needed
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ onToggleTheme, theme }) { 
  const user = localStorage.getItem('loggedInUser')
    ? JSON.parse(localStorage.getItem('loggedInUser')): null;

  const userNavigation =user
    ? [
        { name: 'Dashboard', to: user.isAdmin ? '/admin/Dashboard' : '/user/Dashboard1', current: false },
        { name: 'Logout', to: '/logOut', current: false },
        { name: 'Profile', to: '/user/profile', current: false },
        { name: 'Settings', to: '/user/settings', current: false },
        { name: 'Customization', to: '/user/customization', current: false },

       
      ]
    : [
        { name: 'Login', to: '/login', current: false },
        { name: 'Sign Up', to: '/register', current: false },

      ];
      
    
      

  return (
    <Disclosure as="nav" className="bg-gray-800" >
      <div className="navbar-container">
        <div className="wave-container">
          <div className="wave"></div>
        </div>
        <div className="wave-container">
          <div className="wave"></div>
        </div>
        {/* You can add even more wave layers here */}
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link to="/" className="flex items-center">
                  <video
                    src="/Logo.mp4"
                    className="h-10 w-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <span className="ml-2 font-bold text-white">Fitness-App</span> {/* Add your app name */}
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block navbar hover:animate-shake"> {/* Ensured 'navbar' class is here */}
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={onToggleTheme}
                className="ml-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {/* Conditionally render sun or moon icon based on theme */}
                {theme === 'dark' ? (
                  <SunIcon className="size-6" aria-hidden="true" />
                ) : (
                  <MoonIcon className="size-6" aria-hidden="true" />
                )}
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="user logo"
                      src={userLogo}
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <Link
                        to={item.to}
                        className={classNames(
                          'block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                        )}
                      >
                        {item.name}
                      </Link>
                    </MenuItem>
                  ))}
                  {/* You can add other profile related menu items here if needed */}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div> {/* Closing the navbar-container div */}

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {[navigation, userNavigation].map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.to}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}