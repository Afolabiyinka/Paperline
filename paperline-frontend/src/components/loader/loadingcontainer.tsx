import Loader from "./loader";

const LoadingContainer = () => {
  return (
    <div className="h-[70vh] w-full flex flex-col justify-center items-center">
      <Loader />
    </div>
  );
};

export default LoadingContainer;
