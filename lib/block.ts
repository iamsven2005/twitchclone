"use server";

import { revalidatePath } from "next/cache";
import { RoomServiceClient } from "livekit-server-sdk";
import { getSelf } from "@/lib/auth-service";
import { BlockUser, unBlockUser } from "./block-service";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;

  try {
    const reason = "Blocked during stream"
    blockedUser = await BlockUser(id, reason);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unBlockUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
};