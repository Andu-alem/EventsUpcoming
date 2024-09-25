import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Close from '@mui/icons-material/Close'


const style = {
    position: 'absolute',
    top: '15%',
    left: '15%',
    transform: 'translate(-10%, -10%)',
    width: '90%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: "scroll"
};
export default function Detail(props){
    let { title, description, startingDate, postDate, imageUrl } = props.data
    let stringDate = (new Date(startingDate)).toString()
    let [day, month, date, year, time] = stringDate.split(" ");
    return (<>
        <Box sx={style}>
            <Box 
                align="center"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}
            >
                <Typography 
                    id="modal-modal-title" 
                    variant="h4" 
                    component="h2"
                    sx={{ flexGrow: 2}}
                >
                    { title.toUpperCase() }
                </Typography>
                <Button  sx={{ flexGrow: 1 }}>Add to schedule</Button>

                <IconButton onClick={ props.handleClose } sx={{ flexGrow: 1 }}>
                    <Close />
                </IconButton>
            </Box>
            <Divider />
            <Grid container id="modal-modal-description" sx={{ m : 5 }}>
                <Grid size={{ sm: 7 }}>
                    <Box align="center" sx={{ height: '47vh'}}>
                        <img src={ imageUrl } width='90%' height='100%' />
                    </Box>
                </Grid>
                <Grid size={{ sm : 5 }}>
                    <Typography
                        sx={{ 
                            color: 'text.secondary',
                            fontSize:17,
                            fontWeight: 'bold',
                            mb:2
                        }}
                    >
                        On : { `${month}-${date}-${year} @ ${time}` }
                    </Typography>
                    <Typography color="text.secondary">
                        { description }
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </>)
}