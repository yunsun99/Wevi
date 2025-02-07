import { useState } from "react";

export function useInput(formData, setFormData, fieldName, validationFn) {
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(formData[fieldName]);

  function handelInputChange(event) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, ""); // 숫자만 남기기
    if (value.length < 4) return value;
    if (value.length < 8) return `${value.slice(0, 3)}-${value.slice(3)}`;
    if (value.length === 10)
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  return {
    value: formData[fieldName] || "",
    handelInputChange,
    handleInputBlur,
    handlePhoneChange,
    hasError: didEdit && !valueIsValid,
  };
}
