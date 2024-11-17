import { FaCheck } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

export function RequestResult({
  status,
  caption,
}: {
  status: "loading" | "success" | "error";
  caption: string | null;
}) {
  if (status === "error") {
    return (
      <div className="flex items-center gap-1 text-error">
        <MdErrorOutline />
        <span>{caption}</span>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-warning">
        <span className="loading loading-spinner"></span>
        <span>{caption}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-success">
      <FaCheck />
      <span>{caption}</span>
    </div>
  );
}

export function RequestResultNoCaption({
  status,
}: {
  status: "loading" | "success" | "error";
}) {
  if (status === "error") return <MdErrorOutline className="text-error" />;
  
  if (status === "loading")
    return <span className="loading loading-spinner text-warning"></span>;

  return <FaCheck className="text-success" />;
}
