import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { style } from '@mui/system';
import { Button, InputBase } from '@mui/material';
import "./Navbar.scss";
import { Link, withRouter } from 'react-router-dom';
import Stack from '@mui/material/Stack';



const settings = ['Profile', 'Account', 'Logout'];


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledInputBase = style(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const SearchIconWrapper = style('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const onLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_user");
    window.location.replace('/')
  }


  const authUser = JSON.parse(localStorage.getItem("auth_user"));
  const isLogged = localStorage.getItem('access_token') !== '' && localStorage.getItem('access_token');

  return (

    <>
      <AppBar position="static" id="navbar">
        <div className="wrap-container">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                FLIGHT T5
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >

                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <div className="list-menu">
                  <div className="hotline">
                    <img
                      src="https://i.postimg.cc/ZnB4qS7v/Icon24h.png"
                      className="icon-24h"
                    />
                    <div className="hotline-info">
                      <Typography
                        variant="body1"
                        className="title"
                      >
                        Hotline
                      </Typography>
                      <Typography
                        variant="h6"
                        className="phone"
                      >
                        09111789JQK
                      </Typography>
                      <Typography
                        variant="h6"
                        className="phone"
                      >
                        -
                      </Typography>
                      <Typography
                        variant="h6"
                        className="phone"
                      >
                        09789789JQK
                      </Typography>
                    </div>
                  </div>
                </div>
              </Box>
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
              >
              </IconButton>
              {
                isLogged
                  ? <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    Hi, {authUser && authUser.Name}
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
                      {settings.map((setting, index) => (
                        <Link
                          key={index}
                          to="/profile"
                          className='profile'
                          style={{ textDecoration: 'none' }}>
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                    <Stack
                    className='logout-btn'
                     spacing={2} direction="row">
                      <Button
                        onClick={onLogOut}
                        variant="outlined"
                      >
                        Log Out
                      </Button>
                    </Stack>
                  </Box>
                  :
                  <Stack className="account-register">
                    <div>
                      <Stack
                        className="login"
                        direction="row">
                        <Button
                          variant="outlined">
                          <Link
                            style={{ textDecoration: 'none' }}
                            to="/signin" >
                            Login
                          </Link>
                        </Button>
                      </Stack>
                    </div>
                    <div>
                      <Stack
                        className="signup"
                        direction="row">
                        <Button variant="outlined">
                          <Link
                            style={{ textDecoration: 'none' }}
                            to="/signup" >
                            SignUp
                          </Link>
                        </Button>
                      </Stack>
                    </div>

                  </Stack>
              }
            </Toolbar>
          </Container>
        </div>
      </AppBar>
    </>
  )
}
export default withRouter(Navbar);
