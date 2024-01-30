"use client";

import { memo } from "react";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@/liveblocks.config";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

export const SelectionTools = memo(({
  camera,
  setLastUsedColor,
}: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection);

  const moveToFront = useMutation((
    { storage }
  ) => {
    const liveLayerIds = storage.get("layerIds");
    const indices: number[] = [];

    const arr = liveLayerIds.toImmutable();

    for (let i = 0; i < arr.length; i++) {
      if (selection.includes(arr[i])) {
        indices.push(i);
      }
    }

    for (let i = indices.length - 1; i >= 0; i--) {
      liveLayerIds.move(
        indices[i],
        arr.length - 1 - (indices.length - 1 - i)
      );
    }
  }, [selection]);

  const moveToBack = useMutation((
    { storage }
  ) => {
    const liveLayerIds = storage.get("layerIds");
    const indices: number[] = [];

    const arr = liveLayerIds.toImmutable();

    for (let i = 0; i < arr.length; i++) {
      if (selection.includes(arr[i])) {
        indices.push(i);
      }
    }

    for (let i = 0; i < indices.length; i++) {
      liveLayerIds.move(indices[i], i);
    }
  }, [selection]);

  const setFill = useMutation((
    { storage },
    fill: Color,
  ) => {
    const liveLayers = storage.get("layers");
    setLastUsedColor(fill);

    selection.forEach((id) => {
      liveLayers.get(id)?.set("fill", fill);
    })
  }, [selection, setLastUsedColor]);

  const deleteLayers = useDeleteLayers();

  const selectionBounds = useSelectionBounds();

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
      }}
    >
      <ColorPicker
        onChange={setFill}
      />
      <div className="flex flex-col gap-y-0.5">
        <div data-tip="Bring to front" className="tooltip">
          <button
            onClick={moveToFront}
            className="btn"
          >
            <BringToFront />
          </button>
        </div>
        <div data-tip="Send to back" className="tooltip tooltip-bottom">
          <button
            onClick={moveToBack}
            className="btn"
          >
            <SendToBack />
          </button>
        </div>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <div data-tip="Delete" className="tooltip">
          <button
            className="btn"
            onClick={deleteLayers}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";