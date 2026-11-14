const LayOut = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-[90%] sm:max-w-[80%] md:max-w-100 ${className}`}
    >
      {children}
    </div>
  );
};
export default LayOut;
