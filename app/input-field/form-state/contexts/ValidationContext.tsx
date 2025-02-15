import React, {createContext, ReactNode, useContext, useState} from "react";

type ValidationError = { key: string; message: string };
type ValidationErrors = Array<ValidationError>;

type ValidationContextType = {
  errors: ValidationErrors;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  getError: (field: string) => ValidationError | undefined;
};

const ValidationContext = createContext<ValidationContextType>({
  errors: [],
  setError: () => {},
  clearError: () => {},
  getError: () => undefined
});

export const ValidationContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<ValidationErrors>([]);

  const setError = (field: string, message: string) => {
    setErrors(prev => {
      const filteredErrors = prev.filter(err => err.key !== field);
      const newError: ValidationError = { key: field, message: message };
      const updatedErrors: ValidationErrors = [...filteredErrors, newError];
      return updatedErrors;
    });
  };

  const clearError = (field: string) => {
    setErrors(prev => prev.filter(err => err.key !== field));
  };

  const getError = (field: string): ValidationError | undefined => {
    return errors.find(err => err.key === field);
  };

  return (
    <ValidationContext.Provider value={{ errors, setError, clearError, getError }}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidationContext = () => {
  return useContext(ValidationContext);
};
