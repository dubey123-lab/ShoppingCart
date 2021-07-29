import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  TextField,
  Box,
  Typography,
  FormControl,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
const useStyles = makeStyles({
  searchbar: {
    marginLeft: "auto",
    marginTop: 50,
  },
  table: {
    minWidth: 650,
  },
  paper: {
    marginTop: 34,
  },
  image: {
    height: 100,
    width: 100,
  },
});

const Displayproduct = () => {
  const classes = useStyles();

  const [products, setproducts] = useState([]);
  const [searchProduct, setsearchProduct] = useState("");
  const [fillterProduct, setfillterProduct] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/product").then((res) => {
      const data = res.data;
      console.log("!=== responce =====!", res);
      setproducts(data);
    });
  }, []);

  const deleteProduct = (product_id) => {
    axios.delete(`http://localhost:3000/product/${product_id}`).then((res) => {
      axios.get("http://localhost:3000/product").then((res) => {
        const data = res.data;
        console.log("!=== responce =====!", res);
        setproducts(data);
      });
    });
  };
  const handleSearch = (e) => {
    setsearchProduct(e.target.value);
    const fillterdProduct = products.filter((item) => {
      if (searchProduct == "") return item;
      else if (item.productname.indexOf(searchProduct) !== -1) return item;
      else if (item.brand.indexOf(searchProduct) !== -1) return item;
      else if (item.price.indexOf(searchProduct) !== -1) return item;
    });
    setproducts(fillterdProduct);
  };

  const applyFillters = (e) => {
    setfillterProduct(e.target.value);
    const fetchfillterdProduct = products.filter((product) => {
      return product.brand.indexOf(e.target.value) !== -1;
    });
    console.log(
      "<!----- afther apply fillter is ------!>",
      fetchfillterdProduct
    );
    setproducts(fetchfillterdProduct);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justifyContent="center" direction="row">
            <Grid item>
              <Box mt={5}>
                <Typography variant="subtitle2">Select Brand</Typography>
              </Box>

              <FormControl variant="outlined" size="small">
                <Select
                  value={fillterProduct}
                  onChange={applyFillters}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"RealMe"}>RealMe</MenuItem>
                  <MenuItem value={"Xaiomi"}>Xaiomi</MenuItem>
                  {/* <MenuItem value={"11000 to 15000"}>11000 to 1</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.searchbar}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                type="text"
                placeholder="Search Product"
                value={searchProduct}
                onChange={handleSearch}
                // onChange={(e) => {
                //   setsearchProduct(e.target.value);
                // }}
                InputProps={{
                  style: { width: 228 },
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                // onChange={(e) => {
                //   setopenWorking(e.target.value);
                // }}
              />
            </Grid>
            <TableContainer component={Paper} className={classes.paper} mt={12}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Product Image</TableCell>
                    <TableCell align="left">Product Brand</TableCell>
                    <TableCell align="right">Product Name</TableCell>
                    <TableCell align="right">Product Description</TableCell>
                    <TableCell align="right">Product Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row">
                          <img src={item.image} className={classes.image} />
                        </TableCell>
                        <TableCell align="left">{item.brand}</TableCell>
                        <TableCell align="right">{item.productname}</TableCell>
                        <TableCell align="right">{item.description}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">
                          <DeleteIcon onClick={() => deleteProduct(item.id)} />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Box display="flex" justifyContent="center">
                      Data is not Found
                    </Box>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Displayproduct;
