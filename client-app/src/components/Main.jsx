import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import EventList from './EventList'
import SideBar from './SideBar'
import RightSideBar from './RightSideBar'

export default function Main(){
    return (
        <Box sx={{ width:'98%', mx:"auto"}}>
            <Grid container spacing={1} sx={{mt:10}}>
                <Grid size={{ sm:'none', md:3, lg:2 }}>
                    <SideBar />
                </Grid>
                <Grid size={{ sm:12, md:6, lg:8 }}>
                    <EventList />
                </Grid>
                <Grid size={{ sm:'none', md:3, lg:2 }}>
                    <RightSideBar />
                </Grid>
            </Grid>
        </Box>
    )
}
