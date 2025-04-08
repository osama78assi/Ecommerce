function HeaderTag({ title }) {
  const squareCommonClasses =
    " absolute top-[50%] translate-y-[-50%] translate-x-[-50%] w-[25px] h-[25px] bg-white border-[1px] border-[var(--primary-color-900)] rotate-45";

  return (
    <div className="py-5 w-full">
      <h1 className="text-4xl text-center">{title}</h1>

      <div className="py-5">
        <span className="block w-[200px] h-[2px] mx-auto bg-primary-900 relative rounded-lg">
          <span className={`${squareCommonClasses} left-[calc(50%-(25px/2))] z-[1]`}></span>
          <span className={`${squareCommonClasses} left-[50%] z-[2]`}></span>
          <span className={`${squareCommonClasses} left-[calc(50%+(25px/2))] z-[1]`}></span>
        </span>
      </div>
    </div>
  );
}

export default HeaderTag;
