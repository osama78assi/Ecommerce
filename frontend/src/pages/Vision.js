import Image from "../components/vision/Image";
import VisionSection from "../components/vision/VisionSection";

function VisionPage() {
  const imageSrc = "/slider-1.jpg";
  const data = [
    {
      id: 1,
      title: "Motivation",
      content:
        "We love the motivation as you all shoud know At our company, we believe in innovation and growth At our company, we believe in innovation and growth",
    },
    {
      id: 2,
      title: "Services ",
      content:
        "We strive to provide the highest quality services for our clients. We strive to provide the highest quality services for our clients.",
    },
    {
      id: 3,
      title: "Technology",
      content:
        "Our vision is to create a sustainable future through technology. Our vision is to create a sustainable future through technology.",
    },
  ];

  return (
    <div className="py-12">
      <div className="flex flex-col items-center gap-8 p-6 max-w-4xl mx-auto">
        <Image imageSrc={imageSrc} />
        {/* Text section */}
        <div className="space-y-8 relative before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-slate-600">
          {data.map((ele) => (
            <VisionSection
              key={ele.id}
              title={ele.title}
              content={ele.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VisionPage;
