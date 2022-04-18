import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ADMIN } from "../../helpers/consts";
import { Button } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useProducts } from "../../contexts/ProductContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const {
    handleLogout,
    user: { email },
  } = useAuth();

  const { cart } = useProducts();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {email ? (
        <MenuItem
          sx={{
            display: "block",
            fontFamily: "Monospace",
            color: "black",
          }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      ) : null}

      {email === ADMIN ? (
        <MenuItem onClick={() => navigate("admin")}>admin</MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "sticky",
        top: "0",
        width: "1030px",
        margin: "0 auto",
        zIndex: "99",
      }}
    >
      <AppBar
        position="static"
        sx={{
          paddingTop: "50px",
          boxShadow: "none",
          backgroundColor: "black",
          // background:
          //   "linear-gradient(180deg, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 70%, rgba(255,255,255,0) 90%, rgba(255,255,255,0) 100%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              "&:hover": { color: "red" },
            }}
          >
            <img
              src="https://makers.courses/static/media/logo.0abbd97a.svg"
              style={{
                backgroundColor: "white",
                padding: "5px",
                width: "100px",
              }}
            />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box
            sx={{
              display: "flex",
              width: "250px",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ cursor: "pointer", "&:hover": { color: "red" } }}
              onClick={() => navigate("/")}
            >
              HOME
            </Typography>

            <Typography
              sx={{ cursor: "pointer", "&:hover": { color: "red" } }}
              onClick={() => navigate("/list")}
            >
              LIST
            </Typography>
            <Typography
              sx={{ cursor: "pointer", "&:hover": { color: "red" } }}
              onClick={() => navigate("/auth")}
            >
              REGISTER
            </Typography>
            <Typography
              sx={{ cursor: "pointer", "&:hover": { color: "red" } }}
              onClick={() => navigate("/chat")}
            >
              CHAT
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/cart">
              <Button>
                <IconButton>
                  <Badge
                    sx={{ color: "white" }}
                    color="error"
                    badgeContent={cart?.products ? cart.products.length : 0}
                  >
                    <BookmarkBorderIcon />
                  </Badge>
                </IconButton>
              </Button>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
