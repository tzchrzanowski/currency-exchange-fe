import { Box } from '@mui/material';
import { type PropsWithChildren } from 'react';
import styles from './Layout.module.css';

function Layout({ children }: PropsWithChildren) {
    return (
        <Box className={styles.container}
        >
            <Box className={styles.innerBlock}>
                {children}
            </Box>
        </Box>
    )
}

export default Layout