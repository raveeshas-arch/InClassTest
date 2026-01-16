const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-md text-sm">
      {error}
    </div>
  );
};

export default ErrorMessage;