import React, {useContext} from "react";
import {ContextList} from "../Context";
import {useParams} from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function User() {
  const context = useContext(ContextList);
  const {users} = context;
  const params = useParams();

  const filtered = users.filter((user) => {
    return user.fields.id === Number(params.id);
  });

  return (
    <>
      <Typography variant="h3" component="div" align="center">
        User
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        {filtered && (
          <Card sx={{maxWidth: 475}}>
            <CardContent>
              <Typography
                sx={{fontSize: 14}}
                color="text.secondary"
                gutterBottom
              >
                {filtered[0].fields.Name}
              </Typography>
              <Typography variant="h5" component="div">
                {filtered[0].fields.Email}
              </Typography>
              <Typography sx={{mb: 1.5}} color="text.secondary">
                {filtered[0].fields.Date}
              </Typography>
              <Typography variant="body2">{filtered[0].fields.id}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
}

export default User;
