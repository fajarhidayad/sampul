const Spinner = (props: { id: string }) => {
  return (
    <span
      class="loading loading-spinner text-white htmx-indicator spinner"
      id={props.id}
    ></span>
  );
};

export default Spinner;
