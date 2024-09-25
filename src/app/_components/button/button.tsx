type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="rounded-xl bg-catan-red p-4 text-primary hover:bg-opacity-80" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
