import { RiStockLine } from "react-icons/ri";
import { Link } from "wouter";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex cursor-pointer select-none items-center gap-1 stroke-2 font-bold text-primary ~text-2xl/3xl"
    >
      <RiStockLine />
      <p>investify</p>
    </Link>
  );
}
