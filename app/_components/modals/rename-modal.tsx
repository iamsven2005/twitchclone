"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRenameModal } from "./use-rename-modal"; 
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api"; 

export const RenameModal = () => {
  const { 
    mutate, 
    pending
  } = useApiMutation(api.board.update);

  const {
    isOpen,
    onClose,
    initialValues,
  } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e,
  ) => {
    e.preventDefault();

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch(() => toast.error("Failed to rename board"));
  };

  return (
    <dialog id="rename_modal" className="modal">
      <div className="modal-box">
      <h3 className="font-bold text-lg">Edit board title</h3>
      <p className="py-4">Enter a new title for this board</p>

            <div className="modal-action">
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
            <form onSubmit={onSubmit} className="space-y-4">
          <input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
            className="input"
          />
            <button disabled={pending} type="submit">
              Save
            </button>
            </form>
            </div>
      </div>
    </dialog>
  );
};