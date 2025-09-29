import { useAppDispatch, useAppSelector } from "@/app/hooks/redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { selectAuthUser } from "@/features/auth/slice";
import { markAsSeenMany, type UserNotification } from "@/features/notification";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { getListNotificationThunk, setUnseenCount } from "@/features/notification/slice";
import { timeAgo } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();
  const { items } = useNotification();
  const { countUnseen } = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectAuthUser)?.id;
  const [paginationParams] = useState<object>({
    page: 1,
    pageSize: 20,
    sortBy: "createdAt",
  });

  useEffect(() => {
    if (!userId) return;
    dispatch(
      getListNotificationThunk({
        userId,
        params: paginationParams,
      }),
    );
  }, [dispatch, paginationParams, userId]);

  useEffect(() => {
    if (items.length > 0) {
      const itemsUnSeen = items.filter((i) => i.isSeen == false).map((i) => i.id);
      if (itemsUnSeen.length > 0) {
        markAsSeenMany(itemsUnSeen)
          .then(() => {
            dispatch(setUnseenCount(countUnseen - itemsUnSeen.length));
          })
          .catch((err) => console.log(err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, paginationParams]);

  return (
    <div className="flex flex-col items-center gap-3 px-2 sm:px-0">
      <span className="font-semibold">Activities</span>
      <Card className="flex flex-col w-full md:w-[80%] lg:w-[45%] h-full">
        {items.map((n: UserNotification) => (
          <div
            className={`flex justify-between w-full cursor-pointer py-3 gap-2 ${!n.isSeen ? "bg-gray-200" : ""}`}
            onClick={() => {
              if (n.postId) {
                // markAsRead notification before redirect
                navigate(`posts/${n.postId}`);
              }
            }}
          >
            <div className="*:data-[slot=avatar]:ring-background min-w-[60px] flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale pl-6">
              {n.actors.length > 1 ? (
                <>
                  <Avatar key={n.actors[0].userId}>
                    <AvatarImage src={n.actors[0].avatarUrl} alt={n.actors[0].fullName} />
                    <AvatarFallback>{n.actors[0].fullName[0]}</AvatarFallback>
                  </Avatar>
                  <Avatar key="n">
                    <AvatarFallback>+{n.actors.length - 1}</AvatarFallback>
                  </Avatar>
                </>
              ) : (
                n.actors.map((actor) => (
                  <Avatar key={actor.userId}>
                    <AvatarImage src={actor.avatarUrl} alt={actor.fullName} />
                    <AvatarFallback>{actor.fullName[0]}</AvatarFallback>
                  </Avatar>
                ))
              )}
            </div>
            <div className="pl-2 w-full flex flex-col border-b-[1px] pb-2">
              <span>
                {n.title}{" "}
                {n.createdAt ? <span className="text-gray-400">{timeAgo(n.createdAt)}</span> : null}
              </span>
              <span>{n.message}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default NotificationPage;
