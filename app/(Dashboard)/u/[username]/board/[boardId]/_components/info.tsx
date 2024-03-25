"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Actions } from "@/app/_components/actions";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/app/_components/modals/use-rename-modal"; 
import { useUser } from "@clerk/nextjs";

interface InfoProps {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  );
};
export const Info = ({
  boardId,
}: InfoProps) => {
  const { onOpen } = useRenameModal();
  const {user} = useUser();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <div data-tip="Go to boards" className="tooltip tooltip-bottom">
        <button className="btn px-2">
          <Link href={`/u/${user?.username}/board`}>
              Boards
          </Link>
        </button>
      </div>
      <TabSeparator />
      <div data-tip="Edit title" className="tooltip tooltip-bottom">
        <button
          className="btn"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </button>
      </div>
      <TabSeparator />
      <Actions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <div data-tip="Main menu" className="tooltip tooltip-bottom">
            <button className="btn">
              <Menu />
            </button>
          </div>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div 
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
    />
  );
};