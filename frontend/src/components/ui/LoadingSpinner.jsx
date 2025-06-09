const LoadingSpinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-solid border-teal-500 border-t-transparent ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
