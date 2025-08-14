import type { ReactElement } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
    variant: Variant;
    size: Size;
    text?: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}

const variantStyles = {
    primary: "bg-purple-500 text-white ",
    secondary: "bg-purple-300 text-purple-500"
};

const sizeStyles = {
    sm: "px-2 py-2",
    md: "px-4 py-2",
    lg: "px-8 py-3"
};

const iconSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
};

const defaultStyles = "rounded flex items-center justify-center text-center font-semibold";

export const Button = (props: ButtonProps) => {
    return (
        <button
            className={`${defaultStyles} ${variantStyles[props.variant]} ${sizeStyles[props.size]} w-full justify-center md:w-auto`}
            onClick={props.onClick}
        >
            {props.startIcon ? (<div className={`pr-2 ${iconSizeStyles[props.size]}`}>{props.startIcon}</div>) : null}
            {props.text}
            {props.endIcon ? (<div className={`pl-2 ${iconSizeStyles[props.size]}`}>{props.endIcon}</div>) : null}
        </button>
    );
};