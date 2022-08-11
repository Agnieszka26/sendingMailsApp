import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Params from "../../params";

import {
  Modal,
  Grid,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  Box,
} from "@mui/material";

import {useForm} from "react-hook-form";


const FormPassword = ({handleCloseModal}) => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {errors},
    
  } = useForm();

  const onGoToApp = () => {
    handleCloseModal();
    console.log("udalo sie przejsc");
    navigate("/users");
  };
  return (
    <form onSubmit={handleSubmit(onGoToApp)}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item padding={3}>
          <>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              type="password"
              id="password"
              aria-describedby="my-helper-text"
              {...register("password", {
                required: Params.messagePassword,
                validate: (val) => {
                  if (val !== Params.myPassword) {
                    return Params.messagePassword;
                  }
                  return;
                },
              })}
            />
          </>

          <FormHelperText style={{color: "red"}} id="my-helper-text">
            {errors?.password?.message}
          </FormHelperText>
        </Grid>

        <Button variant="contained" type="submit" size="large">
          Go to App
        </Button>
      </Grid>
    </form>
  );
};

function Password() {
  const [handleModal, setHandleModal] = useState(true);

  const handleCloseModal = () => {
    setHandleModal(false);
  };
  return (
    <div>
      <Modal
        open={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <Box
          sx={{
            width: 400,
            height: 500,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormPassword handleCloseModal={handleCloseModal} />
        </Box>
      </Modal>
    </div>
  );
}

export default Password;
