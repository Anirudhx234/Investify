import React, { useEffect, useState } from "react";
import HeatMapGrid from "react-heatmap-grid";
import { useAppSelector } from "../hooks/useAppSelector";

type AssetHeatMapData = {
    [asset: string]: number;
};

export default function AssetHeatMap() {
    const [heatMapData, setHeatMapData] = useState<AssetHeatMapData>({});
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        async function fetchHeatMapData() {
            try {
                const response = await fetch("/api/asset-values");
                const data: AssetHeatMapData = await response.json();
                setHeatMapData(data);
            } catch (error) {
                console.error("Error fetching heat map data", error);
            }
        }
        if (isAuthenticated) {
            fetchHeatMapData();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <p>Please log in to view asset values.</p>;
    }

    const assetNames = Object.keys(heatMapData);
    const values = Object.values(heatMapData);

    const xLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const yLabels = assetNames;

    const data = yLabels.map((_, y) =>
        Array.from({ length: xLabels.length }, (_, x) => values[y])
    );

    return (
        <div className="heatmap-container">
            <h1 className="text-center font-bold ~text-2xl/3xl">Asset Value Heat Map</h1>
            <HeatMapGrid
                xLabels={xLabels}
                yLabels={yLabels}
                data={data}
                cellRender={(value) => `${value}`}
                cellStyle={(x, y, ratio) => ({
                    background: `rgb(255, 0, 0, ${ratio})`,
                    fontSize: "1rem",
                    color: "white",
                })}
            />
        </div>
    );
}
