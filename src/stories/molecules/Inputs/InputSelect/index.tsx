import React from 'react';
import styles from './InputSelect.module.css';

interface InputSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const InputSelect: React.FC<InputSelectProps> = ({ options, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select
      className={styles.select}
      value={value}
      onChange={handleChange}
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option}
          className={styles.option}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

