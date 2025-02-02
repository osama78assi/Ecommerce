function Goal({ title, description, icon }) {
  return (
    <div className="basis-4/12 relative border-[1px] border-[var(--primary-color-900)] bg-white p-2">
      <div className="absolute left-[-23px] top-[-23px] p-2 bg-white border-[1px] border-[var(--primary-color-900)]">
        {icon}
      </div>
      <h2 className="pl-[30px] text-2xl mb-4 font-semibold text-primary-900">
        {title}
      </h2>
      <p className="pl-[30px] p-1 text-lg font-thin">{description}</p>
    </div>
  );
}

export default Goal;
