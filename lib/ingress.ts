"use server";
import{RoomServiceClient,
    IngressInput
} from "livekit-server-sdk"
const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,

);
export const creatIngress = async(ingressType: IngressInput) =>{

}