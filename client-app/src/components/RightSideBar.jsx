import Box from '@mui/material/Box'
import ScheduleList from './ScheduleList'


export default function RightSideBar(){

    return (
        <Box sx={{ width:200, display: { xs:'none', md:'block' }}} position="fixed">
            <ScheduleList />
        </Box>
    )
}