"use client"
import { CreateOrganization } from "@clerk/nextjs";
import { List } from "./_components/list";
const BoardPage = () => {

    return (
        <div>
        <button className="btn" onClick={()=>document.getElementById('new_board').showModal()}>Add New</button>
        <dialog id="new_board" className="modal">
            <CreateOrganization />
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
        <List/>
        </div>
   
    );
}

export default BoardPage;