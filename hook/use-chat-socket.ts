import { useSocket } from "@/components/providers/socket-provider";
import { Message, Profile, Member } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
  addkey: string;
  updatekey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addkey,
  updatekey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();

  const queryClient = useQueryClient();
  console.log(queryKey, addkey, updatekey);

  useEffect(() => {
    if (!socket) return;

    socket.on(updatekey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }
        console.log(oldData);
        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addkey, (message: MessageWithMemberWithProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ items: [message] }],
          };
        }
        console.log(oldData);
        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [message, ...newData[0].items],
        };
        return {
          ...oldData,
          pages: newData,
        };
      });
    });
    return () => {
      socket.off(updatekey);
      socket.off(addkey);
    }
  }, [socket, queryClient, addkey, updatekey, queryKey]);
};
