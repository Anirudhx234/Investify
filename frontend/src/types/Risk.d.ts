declare namespace Risk {
    interface RiskPoint {
        name: string;
        risk: number; // X-axis (risk level)
        return: number; // Y-axis (return level)
    }
}