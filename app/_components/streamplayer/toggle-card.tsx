"use client";
import { toast } from "sonner";
import { startTransition, useTransition } from "react";
import { updateStream } from "@/lib/stream";
type FieldTypes= "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface ToggleCardProps {
    label: string;
    value: boolean;
    field: FieldTypes;
}
export const ToggleCard = ({
    label,
    value = false,
    field,
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();
    const onChange = async () => {
    startTransition(()=> {
        updateStream({[field]: !value})
        .then(()=> toast.success("Chat settings updated!"))
        .catch(()=> toast.error("Something Went Wrong (Chat Settings)"))
    })}
    return(
        <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text">{label}</span> 
            <input type="checkbox" className="toggle" checked={value} disabled={isPending} onChange={onChange}/>

        </label>
        </div>

    )
}