import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  dataTestId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  className = 'btn',
  dataTestId = 'button',
  children,
  ...props
}) => {
  return (
    <button className={`${className}`} data-testid={dataTestId} {...props}>
      {loading ? (
        <span className="loading loading-dots loading-xs" />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
