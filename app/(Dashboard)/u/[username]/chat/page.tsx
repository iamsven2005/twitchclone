import { getSelf } from "@/lib/auth-service";
import { getStreamUserId } from "@/lib/stream-service";
import { ToggleCard } from "@/app/_components/toggle-card";
const ChatPage = async() => {
    const self = await getSelf();
    const stream = await getStreamUserId(self.id);

    return (
            <div className="card-body">
                <h1 className="card-title">
                    Chat Settings
                </h1>
                {stream === null || stream === undefined ? (
                    <div className="justify-center">Stream not started</div>
                ) : (
                <div className="form-control">
                <ToggleCard 
                field="isChatEnabled"
                label="Enable Chat"
                value={stream.isChatEnabled}
                />
                <ToggleCard 
                field="isChatDelayed"
                label="Delay Chat"
                value={stream.isChatDelayed}
                />                
                <ToggleCard 
                field="isChatFollowersOnly"
                label="Follow to chat"
                value={stream.isChatFollowersOnly}
                />
                </div>)}
            </div>
    );
}

export default ChatPage;