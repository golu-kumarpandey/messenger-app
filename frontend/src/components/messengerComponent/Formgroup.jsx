const Formgroup = ({ children, col = true, center = false }) => {
  const base = `flex ${col ? "flex-col" : "flex-row"} justify-center ${center ? "items-center" : ""} mb-3  gap-1 sm:gap-2 lg:gap-3`;
  return <div className={base}>{children}</div>;
};
export default Formgroup;
