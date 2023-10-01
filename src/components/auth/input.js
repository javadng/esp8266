const Input = (props) => {
  const focusClass =
    "focus:-translate-y-1 focus:shadow-lg focus-within:bg-gray-light focus-within:placeholder:text-dark-c";
  const normalClass =
    "bg-gray-transparent border-blue-400 transition placeholder:text-white rounded-xl block w-full text-dark-c";
  const errorClass = "invalid:border-red-500 invalid:shadow-custom-red";

  return (
    <div className="my-8 mx-auto w-4/5 relative">
      <input
        id={props.id}
        onChange={props.setInputChange}
        type={props.type}
        value={props.vlaue}
        placeholder=" "
        className={`${normalClass} ${focusClass} ${errorClass} input-form`}
      />
      <label
        htmlFor={props.id}
        className="label-form transition duration-300 absolute left-4 top-2 text-white"
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
