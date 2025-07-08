type InputComponentProps = {
  label: string;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
};

// Input component
const InputComponent = ({
  label,
  errorMessage,
  value,
  onChange,
  type,
  placeholder,
}: InputComponentProps) => {
  return (
    <div className="flex flex-col">
      <label className="font-medium">{label}</label>
      <div className="h-10 w-full border border-primary rounded-md">
        <input
          value={value}
          onChange={onChange}
          className="outline-none focus:outline-none h-full w-full px-4"
          placeholder={placeholder}
          type={type}
        />
      </div>
      <div className="h-6">
        {errorMessage && (
          <p className="text-xs text-destructive">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
