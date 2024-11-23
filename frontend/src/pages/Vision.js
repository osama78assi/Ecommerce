import Slider from "../components/vision/Slider";
import VisionSection from "../components/vision/VisionSection";

function VisionPage() {
  const data = [
    {
      id: 1,
      title: "Motivation",
      description:
        "We love the motivation as you all shoud know At our company, we believe in innovation and growth At our company, we believe in innovation and growth",
      imgUrl: "/DSC_3421.jpg",
    },
    {
      id: 2,
      title: "Services ",
      description:
        "We strive to provide the highest quality services for our clients. We strive to provide the highest quality services for our clients.",
      imgUrl: "/DSC_3291.jpg",
    },
    {
      id: 3,
      title: "Technology",
      description:
        "Our vision is to create a sustainable future through technology. Our vision is to create a sustainable future through technology.",
      imgUrl: "",
    },
  ];
  const imgs = data.map((item) => item.imgUrl).filter((url) => url !== "");

  return (
    <div className="py-12">
      <div className="flex flex-col items-center gap-8 p-6 max-w-4xl mx-auto">
        <Slider imgs={imgs} />
        {/* Text section */}
        <div className="space-y-8 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-slate-600">
          {data.map((ele) => (
            <VisionSection
              key={ele.id}
              title={ele.title}
              description={ele.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VisionPage;
