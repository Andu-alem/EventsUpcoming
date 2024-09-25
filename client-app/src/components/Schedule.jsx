import Container from '@mui/material/Container'
import ScheduleList from './ScheduleList'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'


export default function Schedule() {
    const theme = useTheme()
    const matchesSm = useMediaQuery(theme.breakpoints.up('sm'))
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'))
    return (
        <Container
            sx={{
                minHeight: '90vh',
                pt:12,
            }}
        > 
            <Box 
                sx={{
                    mx: matchesMd ? '30%' : matchesSm ? '10%' : '0%'
                }}>
                <ScheduleList />
            </Box>
        </Container>
    )
}