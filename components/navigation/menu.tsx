import { Menu } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavigationLinks = [
  { name: "Home", href: "/" },
  { name: "Earn", href: "/earn" },
  { name: "Rewards", href: "/rewards" },
  { name: "Profile", href: "/profile" },
] as const;

function NavigationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {NavigationLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href}>{link.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { NavigationMenu };
