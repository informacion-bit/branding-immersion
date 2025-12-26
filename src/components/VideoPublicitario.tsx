"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Video() {
  const t = useTranslations("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const seekVideo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-slate-50 text-4xl text-center">{t("title")}</h2>

      <div className="relative w-full h-[80vh] bg-black mt-8">
        <video
          ref={videoRef}
          className="h-full w-full rounded-lg"
          controls
          autoPlay
          loop
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/immersion-005-7e407.appspot.com/o/imagenesImmersion%2FIMMERSION%20Video%20de%20clientes%20-%20Horizontal.mp4?alt=media&token=27638f36-fbb9-47ad-9f2c-6a4d7586ed77"
            type="video/mp4"
          />
        </video>

        <div className="absolute bottom-4 left-4 flex gap-4">
          <button
            onClick={toggleMute}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Toggle Mute
          </button>
          <button
            onClick={() => seekVideo(-10)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            -10s
          </button>
          <button
            onClick={() => seekVideo(10)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            +10s
          </button>
        </div>
      </div>
    </div>
  );
}