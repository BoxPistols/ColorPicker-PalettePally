import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { initialColors } from './colorUtilities';
import PaletteGrid from '././ColorPickerComponents/PaletteGrid';
import ColorCountSetting from './ColorPickerComponents/ColorCountSetting';
import GeneratePaletteArea from './ColorPickerComponents/GeneratePaletteArea';
import ColorInputField from './ColorPickerComponents/ColorInputField';
import ColorLabelField from './ColorPickerComponents/ColorLabelField';

// スタイル定義
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// カラーピッカーコンポーネント
function ColorPicker() {
  const [numColors, setNumColors] = useState(4); // 選択色の数
  const [color, setColor] = useState([]); // 選択した色のリスト
  const [palette, setPalette] = useState(null); // 生成したパレット
  const [colorLabels, setColorLabels] = useState(
    Array(numColors)
      .fill('')
      .map((_, i) => `Color ${i + 1}`)
  );

  // 選択色数が変更された時、新しい初期色を設定します
  useEffect(() => {
    setColor(initialColors(numColors));
  }, [numColors]);

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <ColorCountSetting setNumColors={setNumColors} numColors={numColors} />
        <GeneratePaletteArea color={color} setPalette={setPalette} />
      </Box>
      <FlexBox
        sx={{
          flexDirection: 'columns',
          gap: 2,
          overflow: 'auto',
          maxWidth: '90vw',
        }}
      >
        {Array.from({ length: numColors }, (_, i) => (
          <React.Fragment key={i}>
            <FlexBox sx={{ display: 'block' }}>
              <ColorLabelField
                label={colorLabels[i]}
                onChange={(newLabel) => {
                  const labelsCopy = [...colorLabels];
                  labelsCopy[i] = newLabel;
                  setColorLabels(labelsCopy);
                }}
              />
              <ColorInputField
                color={color[i]}
                onChange={(newColor) => {
                  const colorsCopy = [...color];
                  colorsCopy[i] = newColor;
                  setColor(colorsCopy);
                }}
              />
            </FlexBox>
          </React.Fragment>
        ))}
      </FlexBox>
      {palette && <PaletteGrid palette={palette} />}
    </>
  );
}

export default ColorPicker;
