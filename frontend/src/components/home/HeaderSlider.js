import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import image1 from "../../assest/banner/img1.webp";
import image2 from "../../assest/banner/img2.webp";
import image3 from "../../assest/banner/img3.jpg";
import image4 from "../../assest/banner/img4.jpg";
import HeaderCard from "./HeaderCard";

function HeaderSlider() {
  const [showArrows, setShowArrows] = useState(false);
  const cooldown = useRef(false);
  const cardsRefs = useRef([]);


  const cards = [
    {
      imgUrl: image1,
      content:
        "asdf asf agf qpojrgadpfs gjapsodifj apfdgh apsd jfapdoifgj apsdo fjadfogp jp hqwaer9 hsdpofias jgpoafds gqparg adsf gqerp adsfdgakjdfg padf gpart pugafdsjga;psdf jqaprg jpaodfgj asdkl jafbn adf;gno;pxvjapodifjs kla gjpifdshg asdfg pagadfgadfgerdadfg ",
    },
    {
      imgUrl: image2,
      content:
        "asdf asd gafdiodfg houhyoidsfu alkjgh lqupiwh adsl;fja;slj fg;afgj a;ldfgj aosig l;fg had;foqgi ;j adslk jfa;lk gdafgh wiah adsf hdjkalg hadfg uhair ghadkgh aslg hafdkgh rakjlfgh aoigh adfgh adug adfklg hadfklgj hadfr g kjfadhgauifdhs gakldjfgh ka;jdgh akg adfg",
    },
    {
      imgUrl: image3,
      content:
        "asdf adf'g ajds goaks gop[gfdsiojg apo rgpaldf;gjasp;djf ;aslkdfj asoipdjfarehg afdl;gjasd;lkfgj adfgadlfg;ja;sdlfgj adflg aisdfrgjaoigj afldsgjaosidfgjaogjraf adfoig jadfg adfgoiajsgl;k fdjgaosidfgj alkdfgj aoperhj alrfgjadofpigj adoifg adfiogad jfl;gjfd apfog hafdlg haofd gadf ",
    },
    {
      imgUrl: image4,
    },
  ];
  const [curChild, setCurChild] = useState(cards.length - 1);
  const prevChild = curChild === 0 ? cards.length - 1 : curChild - 1;
  const nextChild = curChild === cards.length - 1 ? 0 : curChild + 1;

  function slideRight() {
    if (!cooldown.current) {
      cooldown.current = true;
      // Take all cards except current one to the right, Hide every element excpect the target and current one
      cardsRefs.current.forEach((ele, index) => {
        // If the class was rihg make it middle first or right according to how the user slides
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

      setTimeout(() => {
        curCard.current.classList.add("!-left-[100%]");
        targetCard.current.classList.remove("!left-[100%]");
      }, 400);

      let timer = setTimeout(() => {
        // Clear the classes
        cardsRefs.current.forEach((ele, index) => {
          if (index === curChild) {
            ele.current.classList.add("z-slide--1");
          }
        });
        setCurChild(nextChild);
        cooldown.current = false;
        clearTimeout(timer);
      }, 800);
    }
  }

  function slideLeft() {
    if (!cooldown.current) {
      cooldown.current = true;
      cardsRefs.current.forEach((ele, index) => {
        // As above but make it left or middle this time
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

      setTimeout(() => {
        curCard.current.classList.add("!left-[100%]");
        targetCard.current.classList.remove("!-left-[100%]");
      }, 400);

      let timer = setTimeout(() => {
        // Clear the classes
        cardsRefs.current.forEach((ele, index) => {
          if (index === curChild) {
            ele.current.classList.add("z-slide--1");
          }
        });
        setCurChild(prevChild);
        cooldown.current = false;
        clearTimeout(timer);
      }, 800);
    }
  }

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
          className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer rounded-l-lg"
          onClick={slideLeft}
        >
          <FaAngleLeft className="arr-slider text-lg !color-white" />
        </span>
        <span
          className="w-[50px] h-full flex justify-center items-center relative z-[3] backdrop-brightness-75 cursor-pointer rounded-r-lg"
          onClick={slideRight}
        >
          <FaAngleRight className="arr-slider text-lg !color-white" />
        </span>
      </div>

      {/* Images */}
      <div className="w-full h-full relative">
        {cards.map((ele, index) => (
          <HeaderCard
            imgUrl={ele?.imgUrl ? ele.imgUrl : ""}
            content={ele?.content ? ele.content : ""}
            key={
              ele?.imgUrl
                ? ele.imgUrl + index.toString()
                : ele.content.slice(0, 40)
            }
            index={index}
            leftRight={index % 2 === 0 ? true : false}
            getElement={(ele) => cardsRefs.current.push(ele)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeaderSlider;
