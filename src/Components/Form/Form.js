import {Box, Button, ButtonGroup, Grid} from "@mui/material";
import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {
  addUser,
  sendMgEmail,
  submitCampaign,
  updateRecordEmailDetail,
} from "../../utils";
import {ContextList} from "../Context";
import CustomInput from "./Input";

const Form = ({isAddCampaign, filtered, isEditCampaign}) => {
  const context = useContext(ContextList);
  const {
    setOpenFormToAddUser,
    setOpenFormToAddCampaign,
    users,
    setOpenFormToEditCampaign,
  } = context;
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmitUser = ({name, email}) => {
    addUser(name, email);
    setOpenFormToAddUser(false);
  };

  const onSubmitCampaign = ({subject, content}) => {
    sendMgEmail("from@gmail.com", users, subject, content);
    submitCampaign(subject, content, filtered);
    setOpenFormToAddCampaign(false);
    console.log("udało sie wysłać maila");
    navigate("/campaign");
  };

  const saveLater = (e) => {
    updateRecordEmailDetail(filtered, e.subject, e.content);
    setOpenFormToAddCampaign(false);
    setOpenFormToEditCampaign(false);
    console.log("udało sie zapisac na pozniej maila");
    navigate("/campaign");
  };
  return (
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
      {isAddCampaign ? (
        <form onSubmit={handleSubmit(onSubmitCampaign)}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item padding={3}>
              {isEditCampaign === true ? (
                <CustomInput
                  name="subject"
                  id="subject"
                  htmlFor="subject"
                  errors={errors}
                  register={register("subject", {
                    required: "Subject is required",
                  })}
                  isAddCampaign={isAddCampaign}
                  value={filtered[0].fields.subject}
                />
              ) : (
                <CustomInput
                  name="subject"
                  id="subject"
                  htmlFor="subject"
                  errors={errors}
                  register={register("subject", {
                    required: "Subject is required",
                  })}
                  isAddCampaign={isAddCampaign}
                />
              )}
              {isEditCampaign === true ? (
                <CustomInput
                  value={filtered[0].fields.content}
                  name="content"
                  id="content"
                  htmlFor="content"
                  errors={errors}
                  register={register("content", {
                    required: "content is required",
                  })}
                  isAddCampaign={isAddCampaign}
                />
              ) : (
                <CustomInput
                  name="content"
                  id="content"
                  htmlFor="content"
                  errors={errors}
                  register={register("content", {
                    required: "Content is required",
                  })}
                  isAddCampaign={isAddCampaign}
                />
              )}
            </Grid>
            <Grid item padding={3}></Grid>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                variant="contained"
                type="button"
                size="large"
                onClick={handleSubmit(saveLater)}
              >
                Save for later
              </Button>
              <Button
                variant="outlined"
                color="success"
                type="submit"
                size="large"
              >
                Send an email
              </Button>
            </ButtonGroup>
          </Grid>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmitUser)}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item padding={3}>
              <CustomInput
                name="name"
                id="name"
                htmlFor="name"
                errors={errors}
                register={register("name", {required: "Name is required"})}
              />
            </Grid>
            <Grid item padding={3}>
              <CustomInput
                name="email"
                id="email"
                htmlFor="email"
                errors={errors}
                register={register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              size="large"
            >
              Add new subscriber
            </Button>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default Form;
