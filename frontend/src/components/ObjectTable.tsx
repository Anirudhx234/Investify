import { formatNumber } from "../util/formatNumber";
import { twMerge } from "../util/twMerge";

export function ObjectTable({
  data,
  className,
}: {
  data: object | [string, unknown][];
  className?: string | undefined;
}) {
  let entries: [string, unknown][];
  if (Array.isArray(data)) entries = data;
  else entries = Object.entries(data);

  return (
    <table
      className={twMerge(
        "table table-zebra-zebra border-2 border-neutral",
        className,
      )}
    >
      <thead>
        <tr>
          <th className="text-center w-1/2">Attribute</th>
          <th className="text-center w-1/2">Value</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([attr, val]) => (
          <tr key={attr}>
            <th className="text-center align-top capitalize w-1/2">
              {attr.split("_").join(" ")}
            </th>
            <td className="text-center w-1/2">
              <ObjectTableEntry attr={attr} val={val} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ObjectTableEntry({
  attr,
  val,
}: {
  attr: string;
  val: unknown;
}) {
  if (val === null || val === undefined) return <></>;

  if (typeof val === "object") return <ObjectTable data={val} />;

  if (typeof val === "boolean") return <p>{val ? "Yes" : "No"}</p>;

  if (attr.includes("time") && typeof val === "number") {
    const isMilliseconds = val.toString().length === 13;
    const date = new Date(isMilliseconds ? val : val * 1000);
    return <p>{`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}</p>;
  } else if (attr.includes("time") && typeof val === "string")
    return <p>{val}</p>;

  const percent = attr.includes("percent") ? "%" : "";
  if (typeof val === "number") return <p>{formatNumber(val)}{percent}</p>;
  if (typeof val === "string" && !isNaN(parseFloat(val)))
    return <p>{formatNumber(parseFloat(val))}{percent}</p>;

  if (typeof val === "string") return <p>{val}</p>;

  return <></>;
}
