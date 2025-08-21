import { forwardRef, type InputHTMLAttributes } from "react";
import { useThemeSettings } from "@/modules/shared/hooks/useThemeSettings";
import { cn } from "@/modules/shared/helpers"; // اطمینان از اینکه cn ایمپورت شده

type InputTypes =
  | "text"
  | "password"
  | "email"
  | "number"
  | "search"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "datetime-local"
  | "color"
  | "month"
  | "week";

interface TextInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type" | "step"
  > {
  inputType?: InputTypes;
  onChange?: (value: string) => void;
  inputClassName?: string;
  className?: string;
  isFloat?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      inputType = "text",
      onChange,
      inputClassName = "",
      className = "",
      value = "",
      isFloat = false,
      ...rest
    },
    ref
  ) => {
    const { mode } = useThemeSettings();
    const isDark = mode === "dark";
    const step = inputType === "number" && isFloat ? "any" : undefined;

    return (
      <div className={className}>
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          step={step}
          className={cn(
            "w-full px-4 py-2 rounded-md ring-1 focus:outline-none focus:ring-2",
            {
              "ring-gray-700 focus:ring-blue-600 text-gray-200 placeholder-gray-400 bg-gray-900":
                isDark,
              "ring-gray-300 focus:ring-blue-500 text-gray-900 placeholder-gray-400 bg-white":
                !isDark,
            },
            inputClassName
          )}
          {...rest}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
