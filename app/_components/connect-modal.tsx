"use client";

import { AlertTriangle } from "lucide-react";

export const ConnectModal = () => {
  const showModal = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <button className="btn" onClick={showModal}>
        Generate Connection
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        <div role="alert" className="alert alert-warning">
        <AlertTriangle/>
        <span>Warning: This action will reset all active streams using the current connection</span>
        </div>
        <select className="select w-full max-w-xs">
        <option disabled selected>Pick Ingress</option>
        <option value="RTMP">RTMP</option>
        <option value="WHIP">WHIP</option>
        </select>
            <div className="modal-action">
            <button className="btn btn-primary">Generate</button>
            <form method="dialog">
                <button className="btn">Cancel</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  );
};
