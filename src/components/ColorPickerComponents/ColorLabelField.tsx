// ColorLabelField.tsx
import React from 'react';
import { TextField } from '@mui/material';

type ColorLabelFieldProps = {
  label: string;
  onChange: (newLabel: string) => void;
};

const ColorLabelField: React.FC<ColorLabelFieldProps> = ({
  label,
  onChange,
}) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      value={label}
      onChange={handleLabelChange}
      size="small"
      sx={{
        mb: 0.5,
        width: '100%',
      }}
    />
  );
};

export default ColorLabelField;
