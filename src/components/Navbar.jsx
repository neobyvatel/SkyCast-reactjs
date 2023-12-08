import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="fixed top-0 z-50 w-full text-gray-700 shadow-sm  dark:text-gray-200">
      <div className="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <a
            href="#"
            className="focus:shadow-outline flex items-center justify-center gap-1 rounded-lg uppercase tracking-widest text-gray-900 focus:outline-none dark:text-white"
          >
            SkyCast
          </a>
          <button
            className="focus:shadow-outline rounded-lg focus:outline-none md:hidden"
            onClick={handleToggle}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`${
            open ? "flex" : "hidden"
          } flex-grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0`}
        >
          {/* <a
            className="focus:shadow-outline mt-2 rounded-lg px-4 py-2 text-sm text-gray-900 transition-all hover:bg-gray-200  hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:ml-4 md:mt-0"
            href=""
          >
            Weather
          </a>
          <a
            href="#"
            className="focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm transition-all hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:ml-4 md:mt-0"
          >
            Profile
          </a>
          <a
            href="#"
            className="focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm transition-all hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:ml-4 md:mt-0"
          >
            About
          </a> */}
        </nav>
      </div>
    </div>
  );
};

export default Header;
