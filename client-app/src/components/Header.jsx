import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Divider,
    Drawer,
    Tooltip,
    Menu,
    MenuItem,
    Link
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MoreIcon from '@mui/icons-material/MoreVert'
import DarkMode from '@mui/icons-material/DarkMode'
import SideNavigation from './SideNavigation'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'


const drawerWidth = '70%';
const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

export default function Header(props){
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('md'))


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'flex-start', m:2}}>
                <ArrowBackIosIcon onClick={ handleDrawerToggle } />
                <Typography variant="h6" sx={{mx:4}}>
                    EventUpdater
                </Typography>
            </Box>
            <Divider />
            <SideNavigation />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ opacity: 0.9}}>
            <AppBar component="nav" color="inherit">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ 
                            flexGrow: 1, 
                            display: { xs: 'block', sm: 'block' }}}
                    >
                        <Link 
                            component={ LinkBehavior } 
                            to="/events"
                            sx={{ textDecoration:'none', color: 'text.primary'}}
                        >EventUpdater</Link>
                    </Typography>
                    <IconButton onClick={ props.toggleDarkMode }>
                            <DarkMode />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ display: matches ? 'none':'' }}>
                            <Link 
                                component={ LinkBehavior } 
                                to="/events/schedule"
                                sx={{ textDecoration:'none', color: 'text.primary'}}
                            >Schedule</Link>
                        </Button>
                        <Button>
                            <Link 
                                component={ LinkBehavior } 
                                to="/events/post-event"
                                sx={{ textDecoration:'none', color: 'text.primary'}}
                            >Post Event</Link>
                        </Button>
                        <Button>
                            <Link 
                                component={ LinkBehavior } 
                                to="https://andu-alem.github.io/"
                                sx={{ textDecoration:'none', color: 'text.primary'}}
                            >About</Link>
                        </Button>
                    </Box>
                    <Box sx={{ display: { sm: 'none' } }}>
                        <Tooltip title="Open more options">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <MoreIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link 
                                    component={ LinkBehavior } 
                                    to="/events/schedule"
                                    sx={{ textDecoration:'none', color: 'text.primary'}}
                                >Schedule</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link 
                                    component={ LinkBehavior } 
                                    to="/events/post-event"
                                    sx={{ textDecoration:'none', color: 'text.primary'}}
                                >Post Event</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link 
                                    component={ LinkBehavior } 
                                    to="https://andu-alem.github.io/"
                                    sx={{ textDecoration:'none', color: 'text.primary'}}
                                >About</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    )
}