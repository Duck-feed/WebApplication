import { useEffect, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch } from "@/app/store";
import { getSignalRConnection, initSignalRConnection } from "@/lib/signalR";
import { countUnseenNotificationThunk } from "../slice";
import type { UserNotification } from "../types";

const hubKey = "ReceiveNotification";

export const useSignalR = (userId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<HubConnection | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const start = async () => {
      const conn = await initSignalRConnection(userId);
      if (conn.state === "Connected") {
        setIsConnected(true);
        setConnectionState(conn);
      }
    };

    start();
  }, [userId]);

  useEffect(() => {
    if (userId && connectionState && isConnected)
      connectionState.on(hubKey, async (res: UserNotification) => {
        console.log(res);
        dispatch(countUnseenNotificationThunk(userId));
        toast.info(res.title);
      });

    return () => {
      connectionState?.off(hubKey);
    };
  }, [dispatch, connectionState, isConnected, userId]);

  return { connection: getSignalRConnection(), isConnected };
};
