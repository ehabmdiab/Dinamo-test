import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";
import { forwardRef } from "react";
import classNames from "classnames";

export interface ButtonProps extends AntButtonProps {
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AntButton
        ref={ref}
        className={classNames("dinamo-button", className)}
        {...props}
      >
        {children}
      </AntButton>
    );
  }
);

Button.displayName = "Button";
