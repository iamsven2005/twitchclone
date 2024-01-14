"use client";

import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";
import { OfflineVideo } from "./offline-video";
import { LiveVideo } from "./livevideo";

interface Videoprops {
    hostName: string;
    hostIdentity: string;

};
export const Video = ({
    hostName,
    hostIdentity,
}:Videoprops) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);
    let content;
    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName}/>;
    } 
    else if (!participant || tracks.length === 0) {
         content = <span className="loading loading-spinner loading-lg"></span>
    } 
    else {
        content = <LiveVideo participant={participant}/>
    }
return(
    <div  className="hero-content text-center aspect-video border-b group relative">
        {content}
    </div>
)
}