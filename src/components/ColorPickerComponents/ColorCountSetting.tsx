import React from 'react';
import { Box, TextField, InputLabel, styled } from '@mui/material';

const StyledInputLabel = styled(InputLabel)`
  && {
    transform: none !important;
    transition: none !important;
  }
`;

// propsの型定義
type ColorCountSettingProps = {
  setNumColors: (num: number) => void;
  numColors: number;
};

// カラー数設定エリアコンポーネント
const ColorCountSetting: React.FC<ColorCountSettingProps> = ({
  setNumColors,
  numColors,
}) => {
  // 入力値が正しいかどうかチェック
  const handleNumColorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value, 10);
    if (!isNaN(num) && num > 0) {
      setNumColors(num);
    }
  };

  return (
    <Box sx={{ mb: 1, width: 100, marginRight: 2 }}>
      <StyledInputLabel shrink={false} htmlFor="color-length">
        カラー数↓↑
      </StyledInputLabel>
      <TextField
        size="small"
        id="color-length"
        value={numColors}
        onChange={handleNumColorsChange}
        type="number"
        inputProps={{ min: 1, max: 24 }}
        fullWidth
      />
    </Box>
  );
};

export default ColorCountSetting;
