import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Box } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { useSelector } from "react-redux";

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
  const productData = useSelector((state) => state.cartReducer);
  console.log("<!----- product data -----!> ", productData);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">
            {" "}
            <NavLink
              exact
              to="/product_list"
              style={{ textDecoration: "none", color: "white" }}
            >
              Home{" "}
            </NavLink>
          </Button>

          <Typography variant="h6" className={classes.title}>
            Shopping Cart
          </Typography>

          <Button color="inherit">
            {" "}
            <NavLink
              exact
              to="/display_product"
              style={{ textDecoration: "none", color: "white" }}
            >
              Admin Panel{" "}
            </NavLink>
          </Button>

          {/* <Button color="inherit">
            {" "}
            <NavLink
              exact
              to="/display_product"
              style={{ textDecoration: "none", color: "white" }}
            >
              View Product{" "}
            </NavLink>
          </Button> */}

          <Box>
            <NavLink exact to="/cartlist">
              <Badge color="secondary" badgeContent={productData.qty}>
                <ShoppingCartIcon />{" "}
              </Badge>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
