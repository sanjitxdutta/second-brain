import { useState, useEffect } from "react";
import type { ReactElement } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
    variant: Variant;
    size: Size;
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    responsiveBreakpoint?: boolean;
}

const variantStyles = {
    primary: "bg-purple-500 text-white",
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

const defaultStyles =
    "rounded flex items-center justify-center text-center font-semibold";

export const Button = (props: ButtonProps) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        if (!props.responsiveBreakpoint) {
            setIsSmallScreen(false);
            return;
        }

        const checkWidth = () => setIsSmallScreen(window.innerWidth < 485);
        checkWidth();

        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, [props.responsiveBreakpoint]);

    return (
        <button
            className={`${defaultStyles} ${variantStyles[props.variant]} ${sizeStyles[props.size]} w-full justify-center md:w-auto`}
            onClick={props.onClick}
            aria-label={props.text}
        >
            {props.startIcon && (
                <div
                    className={`${iconSizeStyles[props.size]} ${!isSmallScreen && props.text ? "pr-2" : ""
                        }`}
                >
                    {props.startIcon}
                </div>
            )}

            {!isSmallScreen && props.text}

            {props.endIcon && (
                <div
                    className={`${iconSizeStyles[props.size]} ${!isSmallScreen && props.text ? "pl-2" : ""
                        }`}
                >
                    {props.endIcon}
                </div>
            )}
        </button>
    );
};
