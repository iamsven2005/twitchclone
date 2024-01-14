import { useEffect, useState } from "react"
import { toast } from "sonner";
import { createViewerToken } from "@/lib/token";
import {jwtDecode, JwtPayload} from "jwt-decode"
export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setname] = useState("");
    const [identity, setidentity] = useState("");
    useEffect(()=> {
        const createToken = async () => {
            try{
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);
                const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string}
                const name = decodedToken?.name;
                const identity = decodedToken.jti;
                if (identity){
                    setidentity(identity);
                }
                if (name){
                    setname(name);
                }
            }catch{
                toast.error("Token unavailable")
            };
        };
        createToken();
    }, [hostIdentity]);
    return {
        token,
        name,
        identity,
    };
};