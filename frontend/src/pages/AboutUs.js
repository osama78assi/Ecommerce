import { useEffect, useState } from "react";
import AboutUsCard from "../components/AboutUsCard";
import image5Mobile from "../assest/banner/img5_mobile.png"

function AboutUs() {
  const [images, setImages] = useState([
    {
      imgUrl: image5Mobile,
      content:
        "lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    {
      imgUrl: image5Mobile,
      content:
        "lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    {
      imgUrl: "https://cdn.wallpapersafari.com/95/5/tbQSs1.jpg",
      content:
        "lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    {
      // imgUrl: image5Mobile,
      content:
        "lasdf asfghdfgh dfgh jhdgf jsfhgs dfgh dfgh dfgh dfgh dfg hdfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    {
      imgUrl: "https://mdn.github.io/css-examples/howto/balloon.jpg",
      content:
        "lasdf asfghj ghj rtwqqafgh f a sdfg sdfg sdfg sdf gsd ghgfh sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
  ]);

  useEffect(() => {
    // Fetch images and content from the backend
  }, []);

  return (
    <div className="flex flex-col justify-center space-y-9 items-center">
      {images.map((image, index) => {
        return (
          <AboutUsCard
            leftRight={index % 2 === 0 ? true : false}
            key={`${image.content.slice(0, 30)}-${index}`}
            imgUrl={image?.imgUrl}
            content={image.content}
          />
        );
      })}
    </div>
  );
}

export default AboutUs;
