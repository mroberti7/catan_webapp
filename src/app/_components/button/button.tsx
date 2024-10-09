type ButtonProps = {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={className ? className : 'rounded-xl bg-catan-red p-3 text-primary hover:bg-opacity-80 md:p-4'}
      onClick={onClick}
      data-test-id="button"
    >
      {children}
    </button>
  );
};

export default Button;
