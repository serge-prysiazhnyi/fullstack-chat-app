import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  className = 'btn',
  children,
  ...props
}) => {
  return (
    <button className={`${className}`} {...props}>
      {loading ? (
        <span className="loading loading-dots loading-xs" />
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};
