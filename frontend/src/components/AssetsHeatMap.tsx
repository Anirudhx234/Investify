import { useAssetsDataQuery } from "../api/assets";
import { HeatMapGrid } from "react-heatmap-grid";

export default function AssetsHeatMap() {
    const { isLoading, data, isError, error } = useAssetsDataQuery();
    const errorMssg = error?.message;

    if (isLoading) return <h2>Loading Data...</h2>;
    if (isError) return <h2 className="text-error">{errorMssg}</h2>;

    const assetValues = data.map((asset) => asset.value);
    const assetNames = data.map((asset) => asset.name);

    return (
        <div className="heatmap-container">
            <h2>Asset Value Heatmap</h2>
            <HeatMapGrid
                data={assetValues}
                xLabels={assetNames}
                yLabels={["Values"]}
                cellRender={(x, y, value) => <span>{value}</span>}
                cellStyle={(x, y, ratio) => ({
                    background: `rgba(255, 0, 0, ${ratio})`,
                    color: "#000",
                })}
                xLabelWidth={60}
                yLabelWidth={60}
            />
        </div>
    );
}