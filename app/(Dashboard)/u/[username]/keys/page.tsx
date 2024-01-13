import { UrlCard } from "@/app/_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamUserId } from "@/lib/stream-service";
import { Stream } from "stream";
import { KeyCard } from "@/app/_components/key-card";
import { ConnectModal } from "@/app/_components/connect-modal";
const KeysPage = async() => {
    const self = await getSelf();
    const stream = await getStreamUserId(self.id);
    if(!stream){
        throw new Error("Stream not found");
    }
    return ( 
        <div>
            <div className="card-title justify-between">
            Keys & Urls
            <ConnectModal/>
            </div>
            <UrlCard value={stream.serverUrl}/>
            <KeyCard value={stream.streamKey}/>
        </div>
     );
}
 
export default KeysPage;