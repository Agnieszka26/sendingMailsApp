import {Button, ButtonGroup, Modal, Container} from "@mui/material";
import React, {useContext} from "react";
import {ContextList} from "../Context";
import Form from "../Form/Form";
function Buttons({isCampaign}) {
  const context = useContext(ContextList);
  const {
    openFormToAddUser,
    setOpenFormToAddUser,
    openFormToAddCampaign,
    setOpenFormToAddCampaign,
  } = context;

  const showFormToAddUser = () => {
    setOpenFormToAddUser(true);
  };
  const handleCloseToAddUser = () => {
    setOpenFormToAddUser(false);
  };
  const handleCloseToAddCampaign = () => {
    setOpenFormToAddCampaign(false);
  };
  const showFormToAddCampaign = () => {
    setOpenFormToAddCampaign(true);
  };
  return (
    <>
      <Container  sx={{ p: 3 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {!isCampaign && (
            <Button variant="contained" onClick={showFormToAddUser}>
              ADD NEW SUBSCRIBER
            </Button>
          )}
          <Button variant="outlined" onClick={showFormToAddCampaign}>
            Create new campaign
          </Button>
        </ButtonGroup>
      </Container>

      <Modal
        open={openFormToAddUser}
        onClose={handleCloseToAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <Form />
      </Modal>
      <Modal
        open={openFormToAddCampaign}
        onClose={handleCloseToAddCampaign}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <Form isAddCampaign={true} />
      </Modal>
    </>
  );
}

export default Buttons;
