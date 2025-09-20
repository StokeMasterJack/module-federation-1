import * as React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography, Button } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const cache = createCache({ key: 'mui-seven', prepend: true });
const theme = createTheme();

export default function V7Page() {
    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box p={3}>
                    <Typography variant="h5">MUI 7 Stand-alone</Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>Hello</Button>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
}