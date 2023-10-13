const SubmitBtn = props => {
  return (
    <button className="bg-white transition rounded-xl block mx-auto w-4/5 p-2 mt-6 font-bold hover:-translate-y-1 hover:shadow-custom-long active:-translate-y-0.5 active:shadow-custom-2 text-dark-c">
      {props.text}
    </button>
  );
};

export default SubmitBtn;
