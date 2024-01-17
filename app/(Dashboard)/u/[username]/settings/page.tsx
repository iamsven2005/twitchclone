import { getSelf } from "@/lib/auth-service";
import { Input } from "./gg"; 
import { getUserByid } from "@/lib/user-service";
const ChatPage = async() => {
    const self = await getSelf();
    const stream = await getUserByid(self.id);

    return (
            <div className="card-body">
                <h1 className="card-title">
                    Theme Settings
                </h1>
                {stream === null || stream === undefined ? (
                    <div className="justify-center">Theme not found</div>
                ) : (
                <div className="form-control">
                <Input
                string={stream.theme}
                />

                </div>)}
            </div>
    );
}

export default ChatPage;