import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { DELETE_CART } from "../../../Redux/Actions/Constaint";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    marginTop: 20,
  },
  paper: {
    boxShadow: "none",
  },
  checkout: {
    backgroundColor: "orange",
  },
}));

const AddtoCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cartReducer);
  console.log("<!------- store data in add to cart ------------!>", cartdata);
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item xs={9}>
              <Grid item>
                <Paper className={classes.paper}>
                  <TableContainer component={Paper} className={classes.paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        {cartdata.cart.length > 0 ? (
                          <TableRow>
                            <TableCell>Product Image</TableCell>
                            <TableCell align="right">Product Name</TableCell>
                            <TableCell align="right">Brand Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Action</TableCell>
                          </TableRow>
                        ) : (
                          ""
                        )}
                      </TableHead>
                      <TableBody>
                        {cartdata.cart.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell component="th" scope="row">
                              <img
                                src={item.image}
                                height="100px"
                                width="100px"
                              />
                            </TableCell>
                            <TableCell align="right">
                              {item.productname}
                            </TableCell>
                            <TableCell align="right">{item.brand}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">
                              <DeleteIcon
                                onClick={() => {
                                  dispatch({
                                    type: DELETE_CART,
                                    payload: item.id,
                                  });
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              {cartdata.cart.length > 0 ? (
                <Paper style={{ backgroundColor: "orange" }}>
                  <Box pt={3}>
                    <Typography variant="subtitle2">CheckOut</Typography>
                  </Box>
                  <Box pt={5}>
                    <Typography variant="subtitle2">
                      Total items :- {cartdata.qty}
                    </Typography>
                  </Box>

                  <Box pt={2}>
                    <Typography variant="subtitle2">
                      Total Price :- {cartdata.totalPrice}
                    </Typography>
                  </Box>

                  <Box pt={3}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "darkturquoise" }}
                    >
                      Make Payment
                    </Button>
                  </Box>
                </Paper>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddtoCart;
