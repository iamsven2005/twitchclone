"use client";

import { toast } from "sonner";
import { useState, useTransition, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Image from "next/image";
import { updateStream } from "@/lib/stream";
import { UploadDropzone } from "@/lib/uploadthing";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl
}: InfoModalProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const openModal = () => {
    const infoModal = document.getElementById('infomodal') as HTMLDialogElement | null;
    if (infoModal) {
      infoModal.showModal();
    }
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"))
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };


  return (
    <div>
      <button className="btn btn-link" onClick={openModal}>
        Edit
      </button>
      <dialog id="infomodal" className="modal">
      <div className="modal-box">
            <h3 className="font-bold text-lg">
            Edit stream info
            </h3>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <label>Name</label>
            <input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <label>Thumbnail</label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <div className="tooltip tooltip-left" data-tip="Remove thumbnail">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF"
                    },
                    allowedContent: {
                      color: "#FFFFFF"
                    }
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
            <button
              disabled={isPending}
              className="btn"
              type="submit">
              Save
            </button>
          </div>
        </form>
        </div>
      </dialog>
    </div>
  );
};