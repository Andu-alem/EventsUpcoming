import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import SideNavigation from './SideNavigation'

export default function SideBar(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box sx={{ width:200, display: { xs:'none', md:'block' }}} position="fixed">
            <SideNavigation />
        </Box>
    )
}
