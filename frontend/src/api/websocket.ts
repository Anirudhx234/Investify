/* functions related to websockets */

export function createWebSocket({ url }: { url: string }) {
  return new WebSocket(`ws://localhost:8080${url}`);
}
