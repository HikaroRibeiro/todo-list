/* eslint-disable react-refresh/only-export-components */
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

export const containerVariants = cva("mx-auto", {
    variants: {
        size: {
            md: "max-w-126 px-2"
        }
    },
    defaultVariants: {
        size: "md"
    }
})

interface ContinerProps extends VariantProps<typeof containerVariants>,React.ComponentProps<"div"> {
    as?: keyof React.JSX.IntrinsicElements
}

export default function Container({
    as = "div",
    children,
    className,
    ...props
}: ContinerProps) {
    return React.createElement(
        as,
        {
            className: containerVariants({size: "md", className}), ...props
        },
        children
    )
}