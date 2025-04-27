'use client';
import { useInView } from "../Providers/NavigationProvider";

export default function Navlinks({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const navItems = ["about", "experience", "projects", "posts"];
  const { inView, setInView } = useInView();

  return (
    <nav {...props} className={`text-end ${className}`}>
      <ul className="flex justify-end items-center">
        {navItems.map((item, index) => (
          <li key={index}>
            {index > 0 && <span className="mx-1.5 text-sm select-none">•</span>}
            {item === "posts" ? (
              <p
                className={`hover:scale-105 hover:font-bold hover:text-zinc-500 dark:hover:text-slate-300! transition-transform duration-300 ease-in-out inline-block ${
                  inView === item
                    ? "scale-105 font-bold text-zinc-500 dark:text-slate-300!"
                    : ""
                }`}
              >
                {item}
              </p>
            ) : (
              <a href={`#${item}`}>
                <p
                  className={`hover:scale-105 hover:font-bold hover:text-zinc-500 dark:hover:text-slate-300! transition-transform duration-300 ease-in-out inline-block ${
                    inView === item
                      ? "scale-105 font-bold text-zinc-500 dark:text-slate-300!"
                      : ""
                  }`}
                >
                  {item}
                </p>
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
