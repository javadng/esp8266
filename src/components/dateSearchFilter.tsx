const DateFilter = () => {
  return (
    <div className="grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-5">
      <div className="my-3 md:col-start-1 flex flex-col">
        <span className="text-xl text-white my-2">Start from: </span>
        <input type="date" name="start" id="start" lang="fa" />
      </div>
      <div className="my-3 md:col-start-2 flex flex-col">
        <span className="text-xl text-white my-2">Until (optional): </span>
        <input type="date" name="end" id="end" />
      </div>
    </div>
  );
};

export default DateFilter;
