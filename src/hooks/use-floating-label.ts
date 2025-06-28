'use client';

import { useEffect, useRef, useState } from 'react';

interface UseFloatingLabelProps {
  autoFocus?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useFloatingLabel = ({ autoFocus, onFocus, onBlur, onChange }: UseFloatingLabelProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [shouldFloatLabel, setShouldFloatLabel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle autoFocus state
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setIsFocused(true);
    }
  }, []);

  useEffect(() => {
    setShouldFloatLabel(isFocused || hasValue);
  }, [isFocused, hasValue]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(event.target.value.length > 0);
    onChange?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  return {
    shouldFloatLabel,
    inputRef,
    handleFocus,
    handleBlur,
    handleChange,
  };
};
