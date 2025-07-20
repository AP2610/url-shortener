'use client';

import { useRef, useState } from 'react';

interface CodeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  length: number;
  hiddenInputName: string;
}

export const CodeInput = ({ length, hiddenInputName, ...props }: CodeInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const codePart = event.target.value;
    const newValues = [...values];
    newValues[index] = codePart;
    setValues(newValues);

    if (codePart && index !== values.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const isBackspace = event.key === 'Backspace';

    if (isBackspace && index !== 0) {
      inputRefs.current[index - 1]?.focus();

      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = event.clipboardData.getData('text');
    const pastedValues = clipboardData.split('');
    setValues(pastedValues);
  };

  return (
    <div className="flex gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          id={index === 0 ? 'code' : `code-${index}`}
          ref={(element) => {
            if (element) {
              inputRefs.current[index] = element;
            }
          }}
          className="h-10 w-10 rounded-md border border-dark-gray text-center outline-none focus:border-primary focus:shadow-[0_0_4px_1px_var(--color-light-gray)]"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onChange={(event) => handleChange(event, index)}
          onPaste={handlePaste}
          name={`code-${index}`}
          {...props}
        />
      ))}

      <input type="hidden" value={values.join('')} name={hiddenInputName} />
    </div>
  );
};
