import React, {createContext, useState} from "react";
export const ContextList = createContext();

export const ContextProvider = ({children}) => {
  const [openFormToAddUser, setOpenFormToAddUser] = useState(false);
  const [openFormToAddCampaign, setOpenFormToAddCampaign] = useState(false);
  const [openFormToEditCampaign, setOpenFormToEditCampaign] = useState(false);
  const [users, setUsers] = useState();

  const values = {
    openFormToAddUser,
    setOpenFormToAddUser,
    openFormToAddCampaign,
    setOpenFormToAddCampaign,
    openFormToEditCampaign,
    setOpenFormToEditCampaign,
    users,
    setUsers,
  };
  return <ContextList.Provider value={values}>{children}</ContextList.Provider>;
};
