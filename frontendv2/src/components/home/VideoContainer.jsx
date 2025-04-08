import { useRef, useState } from "react";

function VideoContainer({ src, width, height, type = "video/mp4" }) {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  function playVideo() {
    if (isReady) {
      videoRef.current.muted = true;
      videoRef.current.play()?.catch((err) => console.log(err.message));
    }
  }

  function pauseVideo() {
    if (isReady) {
      // debounce
      const timer = setTimeout(() => {
        videoRef.current.pause()?.catch((err) => console.log(err.message));
        clearTimeout(timer);
      }, 200);
    }
  }

  return (
    <>
      <video
        className={`object-cover rounded-[20px] ${!isReady ? "hidden" : ""}`}
        ref={videoRef}
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
        autoPlay={false}
        muted="muted"
        onCanPlay={() => {
          setIsReady(true);
        }}
        onClick={(e) => {
          const video = e.target.closest("video");
          video.muted = !video.muted;
        }}
        style={{
          width: width,
          height: height,
        }}
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>

      {!isReady && (
        <div
          className={`w-[310px] flex-shrink-0 h-[430px] bg-gray-500 animate-pulse rounded-[20px]`}
        />
      )}
    </>
  );
}

export default VideoContainer;
