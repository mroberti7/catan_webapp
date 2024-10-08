type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="rounded-xl bg-catan-red p-3 text-primary hover:bg-opacity-80 md:p-4" onClick={onClick} data-test-id="button">
      {children}
    </button>
  );
};

export default Button;
