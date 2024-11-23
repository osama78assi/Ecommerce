import { useEffect, useState } from "react";
import image5Mobile from "../assest/banner/img5_mobile.png";
import ErrorComponent from "../components/ui/ErrorComponent";
import TextPart from "../components/about-us/TextPart";
import ImagesPart from "../components/about-us/ImagesPart";

function AboutUs() {
  const [images, setImages] = useState([
    {
      title: "Title",
      imgUrl: "/DSC_3535.jpg",
      content:
        "lasdf asf a sdfg sdf gsdfg sdfg  fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    // {
    //   title: "Normal Title",
    //   imgUrl: "https://cdn.wallpapersafari.com/95/5/tbQSs1.jpg",
    //   content:
    //     "lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    // },
    {
      title: "test",
      imgUrl: "/DSC_3306.jpg",
      content:
        "lasdf asfghj  rtwqqafgh f a sdfg sdfg sdfg sdf gsd ghgfh sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    {
      title: "test",
      imgUrl: "/DSC_3283.jpg",
      content:
        "lasdf asfghj ghj rtwqqafgh f sdfg sa sdfg sdfg sdfg sdf gsd ghgfh sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
    {
      title: "test",
      imgUrl: "/DSC_3487.jpg",
      content:
        "lasdf ghj rtwqqafgh f jhgf a sdfg sdfg sdfg sdf gsd ghgfh sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a lasdf asf a sdfg sdf gsdfg sdfg dfgasj [oijeutr[gj uoidsfgu aposj fasdfg hpaojg asj pioasdj podf jdfg afdsjg dpofjg a",
    },
  ]);

  useEffect(() => {}, []);

  return (
    // <div className="flex flex-col justify-center space-y-9 items-center">
    //    {images.map((image, index) => {
    //     return (
    //       <AboutUsCard
    //         leftRight={index % 2 === 0 ? true : false}
    //         key={`${image.content.slice(0, 30)}-${index}`}
    //         imgUrl={image?.imgUrl}
    //         content={image.content}
    //       />
    //     );
    //   })}
    //    </div>

    <div className="container mx-auto bg-slate-100 p-6">
      <div className="flex flex-wrap columns-12">
        <TextPart images={images} />
        <ImagesPart images={images} />
      </div>
      {/* <ErrorComponent refetchFunction={() => {}} /> */}
    </div>
  );
}

export default AboutUs;
