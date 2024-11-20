interface Client {
    id: string;
    username: string;
}

export interface Player {
    client: Client;
    totalValue: number;
}