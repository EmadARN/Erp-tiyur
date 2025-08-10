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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  inputType?: InputTypes;
  onChange?: (value: string) => void;
  inputClassName?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      inputType = "text",
      onChange,
      inputClassName = "",
      className = "",
      value,
      ...rest
    },
    ref
  ) => {
    // wrapper className برای کنترل پدر اگر لازم بود
    return (
      <div className={className}>
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-[#111] ${inputClassName}`}
          {...rest}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
