import { Box } from '@mui/material';
import { type PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
    return (
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100vw',
                py: 4,
                px: 2
            }}
        >
            <Box sx={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout