import { MdErrorOutline } from "react-icons/md";

export default function NotFoundPage() {
  return (
    <div className="flex items-center gap-1 text-lg text-error">
      <MdErrorOutline />
      <p className="font-bold">404</p>
      <p>Page Not Found</p>
    </div>
  );
}
