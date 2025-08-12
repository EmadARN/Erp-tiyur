import { forwardRef, type InputHTMLAttributes } from "react";

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
      value = "", // مقدار پیش‌فرض برای جلوگیری از undefined
      isFloat = false,
      ...rest
    },
    ref
  ) => {
    const step = inputType === "number" && isFloat ? "any" : undefined;

    return (
      <div className={className}>
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value ?? ""} // اطمینان از اینکه مقدار همیشه رشته است
          onChange={(e) => onChange && onChange(e.target.value)}
          step={step}
          className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-[#111] ${inputClassName}`}
          {...rest}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;