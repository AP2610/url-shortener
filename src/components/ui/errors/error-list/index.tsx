interface ErrorListProps<T> {
  errors: T[];
}

export const ErrorList = <T extends { message?: string; longMessage?: string }>({ errors }: ErrorListProps<T>) => {
  return (
    <ul className="text-sm text-red">
      {errors.map((error, index) => (
        <li key={index}>{error?.message || error?.longMessage}</li>
      ))}
    </ul>
  );
};
