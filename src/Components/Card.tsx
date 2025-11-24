import { type HTMLAttributes, type HtmlHTMLAttributes, type ReactNode } from 'react';


interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = ""}:CardProps){
    return (
        <div 
        className={"rounded-2xl border border-slate-200 bg-white/80 shadow-sm p-4" + className}
        >
        {children}    
        </div>
    );
}

type CardTitleProps = HtmlHTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className = "", ...rest}: CardTitleProps){
    return (
        <h3 className={"text-lg font-semibold text-slate-800 " + className}
      {...rest} />
    )
}

type CardTextProps = HTMLAttributes<HTMLParagraphElement>;

export function CardText({ className = "", ...rest }: CardTextProps) {
  return (
    <p
      className={"text-sm text-slate-600 leading-snug " + className}
      {...rest}
    />
  );
}

type CardImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function CardImage({ className = "", ...rest }: CardImageProps) {
  return (
    <img
      className={
        "w-full h-40 object-cover rounded-xl mb-3 " +
        className
      }
      {...rest}
    />
  );
}