import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { grey, lightBlue } from '@mui/material/colors'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'


const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));
export default function LandingPage(){
    const color = grey[900]
    const greyTop = grey[600]
    const greyTxt = grey[100]
    const theme = useTheme()
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'))
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <Container component='main' maxWidth={false} disableGutters 
                    sx={{ 
                        width:'100%', 
                        height:'100vh',
                        background: `linear-gradient(${greyTop},${color})`,
                        boxSizing:'border-box', 
                        pt: matchesSm ? '15%' : '30%'}}>
            <Box container sx={{ px:'2%' }}>
                <Typography sx={{ 
                        fontSize: matchesMd ? 75 : matchesSm ? 65 : 60,
                        fontWeight:'bold', 
                        mx: matchesMd ? '35%': matchesSm ? '24%' : '13%', 
                        animation: 'changeColor 5s linear infinite',
                        '@keyframes changeColor': {
                            '0%' : {
                                color:lightBlue[100]
                            },
                            '25%' : {
                                color:lightBlue[300]
                            },
                            '50%' : {
                                color:lightBlue[500]
                            },
                            '75%' : {
                                color:lightBlue[700]
                            },
                            '100%' : {
                                color:lightBlue[900]
                            }
                        }
                    }}
                >
                    Wellcome
                </Typography>
                <Typography variant="h5" 
                    sx={{ 
                        fontSize: 30,
                        fontWeight: 400, 
                        mx: matchesMd ? '20%' : matchesSm ? '17%' : '7%', 
                        color:greyTxt }}
                    >
                    To the place where you can share an upcoming event
                </Typography>
                <Box sx={{ 
                    display:'flex', 
                    fD:'row', 
                    justifyContent:'space-evenly', 
                    mt: 10, 
                    mx: matchesSm ? '20%' : '7%'}}>
                    <Button size={matchesMd ? "large" : "small"} variant="outlined" sx={{ fontWeight:900, backgroundColor: greyTxt}}>
                        <Link component={LinkBehavior} to="/events" sx={{ fontWeight:900, color: lightBlue[400]}}>
                           Explore Events
                        </Link>
                    </Button>
                    <Button size={matchesMd ? "large" : "small"} variant="contained" sx={{ fontWeight:900, backgroundColor: greyTxt}}>
                        <Link component={LinkBehavior} to="/events/post-event" sx={{ fontWeight:'bold', color: lightBlue[400]}}>
                           SignIn To Post
                        </Link>
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}