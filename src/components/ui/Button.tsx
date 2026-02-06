import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        // Manual Tailwind classes for variants
        const variants = {
            default: "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90",
            destructive: "bg-[hsl(var(--destructive))] text-white hover:bg-[hsl(var(--destructive))]/90",
            outline: "border border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
            secondary: "bg-[hsl(var(--secondary))] text-white hover:bg-[hsl(var(--secondary))]/80",
            ghost: "hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]",
            link: "text-[hsl(var(--primary))] underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        const variantClass = variants[variant]
        const sizeClass = sizes[size]

        return (
            <button
                className={cn(baseStyles, variantClass, sizeClass, className)}
                ref={ref}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
