import { WifiOff } from "lucide-react";

interface OfflineVidProps {
    username: string;
};
export const OfflineVideo = ({
    username,
}:OfflineVidProps) => {
    return(
        <div className="card-body neutral flex justify-center flex-col items-center">
        <WifiOff className="h-10 w-10"/>
        {username} is offline
        </div>
    )
}