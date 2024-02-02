"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "../actions/types";
import NavbarActions from "./navbar-actions";

interface MainNavProps {
  data: Category[];
  store: string;
}

const MainNav: React.FC<MainNavProps> = ({ data,store }) => {
  const pathname = usePathname();
  
  const routes = data.map((route) => ({
    href: `${store}/category/${route.id}`,
    label: route.name,
    active: pathname === `${store}/category/${route.id}`,
  }));

  return (
    <nav className="navbar bg-slate-100">
      <NavbarActions/>

      {routes.map((route) => (
        <Link 
        key={route.href} 
        href={route.href}
        className={`btn btn-link ${route.active ? 'active' : ''}`}>
            {route.label}
        </Link>
      ))}

    </nav>
  );
};

export default MainNav;
