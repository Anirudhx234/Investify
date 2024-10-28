import AssetsHeatMap from "../components/AssetsHeatMap";

export default function HeatMapRoute() {
    return (
        <div className="w-full flex flex-col items-center">
            <h1>Financial Assets Heatmap</h1>
            <AssetsHeatMap />
        </div>
    );
}
