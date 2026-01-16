const LoginDivider = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-gray-700" />
      <span className="text-xs text-gray-500">OR</span>
      <div className="flex-1 h-px bg-gray-700" />
    </div>
  );
};

export default LoginDivider;