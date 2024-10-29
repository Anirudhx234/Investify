export default function DataTable({ data }: { data: object }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="px-4">Attribute</th>
            <th className="px-8">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([attr, meta]) => (
            <tr key={attr}>
              <th className="capitalize align-top">{attr.split("_").join(" ")}</th>
              <td>
                {(() => {
                  if (typeof meta === "object")
                    return <DataTable data={meta} />;
                  if (typeof meta === "boolean")
                    return <p className="px-4">{meta ? "Yes" : "No"}</p>;

                  return <p className="px-4">{meta}</p>;
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
