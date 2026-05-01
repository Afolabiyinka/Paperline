import Loader from "./loader";

const LoadingContainer = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Loader />
    </div>
  );
};

export default LoadingContainer;
