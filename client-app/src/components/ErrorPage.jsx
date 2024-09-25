import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'


export default function ErrorPage(){
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
                <Typography 
                    variant="h3" 
                    component="h4"
                    color="text.secondary"
                    sx={{ fontSize: matchesSm ? 55 : 45, ml: 10 }}
                >
                    OOPS!
                </Typography>
                <Typography 
                    variant="h3" 
                    component="h4"
                    color="text.secondary"
                    sx={{ fontSize: matchesSm ? 35 : 30 }}
                >
                    It seems you have mistakingly typing. 
                    <br/>
                    Go to&nbsp;<Link to='/'>Home</Link>&nbsp;page
                </Typography>
            </Box>
        </Container>
    )
}