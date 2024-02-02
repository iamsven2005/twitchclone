"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "../actions/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="navbar bg-slate-100">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <a className={`btn btn-link ${route.active ? 'active' : ''}`}>
            {route.label}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
