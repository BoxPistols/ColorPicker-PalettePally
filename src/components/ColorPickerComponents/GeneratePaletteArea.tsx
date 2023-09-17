import React from 'react';
import { Button } from '@mui/material';
import { generatePalette } from '../colorUtilities';

// propsの型定義
type GeneratePaletteAreaProps = {
  color: string[];
  setPalette: (palette: any[] | null) => void;
};

// カラーパレット生成エリアコンポーネント
const GeneratePaletteArea: React.FC<GeneratePaletteAreaProps> = ({
  color,
  setPalette,
}) => {
  const handleGenerateClick = () => {
    setPalette(generatePalette(color));
  };

  return (
    <Button variant="contained" color="primary" onClick={handleGenerateClick}>
      カラーパレット生成 / 再生成
    </Button>
  );
};

export default GeneratePaletteArea;
