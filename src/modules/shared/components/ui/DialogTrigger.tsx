import { useState, useRef } from "react";
import Dialog from "./Dialog";

type TriggerType = "click" | "hover";

type DialogTriggerProps = {
  trigger: TriggerType;
  title?: string;
  dialogContent: React.ReactNode;
  children: React.ReactNode;
};

export default function DialogTrigger({
  trigger = "click",
  title,
  dialogContent,
  children,
}: DialogTriggerProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      timeoutRef.current = setTimeout(() => setOpen(true), 100);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setOpen(false);
    }
  };

  const handleClick = () => {
    if (trigger === "click") {
      setOpen(true);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="inline-block"
    >
      {children}

      <Dialog isOpen={open} onClose={() => setOpen(false)} title={title}>
        {dialogContent}
      </Dialog>
    </div>
  );
}
