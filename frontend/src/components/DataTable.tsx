export default function DataTable({ data }: { data: object }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th className="px-4">Attribute</th>
            <th className="px-4">MetaData</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([attr, meta]) => (
            <tr key={attr}>
              <th>{attr.replace("_", " ")}</th>
              <td>
                {(() => {
                  if (typeof meta === "object")
                    return <DataTable data={meta} />;
                  if (typeof meta === "boolean")
                    return <span className="px-4">{meta ? "Yes" : "No"}</span>;

                  return <span className="px-4">{meta}</span>;
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
