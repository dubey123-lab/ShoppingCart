import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { showProduct } from "../../../Redux/Actions/Action";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  div: {
    display: "flex",
  },
  griditem: {
    flexGrow: 1,
  },
  root: {
    maxWidth: 345,
    marginTop: 40,
    marginLeft: 50,
  },
  cardbtn: {
    display: "flex",
    justifyContent: "center",
  },
  searchbar: {
    marginLeft: "auto",
    marginTop: 50,
  },
});

function DisplayProduct(props) {
  console.log("<!----- props------", props);
  const classes = useStyles();
  const { showProduct } = props;
  useEffect(() => {
    const loadData = async () => {
      await showProduct();
    };
    loadData();
  }, []);

  const products = props?.productData?.cartReducer?.product || [];
  console.log("<!---- product is ------", products);

  const [searchProduct, setsearchProduct] = useState("");

  const fillterProduct = products.filter((item) => {
    if (searchProduct == "") return item;
    else if (item.productname.indexOf(searchProduct) !== -1) return item;
    else if (item.brand.indexOf(searchProduct) !== -1) return item;
    else if (item.price.indexOf(searchProduct) !== -1) return item;
  });

  console.log("<!---- fillterProduct -----", fillterProduct);

  return (
    <>
      <div className={classes.div}>
        <Grid container className={classes.griditem}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" direction="row">
              <Grid item className={classes.searchbar}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="text"
                  placeholder="Search Product"
                  value={searchProduct}
                  onChange={(e) => {
                    setsearchProduct(e.target.value);
                  }}
                  InputProps={{
                    style: { width: 228 },
                    endAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              {fillterProduct.map((product) => (
                <Grid item key={product.id}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={product.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.productname} &nbsp; &nbsp; {product.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardbtn}>
                      <NavLink exact to={`/product_detail/${product.id}`}>
                        <Button size="small">View Product</Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  productData: state,
});
const mapDispatchToProps = (dispatch) => {
  return {
    showProduct: () => dispatch(showProduct()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayProduct);
