import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useLazyloadingImgs } from "../../hooks/useLazyLoadingImages";
import HeaderCard from "./HeaderCard";

function HeaderSlider() {
  const { i18n } = useTranslation();
  const [showArrows, setShowArrows] = useState(false);
  const cooldown = useRef(false);
  const cardsRefs = useRef([]);
  const getElement = useCallback((ele) => cardsRefs.current.push(ele), []);

  const [data, setData] = useState(() => [
    {
      title: "Subscribe",
      imgUrl: "/slider-1.jpg",
      content:
        "asdf asf agf qpojrgadpfs gjapsodifj apfdgh apsd jfapdoifgj apsdo fjadfogp jp hqwaer9 hsdpofias jgpoafds gqparg adsf gqerp adsfdgakjdfg padf gpart pugafdsjga;psdf jqaprg jpaodfgj asdkl jafbn adf;gno;pxvjapodifjs kla gjpifdshg asdfg pagadfgadfgerdadfg ",
    },
    {
      title: "Like Us",
      imgUrl: "/slider-2.jpg",
      content:
        "asdf asd gafdiodfg houhyoidsfu alkjgh lqupiwh adsl;fja;slj fg;afgj a;ldfgj aosig l;fg had;foqgi ;j adslk jfa;lk gdafgh wiah adsf hdjkalg hadfg uhair ghadkgh aslg hafdkgh rakjlfgh aoigh adfgh adug adfklg hadfklgj hadfr g kjfadhgauifdhs gakldjfgh ka;jdgh akg adfg",
    },
    {
      title: "LOL You Are Here ?",
      imgUrl: "/slider-3.jpg",
      content:
        "asdf adf'g ajds goaks gop[gfdsiojg apo rgpaldf;gjasp;djf ;aslkdfj asoipdjfarehg afdl;gjasd;lkfgj adfgadlfg;ja;sdlfgj adflg aisdfrgjaoigj afldsgjaosidfgjaogjraf adfoig jadfg adfgoiajsgl;k fdjgaosidfgj alkdfgj aoperhj alrfgjadofpigj adoifg adfiogad jfl;gjfd apfog hafdlg haofd gadf ",
    },
  ]);
  const [curChild, setCurChild] = useState(data.length - 1);
  const images = useLazyloadingImgs(data.map((ele) => ele.imgUrl));
  const prevChild = curChild === 0 ? data.length - 1 : curChild - 1;
  const nextChild = curChild === data.length - 1 ? 0 : curChild + 1;
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   cardsRefs.current.forEach((ele) => {
  //     ele.current.classList.remove(
  //       "!-left-[100%]",
  //       "z-slide--1",
  //       "!left-[100%]"
  //     );
  //   });
  //   setCurChild(data.length - 1);
  // }, [data]);

  async function fetchSliderData() {}

  useEffect(() => {
    setIsLoading(true);
    fetchSliderData();
    setIsLoading(false);
  }, []);

  const slideRight = useCallback(
    function slideRight() {
      console.log("I'm the right");
      if (!cooldown.current) {
        cooldown.current = true;
        // Take all cards except current one to the left, Hide every element excpect the target and current one
        cardsRefs.current.forEach((ele, index) => {
          // If the class was rihg make it middle first
          ele.current.classList.remove("!-left-[100%]");

          if (index !== curChild && index !== nextChild) {
            ele.current.classList.add("z-slide--1");
          }
          if (index !== curChild) {
            ele.current.classList.add("!left-[100%]");
          }
          if (index === nextChild) {
            ele.current.classList.remove("z-slide--1");
          }
        });

        // Take both target and current to the right, current very right. And the target a little
        const curCard = cardsRefs.current[curChild];
        const targetCard = cardsRefs.current[nextChild];

        let timer1 = setTimeout(() => {
          curCard.current.classList.add("!-left-[100%]");
          targetCard.current.classList.remove("!left-[100%]");
          clearTimeout(timer1);
        }, 400);

        let timer = setTimeout(() => {
          // Clear the classes
          cardsRefs.current.forEach((ele, index) => {
            if (index === curChild) {
              ele.current.classList.remove("z-slide--1");
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
      console.log("I'm the left");
      if (!cooldown.current) {
        cooldown.current = true;
        cardsRefs.current.forEach((ele, index) => {
          ele.current.classList.remove("!left-[100%]");
          if (index !== curChild && index !== prevChild) {
            ele.current.classList.add("z-slide--1");
          }
          if (index !== curChild) {
            ele.current.classList.add("!-left-[100%]");
          }
          if (index === prevChild) {
            ele.current.classList.remove("z-slide--1");
          }
        });

        // Take both target and current to the left, current very left. And the target a little
        const curCard = cardsRefs.current[curChild];
        const targetCard = cardsRefs.current[prevChild];

        let timer1 = setTimeout(() => {
          curCard.current.classList.add("!left-[100%]");
          targetCard.current.classList.remove("!-left-[100%]");
          clearTimeout(timer1);
        }, 400);

        let timer = setTimeout(() => {
          // Clear the classes
          cardsRefs.current.forEach((ele, index) => {
            if (index === curChild) {
              ele.current.classList.remove("z-slide--1");
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

  return (
    <div
      className="h-[calc(100dvh-200px)] relative overflow-hidden"
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
              imgUrl={images[index]}
              content={ele?.content ? ele.content : ""}
              title={ele?.title ? ele.title : ""}
              key={ele?.imgUrl}
              getElement={getElement}
            />
          ))}
      </div>
    </div>
  );
}

export default HeaderSlider;
