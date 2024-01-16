"use client";

import { creatIngress } from "@/lib/ingress";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { useState, ChangeEvent, useTransition, useRef, ElementRef } from "react";
import { toast } from "sonner";
const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);
type IngressType = typeof RTMP | typeof WHIP;
export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP)
  const handleIngressTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIngressType(event.target.value);
  };
  const [isPending, startTransition] = useTransition();
  const showModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const onSubmit = () => {
    startTransition(() => {
      creatIngress(parseInt(ingressType))
      .then(()=> {
          toast.success("Ingress created")
          closeRef?.current?.click();})
      .catch(()=> toast.error("Ingress Error"))
    })
  }
  return (
    <div>
      <button className="btn" onClick={showModal}>
        Generate Connection
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        <div role="alert" className="alert alert-warning">
        <AlertTriangle/>
        <span>Warning: This action will reset all active streams using the current connection</span><br/>
        </div>
        <div className="card-actions modal-action">
        <select
        disabled={isPending}
        value={ingressType}
        onChange={handleIngressTypeChange}
        className="select w-full max-w-xs">
        <option disabled selected>Pick Ingress</option>
        <option value={RTMP}>RTMP</option>
        <option value={WHIP}>WHIP</option>
        </select>
            <button disabled={isPending}onClick={onSubmit}className="btn btn-primary">Generate</button>
            <form method="dialog">
                <button className="btn" ref={closeRef}>Cancel</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  );
};
