import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Badge, { BadgeProps } from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Layout.scss";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { logout, selectIsAuth } from "../../store/auth";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Layout() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  useEffect(() => {
    if (!isAuth) {
    }
  }, [isAuth]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            Supershop
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to={"/cart"}
            sx={{
              color: "inherit",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              height: "70px",
            }}
          >
            <StyledBadge badgeContent={4} color="secondary">
              <ShoppingCartIcon sx={{ mr: 0.5 }} />
            </StyledBadge>
          </Button>
          {!isAuth ? (
            <Button
              color="inherit"
              component={Link}
              to={"/auth"}
              sx={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="material-icons-outlined">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                  </g>
                </svg>
              </span>
              <span className="login_word">Login</span>
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <LogoutIcon />
              <span className="login_word">Logout</span>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DrawerHeader>
          <ListItemButton
            component={Link}
            to="/products"
            onClick={handleDrawerClose}
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <ListItemText primary={"All products"} />
          </ListItemButton>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["beauty", "fragrances", "furniture", "groceries"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={`/products/${text}`}
                onClick={handleDrawerClose}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ListItemText
                  primary={text.charAt(0).toUpperCase() + text.slice(1)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: "64px", // высота AppBar (важно!)
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
