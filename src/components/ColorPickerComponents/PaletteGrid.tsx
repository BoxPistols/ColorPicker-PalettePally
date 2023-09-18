import React from 'react';
import { Box, Grid } from '@mui/material';
import chroma from 'chroma-js';

/**
 * Propの型定義
 */
interface PaletteGridProps {
  palette: any[]; // 表示するカラーパレット
}

/**
 * カラーパレット(色相彩度明度バリエーション)をグリッドで表示するコンポーネント
 */
const PaletteGrid: React.FC<PaletteGridProps> = ({ palette }) => {
  return (
    <Grid container spacing={2} mt={2}>
      {palette.map((c, i) => (
        <Grid
          item
          xs={6}
          md={3}
          lg={2}
          key={i}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <b>Color {i + 1}</b>
          {Object.entries(c).map(([shade, color]) => (
            <Box
              m={1}
              px={2}
              key={shade}
              sx={{
                flexGrow: 1,
                background: color,
                borderRadius: '6px',
                color: chroma(color).luminance() > 0.5 ? 'black' : 'white',
              }}
            >
              <Box p={1} sx={{ borderRadius: '6px' }}>
                {shade}: {color}
              </Box>
            </Box>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default PaletteGrid;
