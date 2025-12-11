import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const baseStyles = "rounded-2xl overflow-hidden";

    const variants = {
      default: "bg-white",
      elevated: "bg-white shadow-lg shadow-violet-100/50",
      bordered: "bg-white border border-violet-100",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`px-6 pb-6 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export const CardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { src: string; alt: string }>(
  ({ className = "", src, alt, ...props }, ref) => (
    <div ref={ref} className={`relative aspect-[4/3] overflow-hidden ${className}`} {...props}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )
);
CardImage.displayName = "CardImage";

export default Card;
