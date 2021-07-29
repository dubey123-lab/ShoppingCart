import React, { useState } from "react";
import "../Css/jobprefer.css";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  subtitle2: {
    fontWeight: 700,
  },
  paper: {
    height: 550,
  },
});

const Addproduct = (props) => {
  const classes = useStyles();

  /////  useEffect Hook of Product Data
  const [productData, setproductData] = useState({
    productname: "",
    description: "",
    price: "",
    brand: "",
    quantity: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name === "fileInput") {
      const value = e.target.files[0];
      const base64 = await convertBase64(value);
      console.log("!-----Image Converted base 64 -----------!", base64);
      const imageObj = { ...productData, image: base64 };
      setproductData(imageObj);
    } else {
      setproductData({ ...productData, [name]: value });
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  ///// Add Product

  const addProduct = () => {
    axios.post("http://localhost:3000/product", productData).then((res) => {
      console.log(res);
    });
    setproductData({
      productname: "",
      description: "",
      price: "",
      brand: "",
      quantity: "",
    });
  };
  console.log("<!--- produc data ------>", productData);

  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justifyContent="center" direction="row">
              <Paper
                variant="outlined"
                elevation={0}
                style={{ width: "600px", height: "auto", marginTop: "80px" }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  className="typograph_title"
                >
                  Add Product
                </Typography>
                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Product Name
                    </Typography>
                  </Box>

                  <TextField
                    variant="outlined"
                    size="small"
                    name="productname"
                    type="text"
                    value={productData.productname}
                    placeholder="Enter Product Name"
                    inputProps={{ style: { width: 228 } }}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Brand Name
                    </Typography>
                  </Box>

                  <TextField
                    variant="outlined"
                    size="small"
                    name="brand"
                    type="text"
                    value={productData.brand}
                    placeholder="Enter Brand Name"
                    inputProps={{ style: { width: 228 } }}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Product Description
                    </Typography>
                  </Box>

                  <TextField
                    variant="outlined"
                    size="small"
                    name="description"
                    type="text"
                    value={productData.description}
                    placeholder="Enter Product Description"
                    inputProps={{ style: { width: 228 } }}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Product Price
                    </Typography>
                  </Box>

                  <TextField
                    variant="outlined"
                    size="small"
                    name="price"
                    type="text"
                    value={productData.price}
                    placeholder="Enter Product Price"
                    inputProps={{ style: { width: 228 } }}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Product Quantity
                    </Typography>
                  </Box>

                  <TextField
                    variant="outlined"
                    size="small"
                    name="quantity"
                    type="text"
                    value={productData.quantity}
                    placeholder="Enter Product Price"
                    inputProps={{ style: { width: 228 } }}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Typography
                      variant="subtitle2"
                      className={classes.subtitle2}
                    >
                      Product Image
                    </Typography>
                  </Box>

                  <TextField
                    variant="outlined"
                    size="small"
                    name="fileInput"
                    type="file"
                    inputProps={{ style: { width: 228 } }}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.item}>
                  <Box marginTop={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={addProduct}
                    >
                      Add Product
                    </Button>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Addproduct;
