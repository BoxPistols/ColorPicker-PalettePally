import { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, styled } from '@mui/material';
import { SketchPicker } from 'react-color';
import chroma from 'chroma-js';
import React = require('react');

const shades = {
  main: 0,
  dark: -2,
  light: 1.25,
  lighter: 4,
};

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: columns;
`;

function ColorInputField({ color, onChange }) {
  return (
    <>
      <Box>
        <FlexBox sx={{ mb: 2, gap: 1 }}>
          <SketchPicker
            color={color}
            onChange={(updatedColor: { hex: any }) =>
              onChange(updatedColor.hex)
            }
          />
        </FlexBox>
        <TextField
          label="Hex Color"
          value={color}
          onChange={(e: { target: { value: any } }) => onChange(e.target.value)}
        />
      </Box>
    </>
  );
}

function ColorPicker() {
  const [numColors, setNumColors] = useState(4);
  const [color, setColor] = useState([]);
  const [palette, setPalette] = useState(null);

  useEffect(() => {
    const initialColor = Array.from(
      { length: numColors },
      (_, i) => chroma.hsl((i * 360) / numColors, 0.85, 0.5).hex() // 彩度を抑える
    );
    setColor(initialColor);
  }, [numColors]);

  const handleGenerateClick = () => {
    const newPalette = color.map((c) => {
      const baseColor = chroma(c);
      const baseHSL = baseColor.hsl();
      // FIXME:Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2019' or later.
      return Object.fromEntries(
        // Property 'entries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2017' or later
        Object.entries(shades).map(([shade, adjustment]) => {
          const [h, s, l] = baseHSL;
          return [shade, chroma.hsl(h, s * 0.85, l + adjustment * 0.1).hex()]; // 彩度を抑える
        })
      );
    });
    setPalette(newPalette);
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Number of Colors"
          value={numColors}
          onChange={(e: { target: { value: string } }) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num) && num > 0) {
              setNumColors(num);
            }
          }}
          type="number"
          inputProps={{ min: 1, max: 24 }}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateClick}
        >
          Generate Palette
        </Button>
      </Box>
      <FlexBox sx={{ flexDirection: 'columns', gap: 2 }}>
        {Array.from({ length: numColors }, (_, i) => (
          <React.Fragment key={i}>
            <FlexBox sx={{ display: 'block' }}>
              <b>Color {i + 1}</b>
              <ColorInputField
                color={color[i]}
                onChange={(newColor: any) => {
                  const colorsCopy = [...color];
                  colorsCopy[i] = newColor;
                  setColor(colorsCopy);
                }}
              />
            </FlexBox>
          </React.Fragment>
        ))}
      </FlexBox>
      {palette && (
        <Grid container spacing={2}>
          {palette.map((c: any, i: number) => (
            <Grid
              item
              xs={4}
              mg={3}
              lg={2}
              key={i}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <b>Color {i + 1}</b>
              {/* Property 'entries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2017' or later. */}
              {Object.entries(c).map(([shade, color]) => (
                <>
                  <Box
                    m={1}
                    key={shade}
                    sx={{
                      flexGrow: 1,
                      background: color,
                      borderRadius: '6px', // 角丸にするためにスタイル追加
                      color:
                        chroma(color).luminance() > 0.5 ? 'black' : 'white',
                    }}
                  >
                    <>
                      <Box p={1} sx={{ borderRedius: '6px' }}>
                        {shade}: {color}
                      </Box>
                    </>
                  </Box>
                </>
              ))}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default ColorPicker;
