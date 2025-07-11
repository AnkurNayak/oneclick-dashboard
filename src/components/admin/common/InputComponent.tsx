import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

type InputComponentProps = {
  label: string;
  errorMessage?: string;
  type?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputComponent = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ label, errorMessage, type = "text", placeholder, ...props }, ref) => {
    const [isPassVisible, setIsPassVisible] = useState(false);
    const isPassword = type === "password";

    const inputType = isPassword && isPassVisible ? "text" : type;

    return (
      <div className="flex flex-col">
        <label className="font-medium">{label}</label>
        <div className="h-10 w-full border border-primary rounded-md flex items-center dark:border-orange-400">
          <input
            autoComplete="off"
            ref={ref}
            className="outline-none focus:outline-none h-full w-full px-4"
            placeholder={placeholder}
            type={inputType}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="rounded-full hover:bg-accent h-8 w-8 cursor-pointer mr-2 flex items-center justify-center"
              onClick={() => setIsPassVisible(!isPassVisible)}
            >
              {isPassVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          )}
        </div>
        <div className="h-6">
          {errorMessage && (
            <p className="text-xs text-destructive">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
);

// display rule : build error
InputComponent.displayName = "InputComponent";
export default InputComponent;
