export default function formatVolume(volume: number): string {
    if (volume >= 1_000_000) {
        return (volume / 1_000_000).toFixed(2) + 'M';
    } else if (volume >= 1_000) {
        return (volume / 1_000).toFixed(2) + 'K';
    } else {
        return volume.toString();
    }
}