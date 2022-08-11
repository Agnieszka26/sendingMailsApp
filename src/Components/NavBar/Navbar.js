import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link } from "react-router-dom";
import styles from "../UsersList/UserList.module.css";

function Navbar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Container  maxWidth="xl">

          <Link to="/users" className={styles.navBarItem}>
            Users List
          </Link>

          <Link to="/campaign"  className={styles.navBarItem}>Campaigns</Link>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
