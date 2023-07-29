import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, styled } from '@mui/material';
import { SketchPicker } from 'react-color';
import chroma from 'chroma-js';

const shades = {
  main: 0,
  dark: -1,
  light: 1,
  lighter: 2,
};

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: rows;
`;

function ColorInputField({ color, onChange }) {
  return (
    <FlexBox>
      <TextField
        label="Hex Color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
      />
      <SketchPicker
        color={color}
        onChange={(updatedColor) => onChange(updatedColor.hex)}
      />
    </FlexBox>
  );
}

function ColorPicker() {
  const [numColors, setNumColors] = useState(12);
  const [color, setColor] = useState([]);
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    const initialColor = Array.from({ length: numColors }, (_, i) =>
      chroma.hsl((i * 360) / numColors, 1, 0.5).hex()
    );
    setColor(initialColor);
  }, [numColors]);

  const handleGenerateClick = () => {
    const newPalette = color.map((c) => {
      const baseColor = chroma(c);
      const baseHSL = baseColor.hsl();
      return Object.fromEntries(
        Object.entries(shades).map(([shade, adjustment]) => {
          const [h, s, l] = baseHSL;
          return [shade, chroma.hsl(h, s, l + adjustment * 0.1).hex()];
        })
      );
    });
    setPalette(newPalette);
  };

  return (
    <div>
      <FlexBox>
        <TextField
          label="Number of Colors"
          value={numColors}
          onChange={(e) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num) && num > 0) {
              setNumColors(num);
            }
          }}
          type="number"
          inputProps={{ min: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateClick}
        >
          Generate Palette
        </Button>
      </FlexBox>
      <FlexBox>
        {Array.from({ length: numColors }, (_, i) => (
          <React.Fragment key={i}>
            <h2>Color {i + 1}</h2>
            <ColorInputField
              color={color[i]}
              onChange={(newColor) => {
                const colorsCopy = [...color];
                colorsCopy[i] = newColor;
                setColor(colorsCopy);
              }}
            />
          </React.Fragment>
        ))}
      </FlexBox>
      {palette && (
        <Grid container spacing={2}>
          {palette.map((c, i) => (
            <Grid
              item
              xs={4}
              key={i}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <h2>Color {i + 1}</h2>
              {Object.entries(c).map(([shade, color]) => (
                <>
                  <Box
                    m={1}
                    key={shade}
                    sx={{ flexGrow: 1, background: color }}
                  >
                    <>
                      {shade}: {color}
                    </>
                  </Box>
                </>
              ))}
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default ColorPicker;
