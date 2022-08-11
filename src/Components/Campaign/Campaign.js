import {Button, Modal, Typography} from "@mui/material";
import {Container} from "@mui/system";
import {DataGrid} from "@mui/x-data-grid";
import React, {useContext, useEffect, useState} from "react";
import {GiMailbox} from "react-icons/gi";
import {GrEdit} from "react-icons/gr";
import Params from "../../params";
import {deleteCampaign, sendMgEmail, updateRecordSended} from "../../utils";
import Buttons from "../Buttons/Buttons";
import {ContextList} from "../Context";
import Form from "../Form/Form";
import styles from "../UsersList/UserList.module.css";

function Campaign() {
  const context = useContext(ContextList);
  const {users, openFormToEditCampaign, setOpenFormToEditCampaign} = context;
  const [data, setData] = useState();
  const [chosenCampaign, setChosenCampaign] = useState();

  const handleCloseToEditCampaign = () => {
    setOpenFormToEditCampaign(false);
  };
  const handleOpenToEditCampaign = () => {
    setOpenFormToEditCampaign(true);
  };
  const {URL, apiKey, myBase, campaignPhrase} = Params;

  const columns = [
    {field: "id", headerName: "id", flex: 1, minWidth: 50},
    {field: "subject", headerName: "subject", flex: 3},
    {field: "content", headerName: "content", flex: 5},
    {
      field: "sended",
      headerName: "sended",
      flex: 1,
      minWidth: 50,

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          setChosenCampaign(
            data.filter((datum) => {
              return datum.fields.id === Number(params.row.id);
            })
          );

          handleOpenToEditCampaign();
        };
        const {sended} = params.row;

        return sended ? (
          <GiMailbox size="2rem" />
        ) : (
          <>
            <GrEdit size="3rem" onClick={onClick} />
            <Modal
              open={openFormToEditCampaign}
              onClose={handleCloseToEditCampaign}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "3rem",
              }}
            >
              <Form
                isAddCampaign
                isEditCampaign={true}
                filtered={chosenCampaign}
              />
            </Modal>
          </>
        );
      },
    },
    {
      field: "send an email",
      headerName: "send an email",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const {subject, content, id, sended} = params.row;
        const filtered = data.filter((datum) => {
          return datum.fields.id === Number(id);
        });
        const onClick = (e) => {
          e.stopPropagation();
          sendMgEmail("ada@gmail.com", users, subject, content);
          updateRecordSended(filtered);
        };

        return sended ? (
          <Button
            variant="contained"
            type="submit"
            size="large"
            disabled
            onClick={onClick}
          >
            Send an email
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            size="large"
            onClick={onClick}
          >
            Send an email
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "delete",
      flex: 1,
      minWidth: 50,

      renderCell: (params) => {
        const {id, sended} = params.row;
        const filtered = data.filter((datum) => {
          return datum.fields.id === Number(id);
        });
        const onClick = (e) => {
          e.stopPropagation();
          deleteCampaign(filtered);
        };

        return sended ? (
          <Button
            variant="contained"
            color="error"
            type="submit"
            size="large"
            disabled
            onClick={onClick}
          >
            Delete
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            type="submit"
            size="large"
            onClick={onClick}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    fetch(URL + myBase + "/" + campaignPhrase, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data.records));
  }, [data, URL, apiKey, campaignPhrase, myBase]);

  const rows = data?.map((datum) => {
    return datum.fields;
  });

  return (
    <>
      <Typography variant="h3" component="div" align="center" sx={{p: 3}}>
        Campaigns
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
              />
            </div>
          )}
        </div>
      </Container>
      <Buttons isCampaign={true} />
    </>
  );
}

export default Campaign;
