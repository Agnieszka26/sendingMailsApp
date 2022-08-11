import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";

import React, {useState} from "react";

const InputMultipleLines = ({value, register, name}) => {
  const [valueI, setValueI] = useState(value);
  return (
    <TextField
      id="standard-textarea"
      label={name}
      placeholder={name}
      fullWidth
      multiline
      rows={4}
      variant="standard"
      value={valueI}
      {...register}
      onChange={(e) => {
        setValueI(e.target.value);
      }}
      sx={{p: 3}}
    />
  );
};

function CustomInput({
  name,
  register,
  id,
  htmlFor,
  errors,
  isAddCampaign,
  value,
  isEditCampaign,
}) {
  return (
    <FormControl>
      {isAddCampaign ? (
        <InputMultipleLines
          name={name}
          id={id}
          htmlFor={htmlFor}
          errors={errors}
          isAddCampaign={isAddCampaign}
          value={value}
          isEditCampaign={isEditCampaign}
          register={register}
        />
      ) : (
        <>
          <InputLabel
            color={isAddCampaign ? "success" : "secondary"}
            htmlFor={htmlFor}
          >
            {name}
          </InputLabel>
          <Input
            color={isAddCampaign ? "success" : "secondary"}
            id={id}
            aria-describedby="my-helper-text"
            {...register}
          />
        </>
      )}
      {name === "name" && (
        <FormHelperText style={{color: "red"}} id="my-helper-text">
          {errors?.name?.message}
        </FormHelperText>
      )}
      {name === "email" && (
        <FormHelperText style={{color: "red"}} id="my-helper-text">
          {errors?.email?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomInput;
