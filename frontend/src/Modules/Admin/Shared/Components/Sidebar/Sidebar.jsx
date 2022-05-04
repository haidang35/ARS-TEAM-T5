import React, { useState } from "react";
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import AirlinesIcon from '@mui/icons-material/Airlines';
import "./Sidebar.scss";
import Flight from "@mui/icons-material/Flight";
import AirplaneTicket from "@mui/icons-material/AirplaneTicket";
import Payments from "@mui/icons-material/Payments";
import Notifications from "@mui/icons-material/Notifications";
import { BrowserRouter, Link, NavLink } from "react-router-dom";

const data = [
  { icon: <People />, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: <People />, label: 'User' , path: '/admin/users'  },
  { icon: <Dns />, label: 'Booking', path: '/admin/bookings'  },
  { icon: <AirlinesIcon />, label: 'Airline', path: '/admin/airlines'  },
  { icon: <Public />, label: 'Location', path: '/admin/locations' },
  { icon: <AirplaneTicket />, label: 'Flight Ticket', path: '/admin/flight-tickets' },
  { icon: <Payments />, label: 'Payment', path: '/admin/payments' },
  { icon: <Flight />, label: 'Flight' , path: '/admin/flights' },
  { icon: <Notifications />, label: 'Notification', path: '/admin'},
];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});


export const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <div id="sidebar">
        <Box
          className="form-sidebar"
          sx={{ display: 'flex' }}>
          <ThemeProvider
            theme={createTheme({
              components: {
                MuiListItemButton: {
                  defaultProps: {
                    disableTouchRipple: true,
                  },
                },
              },
              palette: {
                mode: 'dark',
                primary: { main: 'rgb(102, 157, 246)' },
                background: { paper: 'rgb(5, 30, 52)' },
              },
            })}
          >
            <Paper elevation={0} sx={{ maxWidth: 256 }}>
              <FireNav component="nav" disablePadding>
                <ListItemButton component="a" href="/admin">

                  <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                  <ListItemText
                    sx={{ my: 0 }}
                    primary="Admin"
                    primaryTypographyProps={{
                      fontSize: 20,
                      fontWeight: 'medium',
                      letterSpacing: 0,
                    }}
                  />
                </ListItemButton>
                <Divider />
                <ListItem component="div" disablePadding>
                  <ListItemButton sx={{ height: 56 }}>
                    <ListItemIcon>
                      <Home color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Project Overview"
                      primaryTypographyProps={{
                        color: 'primary',
                        fontWeight: 'medium',
                        variant: 'body2',
                      }}
                    />
                  </ListItemButton>
                  <Tooltip title="Project Settings">
                    <IconButton
                      size="large"
                      sx={{
                        '& svg': {
                          color: 'rgba(255,255,255,0.8)',
                          transition: '0.2s',
                          transform: 'translateX(0) rotate(0)',
                        },
                        '&:hover, &:focus': {
                          bgcolor: 'unset',
                          '& svg:first-of-type': {
                            transform: 'translateX(-4px) rotate(-20deg)',
                          },
                          '& svg:last-of-type': {
                            right: 0,
                            opacity: 1,
                          },
                        },
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          height: '80%',
                          display: 'block',
                          left: 0,
                          width: '1px',
                          bgcolor: 'divider',
                        },
                      }}
                    >
                      <Settings />
                      <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                    </IconButton>
                  </Tooltip>
                </ListItem>
                <Divider />
                <Box
                  sx={{
                    bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                    pb: open ? 2 : 0,
                  }}
                >
                  <ListItemButton
                    alignItems="flex-start"
                    onClick={() => setOpen(!open)}
                    sx={{
                      px: 3,
                      pt: 2.5,
                      pb: open ? 0 : 2.5,
                      '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                    }}
                  >
                    <ListItemText
                      primary="Build"
                      primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                      }}
                      secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                      secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                      }}
                      sx={{ my: 0 }}
                    />
                    <KeyboardArrowDown
                      sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                      }}
                    />
                  </ListItemButton>
                  {open &&
                    data.map((item) => (
                      <Link to={item.path}>
                        <ListItemButton

                          key={item.label}
                          sx={{ py: 0, minHeight: 50, color: 'rgba(255,255,255,.8)' }}
                        >
                          <ListItemIcon sx={{ color: 'inherit' }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 18, fontWeight: 'medium' }}
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                </Box>
              </FireNav>
            </Paper>
          </ThemeProvider>
        </Box>
      </div>
    </>
  )
}