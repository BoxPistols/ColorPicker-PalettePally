import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, styled, Container } from '@mui/material';
import { SketchPicker } from 'react-color';
import chroma from 'chroma-js';

const shades = {
  main: -0.5,
  dark: -1.5,
  light: 1.25,
  lighter: 3.75,
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
        onChange={(e: { target: { value: any } }) => onChange(e.target.value)}
      />
      <SketchPicker
        color={color}
        onChange={(updatedColor) => onChange(updatedColor.hex)}
      />
    </FlexBox>
  );
}

function ColorPicker() {
  const [numColors, setNumColors] = useState(4);
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
          return [
            shade,
            chroma.hsl(h, s * 0.9, l * 0.9 + adjustment * 0.1).hex(),
          ];
        })
      );
    });
    setPalette(newPalette);
  };

  return (
    <Container sx={{ maxWidth: '780px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Number of Colors"
            value={numColors}
            onChange={(e: { target: { value: string } }) =>
              setNumColors(parseInt(e.target.value))
            }
            type="number"
            inputProps={{ min: '1', max: '24' }}
            fullWidth
          />
        </Grid>
        {Array.from({ length: numColors }, (_, i) => (
          <Grid item xs={6} md={4} lg={3} key={i}>
            <p>Color {i + 1}</p>
            <TextField
              label="HEX"
              value={color[i]}
              onChange={(e) => {
                const newColor = [...color];
                newColor[i] = e.target.value;
                setColor(newColor);
              }}
              fullWidth
            />
            {/* Remove ColorInputField for simplicity */}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateClick}
            fullWidth
          >
            Generate Palette
          </Button>
        </Grid>
        {palette &&
          palette.map((c, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <h2>Color {i + 1}</h2>
              {Object.entries(c).map(([shade, color]) => (
                <Box
                  m={1}
                  key={shade}
                  sx={{
                    flexGrow: 1,
                    background: color,
                    color: chroma(color).luminance() > 0.5 ? 'black' : 'white',
                    p: 1,
                    borderRadius: '6px',
                  }}
                >
                  {shade}: {color}
                </Box>
              ))}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default ColorPicker;
