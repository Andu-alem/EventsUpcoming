import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'


export default function LoadingPage() {
    const theme = useTheme()
    const matchesSm = useMediaQuery('(min-width: 500px)')
    //const matches = useMediaQuery('(max-width: 480px)')
    const matches = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Container>
            <Box 
                sx={{ 
                    ml: matches ? "33%" : matchesSm ? "20%" : "7%" , 
                    mt: matches ? "20%" : matchesSm ? "30%" : "50%"
                }}
            >
                <Box 
                    sx={{ 
                        ml: matches ? '20%' : matchesSm ? '27%' : '32%',
                        mb: 3
                    }}
                >
                    <CircularProgress color="primary" size="3rem" />
                </Box>
                <Typography 
                    variant="h3" 
                    component="h4"
                    sx={{ fontSize: matchesSm ? 55 : 45 }}
                >
                    Event Updater
                </Typography>
            </Box>
        </Container>
    )
}