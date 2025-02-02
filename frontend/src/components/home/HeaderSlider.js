import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import SummaryApi from "../../common";
import HeaderCard from "./HeaderCard";
import EmptyData from "../ui/EmptyData"

function HeaderSlider({ setErr }) {
  const { t, i18n } = useTranslation();
  const [showArrows, setShowArrows] = useState(false);
  const cooldown = useRef(false);
  const cardsRefs = useRef([]);
  const getElement = useCallback((ele) => cardsRefs.current.push(ele), []);

  const [data, setData] = useState(() => []);
  const [curChild, setCurChild] = useState(data.length - 1);
  const prevChild = curChild === 0 ? data.length - 1 : curChild - 1;
  const nextChild = curChild === data.length - 1 ? 0 : curChild + 1;
  const [isLoading, setIsLoading] = useState(true);

  const fetchSliderData = useCallback(async function fetchSliderData() {
    try {
      setIsLoading(true);

      const req = await fetch(SummaryApi.getSliderData.url, {
        method: SummaryApi.getSliderData.method,
      });

      const res = await req.json();
      if (res.success) {
        setData(res.data);
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      console.log(err.message);
      setErr(true);
      toast.error(t("messages.errGetSlider"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSliderData();
  }, [fetchSliderData]);

  const slideRight = useCallback(
    function slideRight() {
      if (!cooldown?.current) {
        cooldown.current = true;
        // Take all cards except current one to the left, Hide every element excpect the target and current one
        cardsRefs?.current?.forEach((ele, index) => {
          // If the class was rihg make it middle first
          ele?.current?.classList.remove("!-left-[100%]");

          if (index !== curChild && index !== nextChild) {
            ele?.current?.classList.add("z-slide--1");
          }
          if (index !== curChild) {
            ele?.current?.classList.add("!left-[100%]");
          }
          if (index === nextChild) {
            ele?.current?.classList.remove("z-slide--1");
          }
        });

        // Take both target and current to the right, current very right. And the target a little
        const curCard = cardsRefs?.current[curChild];
        const targetCard = cardsRefs?.current[nextChild];

        let timer1 = setTimeout(() => {
          curCard?.current?.classList.add("!-left-[100%]");
          targetCard?.current?.classList.remove("!left-[100%]");
          clearTimeout(timer1);
        }, 400);

        let timer = setTimeout(() => {
          // Clear the classes
          cardsRefs?.current?.forEach((ele, index) => {
            if (index === curChild) {
              ele?.current?.classList.remove("z-slide--1");
            }
          });
          setCurChild(nextChild);
          cooldown.current = false;
          clearTimeout(timer);
        }, 800);
      }
    },
    [curChild, nextChild]
  );

  const slideLeft = useCallback(
    function slideLeft() {
      if (!cooldown?.current) {
        cooldown.current = true;
        cardsRefs?.current.forEach((ele, index) => {
          ele?.current.classList.remove("!left-[100%]");
          if (index !== curChild && index !== prevChild) {
            ele?.current?.classList.add("z-slide--1");
          }
          if (index !== curChild) {
            ele?.current?.classList.add("!-left-[100%]");
          }
          if (index === prevChild) {
            ele?.current?.classList.remove("z-slide--1");
          }
        });

        // Take both target and current to the left, current very left. And the target a little
        const curCard = cardsRefs?.current[curChild];
        const targetCard = cardsRefs?.current[prevChild];

        let timer1 = setTimeout(() => {
          curCard?.current?.classList.add("!left-[100%]");
          targetCard?.current?.classList.remove("!-left-[100%]");
          clearTimeout(timer1);
        }, 400);

        let timer = setTimeout(() => {
          // Clear the classes
          cardsRefs?.current?.forEach((ele, index) => {
            if (index === curChild) {
              ele?.current?.classList.remove("z-slide--1");
            }
          });
          setCurChild(prevChild);
          cooldown.current = false;
          clearTimeout(timer);
        }, 800);
      }
    },
    [curChild, prevChild]
  );

  useEffect(() => {
    const timer = setInterval(slideRight, 5000);

    return () => clearInterval(timer);
  }, [slideRight]);

  if(!isLoading && !data.length) {
    return <EmptyData />
  }

  return (
    <div
      className="h-[calc(100dvh-100px)] relative overflow-hidden"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Arrows */}
      <div
        className={`w-full h-full flex justify-between ${
          showArrows ? "!visible" : ""
        } invisible absolute`}
      >
        <span
          className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer"
          onClick={i18n.language === "ar" ? slideRight : slideLeft}
        >
          {i18n.language === "ar" ? (
            <FaAngleRight className="arr-slider text-lg !color-white" />
          ) : (
            <FaAngleLeft className="arr-slider text-lg !color-white" />
          )}
        </span>
        <span
          className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer"
          onClick={i18n.language === "ar" ? slideLeft : slideRight}
        >
          {i18n.language === "ar" ? (
            <FaAngleLeft className="arr-slider text-lg !color-white" />
          ) : (
            <FaAngleRight className="arr-slider text-lg !color-white" />
          )}
        </span>
      </div>

      {/* Images */}
      <div
        className={`w-full h-full relative ${
          isLoading ? "bg-gray-700 animate-pulse" : ""
        }`}
      >
        {!isLoading &&
          data.map((ele, index) => (
            <HeaderCard
              img={ele?.img}
              description={
                ele?.description &&
                ele.description.filter(
                  (item) => item.language === i18n.language
                )[0].text
              }
              title={
                ele?.title &&
                ele.title.filter((item) => item.language === i18n.language)[0]
                  .text
              }
              key={ele?.img}
              getElement={getElement}
            />
          ))}
      </div>
    </div>
  );
}

export default HeaderSlider;
