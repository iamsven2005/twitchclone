"use client"
import { CreateOrganization } from "@clerk/nextjs";
import { List } from "./list"; 
import React from "react";
import { Navbar } from "./navbar"; 

const BoardPage: React.FC = () => {
    const openModal = () => {
        const dialogElement = document.getElementById('new_board') as HTMLDialogElement | null;
        if (dialogElement) {
            dialogElement.showModal();
        }
    };

    const closeModal = () => {
        const dialogElement = document.getElementById('new_board') as HTMLDialogElement | null;
        if (dialogElement) {
            dialogElement.close();
        }
    };

    return (
        <div>
            <Navbar/>
            <button className="btn" onClick={openModal}>Open Modal</button>
            <dialog id="new_board" className="modal">
                <CreateOrganization />
                <form method="dialog">
                    <button className="btn" onClick={closeModal}>Close</button>
                </form>
            </dialog>

            <List />
        </div>
    );
}

export default BoardPage;

