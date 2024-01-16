import { create } from "zustand";

interface SideBarStore{
    varient: ChatVariant;
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVarient: (varient: ChatVariant) => void;
};
export const useSidebar = create<SideBarStore>((set)=> ({
    varient: ChatVariant.CHAT,
    collapsed: false,
    onExpand: () => set(()=> ({ collapsed: false})),
    onCollapse: () => set(()=> ({ collapsed: true})),
    onChangeVarient: (varient: ChatVariant) => set(() => ({varient})),
}));

export enum ChatVariant {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY"
};