"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateUser } from "@/lib/user"; 

interface BioModalProps {
  initialValue: string | null;
};

export const BioModal = ({
  initialValue,
}: BioModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(initialValue || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated");
          closeRef.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  return (
    <div>
        <button className="btn"
         onClick={()=>document.getElementById('bio').showModal()}>
            Edit Bio
        </button>
      <dialog id="bio" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit user bio</h3>

        <form onSubmit={onSubmit}>
          <textarea 
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="textarea textarea-primary"
          />
          <div className="modal-action">
            <form method="dialog">
            <button className="btn">Close</button>
            </form>
            <button
              disabled={isPending}
              type="submit"
              className="btn"
            >
              Save
            </button>
          </div>
        </form>
        </div>
      </dialog>
    </div>
  );
};