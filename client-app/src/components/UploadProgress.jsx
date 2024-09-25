import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '10%',
    height: '10%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
};
export default function UploadProgress(props) {

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{ 
                    position: 'relative', 
                    display: 'inline-flex',
                    mt: "40%",
                    ml: "40%",
                    backgroundColor: 'white',
                    width: '200px',
                    height: '100px'
                }}
            >
                <CircularProgress 
                    variant="determinate" 
                    value={ props.progress } 
                    size="3rem"
                    sx={{ ml: "70px", mt: "20px" }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ color: 'text.secondary', fontSize: 21 }}
                    >
                        {`${Math.round(props.progress)}%`}
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}