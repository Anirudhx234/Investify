import {Time} from "lightweight-charts";

export default function convertToUnixTimestamp(time: string): Time {
    return (Math.floor(new Date(time).getTime() / 1000)) as Time;
}