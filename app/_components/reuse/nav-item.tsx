"use-client";
import {LucideIcon } from "lucide-react"
interface NavItemsProps {
    icon: LucideIcon;
    label: string;
    href: string;
    isActive: boolean;
};
export const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive,
}: NavItemsProps) => {
    return(
        <li>
        <a href={href}className="btn btn-info btn-outline">
        <span>{label}</span><Icon className="h-4 w-4"/>
        </a>
        </li>

    )
}