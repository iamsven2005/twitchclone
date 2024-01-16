"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenCrtl } from "./fullscreen";
import {useEventListener} from "usehooks-ts";
import { VolumeCtrl } from "./volume";
interface LiveVideoProps {
    participant: Participant;
};
export const LiveVideo = ({
    participant,
}:LiveVideoProps)=> {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setisFullscreen] = useState(false);
    const [Volume, setVolume] = useState(0);
        const onVolumeChange = (value: number) => {
        setVolume(+value);
        if (videoRef?. current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = value * 0.01;
            }
        };
        const toggleMute = () => {
            const isMuted = Volume === 0;
            setVolume(isMuted ? 50: 0);
            if (videoRef?.current){
                videoRef.current.muted = !isMuted;
                videoRef.current.volume = isMuted ? 0.5 : 0;
            }
        }
        useEffect(()=> {
            onVolumeChange(0);
        }, [])
    const toggleFullscreen = () => {
        if (isFullscreen){
            document.exitFullscreen()
            setisFullscreen(false);

        }
        else if (wrapperRef?.current) {
            wrapperRef.current.requestFullscreen()
            setisFullscreen(true);
        }
    };
    const handleFullscreenChange = () =>{
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setisFullscreen (isCurrentlyFullscreen);
    }
    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track)=> track.participant.identity === participant.identity)
    .forEach((track) =>{
        if (videoRef.current){
            track.publication.track?.attach(videoRef.current)
        }
    });
    return(
        <div ref={wrapperRef}className="card bg-base-100 shadow-xl join-item">
            <video ref={videoRef} width="100%"/>
            <div className="card-actions join join-horizontal">
            <FullscreenCrtl isFullscreen={isFullscreen} onToggle = {toggleFullscreen}/>
            <VolumeCtrl onChange={onVolumeChange} onToggle = {toggleMute} value={Volume}/>
            </div>
        </div>
        
    )
}