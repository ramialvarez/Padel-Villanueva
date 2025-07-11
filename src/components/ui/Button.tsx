import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({
  text,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className="w-auto h-12 text-white bg-rojo-oscuro/90 hover:bg-rojo-medium hover:transition p-2 flex items-center justify-center rounded-xl transform hover:scale-105 transition duration-300"
      {...props}
    >
      {text}
    </button>
  );
}
