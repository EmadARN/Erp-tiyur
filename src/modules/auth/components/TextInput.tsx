import React from "react";


interface TextInputProps {
    placeholder:string
  className?: string;
  inputType: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder,className, inputType, onChange }) => {
  return (
    <input
    placeholder={placeholder}
      id="text-input-tailwind"
      className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-[#111] ${className || ""}`}
      type={inputType}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
