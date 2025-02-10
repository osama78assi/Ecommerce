import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import HeaderTag from "../ui/HeaderTag";
import VideoContainer from "./VideoContainer";

function Video() {
  const { t, i18n } = useTranslation();
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const videosCount = useRef(4);
  const shownVideos = useRef(null);
  const videosLeft = useRef(null);
  const videoWidth = "310px";
  const gapping = "10px";
  const padding = "10px";

  function getVisibleWidth() {
    const bounding = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Calculate visible width
    const visibleWidth = Math.max(
      0,
      Math.min(bounding.right, viewportWidth) - Math.max(bounding.left, 0)
    );

    return visibleWidth;
  }

  function slideRight() {
    if (containerRef.current) {
      // When there is one element left add padding
      if (videosLeft.current === 1) {
        setTranslateX(
          // (val) =>  val - (Number.parseInt(videoWidth) + Number.parseInt(padding))
          (val) => val - Number.parseInt(videoWidth)
        );

        videosLeft.current -= 1;
        return;
      }
      // Otherwise add the gapping
      if (videosLeft.current > 0) {
        setTranslateX(
          // (val) => val - (Number.parseInt(videoWidth) + Number.parseInt(gapping))
          (val) => val - Number.parseInt(videoWidth)
        );

        videosLeft.current -= 1;
        return;
      }
    }
  }

  function slideLeft() {
    // The total videos 10 and shown 3 and 7 left then 10 - 3 - 7 = 0 there is no videos in the left side
    // total videos 10 and shown 3 and 6 left then 10 - 3 - 6 = 1 = 1 there is one video in the left side
    if (containerRef.current) {
      // When there is one element left add padding
      if (
        videosCount.current - shownVideos.current - videosLeft.current === 1
      ) {
        setTranslateX(
          // (val) => val + (Number.parseInt(videoWidth) + Number.parseInt(padding))
          (val) => val + Number.parseInt(videoWidth)
        );
        videosLeft.current += 1;
        return;
      }
      // Otherwise add the gapping
      else if (
        videosCount.current - shownVideos.current - videosLeft.current !== 0
      ) {
        setTranslateX(
          // (val) => val + (Number.parseInt(videoWidth) + Number.parseInt(gapping))
          (val) => val + Number.parseInt(videoWidth)
        );
        videosLeft.current += 1;
        return;
      }
    }
  }

  // Calculate the videos that able to show in the available screen viewport
  function calcShownLeftVideos() {
    let visible = getVisibleWidth();
    console.log("\n\n########### \nvisible is", visible, "\n\n###########");
    let elements = 0;
    do {
      // When it's not last or first element sub the gap else sub the padding
      // if (elements === 0 || elements === videosCount.current - 1) {
      //   visible -= Number.parseInt(padding);
      // } else {
      //   visible -= Number.parseInt(gapping);
      // }
      elements += 1;

      visible -= Number.parseInt(videoWidth);
    } while (visible >= Number.parseInt(videoWidth));
    console.log(
      "\n\n########### \nvisible after is",
      visible,
      "\n\n###########"
    );
    shownVideos.current = elements;
    videosLeft.current = videosCount.current - shownVideos.current;
    console.log('\n\n########### here ', videosCount.current - shownVideos.current , '\n\n###########')
  }

  // Setting the amount of videos in the screen
  useEffect(() => {
    if (containerRef.current) {
      videosCount.current = [...containerRef.current.children].filter(
        (item) => item.nodeName === "VIDEO"
      ).length;
    }
  }, []);

  // To take the videos count to be able to show
  useEffect(() => {
    if (containerRef.current) {
      calcShownLeftVideos();
    }
  }, []);

  // Fix the apperance of the component
  useEffect(() => {
    function handleResize() {
      // Retranslate the element to calculate the new shown element
      setTranslateX(0);
      // Recalculate the amount of videos that able to show in the screen
      calcShownLeftVideos();
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div dir="ltr">
      <HeaderTag title={t("home.videos")} />

      <div className="relative overflow-hidden">
        <div
          className="absolute left-[5px] top-[50%] translate-y-[-50%] bg-primary-700 rounded-full p-2 cursor-pointer z-[3]"
          role="button"
          onClick={slideLeft}
        >
          <FaArrowLeft className="text-white text-3xl" />
        </div>

        <div
          className={`flex transition-transform justify-between m-auto`}
          ref={containerRef}
          style={{
            transform: `translate(${translateX}px, 0px)`,
            gap: `${gapping}`,
            padding: padding,
            width: `${4 * parseInt(videoWidth)}px`,
          }}
        >
          <VideoContainer
            src={"https://osama78assi.github.io/sakhrasyria/video1.mp4"}
            width={videoWidth}
            height="430px"
          />
          <VideoContainer
            src={"https://osama78assi.github.io/sakhrasyria/video2.mp4"}
            width={videoWidth}
            height="430px"
          />
          <VideoContainer
            src={"https://osama78assi.github.io/sakhrasyria/video3.mp4"}
            width={videoWidth}
            height="430px"
          />
          <VideoContainer
            src={"https://osama78assi.github.io/sakhrasyria/video4.mp4"}
            width={videoWidth}
            height="430px"
          />
        </div>

        <div
          className="absolute right-[5px] top-[50%] translate-y-[-50%] bg-primary-700 rounded-full p-2 cursor-pointer z-[3]"
          role="button"
          onClick={slideRight}
        >
          <FaArrowRight className="text-white text-3xl" />
        </div>
      </div>
    </div>
  );
}

export default Video;
