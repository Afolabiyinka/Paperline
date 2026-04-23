import * as LucideIcon from "lucide-react";
import { Eye, EyeClosed } from "lucide-react";
import React from "react";

interface InputProps {
  startIcon: keyof typeof LucideIcon;
  type?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  value?: string;
}

const Input = ({
  startIcon,
  placeholder,
  type,
  onChange,
  value,
  ...props
}: InputProps) => {
  const IconComponent = LucideIcon[startIcon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div
      className="
        flex items-center gap-3
        border border-neutral-200
        px-4 py-3
        w-full
        bg-white
        focus-within:border-neutral-400
        transition
      "
    >

      <IconComponent className="w-4 h-4 text-neutral-500" />

      <input
        className="
          w-full
          outline-none
          bg-transparent
          text-sm
          text-black
        "
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        {...props}
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-neutral-500 hover:text-black transition"
        >
          {showPassword ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeClosed className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;