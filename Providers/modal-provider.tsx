"use client";

import { useEffect, useState } from "react";

import { RenameModal } from "@/app/_components/modals/rename-modal";
import { StoreModal } from "@/app/_components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <RenameModal />
      <StoreModal />

    </>
  );
};