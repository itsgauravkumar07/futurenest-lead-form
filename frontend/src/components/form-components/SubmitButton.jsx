function SubmitButton({
  text = "Submit",
}) {
  return (
    <button
      type="submit"
      className="
        w-full
        md:w-auto
        px-8
        py-3
        rounded-xl
        bg-green-500
        text-white
        font-semibold
        hover:bg-green-600
        transition
      "
    >
      {text}
    </button>
  );
}

export default SubmitButton;