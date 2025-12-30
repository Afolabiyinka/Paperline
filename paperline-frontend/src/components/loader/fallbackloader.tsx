import LoadingContainer from "./loadingcontainer";

const Fallback = () => {
  return (
    <div className="h-screen w-screen flex justify-center gap-10 items-center">
      <LoadingContainer />
    </div>
  );
};

export default Fallback;
