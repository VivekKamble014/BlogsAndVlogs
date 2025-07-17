const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;