import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Params from "../../params";
import { ContextList } from "../Context";
import styles from "./UserList.module.css";

const columns = [
  {field: "id", headerName: "id", width: 70},
  {field: "Name", headerName: "Name", width: 230},
  {field: "Email", headerName: "Email", width: 230},
  {
    field: "Date",
    headerName: "Date",
    width: 230,
  },
];

function UserList() {
  const {URL, myBase, usersPhrase, apiKey} = Params;
  const context = useContext(ContextList);
  const {users, setUsers} = context;
  let navigate = useNavigate();
  const handleOnCellClick = (params) => {
    const {id} = params.row;
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    fetch(URL + myBase + "/" + usersPhrase, {
      headers: {
        Authorization: `Bearer ${apiKey} `,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data.records));
  }, [users,  URL, apiKey, myBase, setUsers, usersPhrase]);

  const rows = users?.map((user) => {
    return user.fields;
  });
  return (
    <>
      <Typography variant="h3" component="div" align="center" sx={{ p: 3 }}>
        Users List
      </Typography>
      <Container maxWidth="xl">
        <div className={styles.container}>
          {rows !== undefined && (
            <div className={styles.containerFlex}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onCellClick={handleOnCellClick}
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default UserList;
