import React, {createContext, ReactNode, useContext, useState} from "react";

type ValidationError = { [key: string]: string };
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
    console.log(field, message);
    setErrors(prev => {
      const filteredErrors = prev.filter(err => !(field in err));
      const newError: ValidationError = { [field]: message };
      const updatedErrors: ValidationErrors = [...filteredErrors, newError];
      return updatedErrors;
    });
  };

  const clearError = (field: string) => {
    setErrors(prev => prev.filter(err => !err[field]));
  };

  const getError = (field: string): ValidationError | undefined => {  // 追加
    console.log('1', field);
    const errorObj = errors.find(err => field in err);
    return errorObj ? errorObj : undefined;
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