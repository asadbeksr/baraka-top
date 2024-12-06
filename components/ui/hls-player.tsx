"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { env } from "@/env.mjs";

interface HLSPlayerProps {
  camera?: string;
  className?: string;
}

const HLSPlayer = ({ 
  camera,
  className 
}: HLSPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!camera) return;

    const src = `${env.NEXT_PUBLIC_RTSP_STREAM_URL}/stream/${camera}/channel/0/hlsll/live/index.m3u8`;
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          debug: false,
          lowLatencyMode: true,
          backBufferLength: 30,
          liveBackBufferLength: 0,
          liveSyncDurationCount: 3,
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch((error) => {
            console.log("Playback failed:", error);
          });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.log('HLS error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Network error, trying to recover...');
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Media error, trying to recover...');
                hls?.recoverMediaError();
                break;
              default:
                console.log('Unrecoverable error');
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch((error) => {
            console.log("Playback failed:", error);
          });
        });
      }
    };

    initPlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [camera, videoRef]);

  if (!camera) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      playsInline
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default HLSPlayer;
