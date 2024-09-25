import { useState, useContext } from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddTask from '@mui/icons-material/AddTask'
import Close from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import EventContext from '../context'


export default function SceduleList(){
    const [open, setOpen] = useState(false)
    const { task, removeTask } = useContext(EventContext)


    return (
        <Box>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Interested Events
                    </ListSubheader>
                }
            >
                {
                    task.length < 1 ? 
                    <Typography color="text.secondary">
                        No Event Schedule
                    </Typography> :
                    task.map((item, index) => {
                        let [day, month, date, year, time] = item.startingDate.split(" ")

                        return (
                            <Box key={ index }>
                                <Box 
                                    sx={{ 
                                        display: 'flex',  
                                        flexDirection: 'space-around'
                                    }}
                                >
                                    <ListItem>
                                        <ListItemIcon>
                                            <AddTask />
                                        </ListItemIcon>
                                        <ListItemText primary={ item.title } sx={{ wordWrap: 'break-word' }} />
                                    </ListItem>
                                    <ListItemIcon sx={{ mt: 2 }} onClick={ () => removeTask(item.id)}>
                                        <Close />
                                    </ListItemIcon>
                                </Box>
                                <Typography
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize:12,
                                        fontWeight: 'bold',
                                        ml: 3
                                    }}
                                >
                                    On : { `${month}-${date}-${year} @ ${time}` }
                                </Typography>
                                <Divider />
                            </Box>
                        )
                    })
                }
            </List>
        </Box>
    )
}