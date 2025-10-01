import * as signalR from "@microsoft/signalr";
import { API_BASE_URL } from "@/lib/env";

let connection: signalR.HubConnection | null = null;

export async function initSignalRConnection(userId: string) {
  if (connection) {
    return connection;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}/hub/notifyHub?userId=${userId}`, {
      transport:
        signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
      // accessTokenFactory: () => token || "",
      // withCredentials: true,
    })
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log("Connection status: ", connection?.state);
    console.log("SignalR connected with userId:", userId);
  } catch (err) {
    console.error("SignalR Connection Error:", err);
  }

  return connection;
}

export const getSignalRConnection = () => connection;
