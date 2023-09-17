import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, InputLabel, styled } from '@mui/material';
import { initialColors, generatePalette } from './colorUtilities';
import ColorInputField from './ColorInputField';
import PaletteGrid from './PaletteGrid';

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

function ColorPicker() {
  const [numColors, setNumColors] = useState(4);
  const [color, setColor] = useState([]);
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    setColor(initialColors(numColors));
  }, [numColors]);

  const handleGenerateClick = () => {
    setPalette(generatePalette(color));
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <StyledInputLabel shrink={false} htmlFor="color-length">
          カラー数↓↑
        </StyledInputLabel>
        <TextField
          size="small"
          id="color-length"
          value={numColors}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num) && num > 0) {
              setNumColors(num);
            }
          }}
          type="number"
          inputProps={{ min: 1, max: 24 }}
          fullWidth
          sx={{ mb: 1, width: 100, marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateClick}
        >
          カラーパレット生成 / 再生成
        </Button>
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
              <b>Color {i + 1}</b>
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
