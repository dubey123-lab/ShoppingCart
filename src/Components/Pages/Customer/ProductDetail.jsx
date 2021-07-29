import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, FETCH_PRODUCT } from "../../../Redux/Actions/Constaint";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    flexGrow: 1,
  },
  card: {
    heigth: "auto",
    width: "100%",
    border: "none",
    boxShadow: "none",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cartbtn: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const ProductDetail = () => {
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.cartReducer);
  console.log("<!------- store data ------------!>", productData);
  const { fetchProduct } = productData;

  useEffect(() => {
    dispatch({
      type: FETCH_PRODUCT,
      id,
    });
  }, [id]);

  const [quantity, setquantity] = useState(1);

  const decrementQty = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={productData.fetchProduct.image}
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardContent height="auto">
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {productData.fetchProduct.brand}
              </Typography>
              <Typography variant="h5" component="h2">
                {productData.fetchProduct.productname}
              </Typography>
              <Typography variant="body2" component="p">
                {productData.fetchProduct.description}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {`Rs:-${productData.fetchProduct.price}`}
              </Typography>

              <Box
                mt={4}
                component="span"
                display="flex"
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.classbtn}
                  onClick={decrementQty}
                >
                  -
                </Button>
                <Typography variant="subtitle1" m={2}>
                  {quantity}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.classbtn}
                  onClick={() => setquantity(quantity + 1)}
                >
                  +
                </Button>
              </Box>
            </CardContent>
            <CardActions className={classes.cartbtn}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  dispatch({
                    type: ADD_TO_CART,
                    payload: { fetchProduct, quantity },
                  });
                }}
              >
                ADD CART
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
