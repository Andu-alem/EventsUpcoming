import Divider from "@mui/material/Divider"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer() {
    return (
        <Box align="center" sx={{ mt: 3 }}>
            <Divider />
            <Typography color="text.secondary" sx={{ my: 2 }}>
                Developed by : Andualem &copy; 2024
            </Typography>
        </Box>
    )
}