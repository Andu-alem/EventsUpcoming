import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import ListAlt from '@mui/icons-material/ListAlt'
import AddTask from '@mui/icons-material/AddTask'
import Detail from './Detail'
import EventContext from '../context'


export default function Event(props) {
    const { title, description, startingDate, imageUrl, addedToSchedule } = props.data
    let stringDate = (new Date(startingDate)).toString()
    let [day, month, date, year, time] = stringDate.split(" ")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { addTask } = useContext(EventContext)

    return (
        <Card sx={{ minWidth:150 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={ imageUrl }
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: 20 }}>
                    { title.toUpperCase() }
                </Typography>
                <Typography
                    sx={{ 
                        color: 'text.secondary',
                        fontSize:15,
                        fontWeight: 'bold'
                    }}
                >
                    On : { `${month}-${date}-${year} @ ${time}` }
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt:1 }}>
                    { description.slice(0, 75) }
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                    size="small" 
                    disabled={ addedToSchedule } 
                    onClick={ () => addTask({ id: props.id, title, startingDate:stringDate})} 
                >
                    { addedToSchedule ? "Added" : "Add to"}
                    <AddTask sx={{ display: addedToSchedule ? 'block':'none' }} />
                    <ListAlt sx={{ display: addedToSchedule ? 'none':'block' }} />
                </Button>
                <Button size="small" onClick={handleOpen}>Learn More</Button>
            </CardActions>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Detail handleClose={ handleClose } data={ props.data } />
            </Modal>
        </Card>
    );
}
