import React from 'react';
import { Box, TextField, styled, InputLabel } from '@mui/material';
import { SketchPicker } from 'react-color';

/**
 * スタイル定義
 */
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInputLabel = styled(InputLabel)`
  && {
    transform: none !important;
    transition: none !important;
  }
`;

/**
 * Propの型定義
 */
interface ColorInputFieldProps {
  color: string; // 入力フィールドの現在の色
  onChange: (color: string) => void; // 色が変更されたときの処理
}

/**
 * 色入力フィールドを表示するコンポーネント
 */
const ColorInputField: React.FC<ColorInputFieldProps> = ({
  color,
  onChange,
}) => {
  return (
    <Box
      sx={{
        display: 'block',
        pb: 2,
        overflow: 'auto',
        maxWidth: '90vw',
      }}
    >
      <FlexBox
        sx={{
          mb: 1.5,
          gap: 1,
          border: '1px solid #f9f9fc',
        }}
      >
        <SketchPicker
          color={color}
          onChange={(updatedColor) => onChange(updatedColor.hex)}
        />
      </FlexBox>
      <StyledInputLabel shrink={false} htmlFor="hex-color" size="small">
        Hex Color
      </StyledInputLabel>
      <TextField
        id="hex-color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        sx={{ pl: 0 }}
      />
    </Box>
  );
};

export default ColorInputField;
