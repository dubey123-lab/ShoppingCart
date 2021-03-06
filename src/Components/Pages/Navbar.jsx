import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shopping Cart
          </Typography>
          <Button color="inherit">
            {" "}
            <NavLink
              exact
              to="/"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Product{" "}
            </NavLink>
          </Button>
          <Button color="inherit">
            {" "}
            <NavLink
              exact
              to="/display_product"
              style={{ textDecoration: "none", color: "white" }}
            >
              View Product{" "}
            </NavLink>
          </Button>
          <Button color="inherit">
            {" "}
            <NavLink
              exact
              to="/product_list"
              style={{ textDecoration: "none", color: "white" }}
            >
              Customer Panel{" "}
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
