import { useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import useGetAccessToken from "../hooks/useGetAccessToken";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContacts } from "../services/contacts";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Contacts = () => {
  const getAccessToken = useGetAccessToken();
  let rows = [];
  const [hoverRowId, setHoverRowId] = useState(null);

  const {
    data: contacts,
    isLoading: isContactsLoading,
    isFetching: isContactsFetching,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      return getContacts(accessToken);
    },
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
  });

  const columns = [
    { field: "firstName", headerName: "First Name", width: 180 },
    { field: "lastName", headerName: "Last Name", width: 180 },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      editable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 120,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: false,
    },
    {
      field: "organisation",
      headerName: "Organization",
      width: 200,
      editable: false,
    },
    {
      field: "delete",
      headerName: "",
      width: 20,
      sortable: false,
      renderCell: (params) => {
        const deleteClicked = () => {
          console.log("delete clicked for", params.row.id);
          // setOpenConfirmation(true);
          // setSelectedRow(params.row);
        };
        return (
          +hoverRowId === params.row.id && (
            <IconButton onClick={deleteClicked}>
              <DeleteIcon sx={{ fontSize: 21 }} />
            </IconButton>
          )
        );
      },
    },
  ];

  const handleHiddenIconOpen = (event) => {
    setHoverRowId(event.currentTarget.parentElement.dataset.id);
  };

  const handleHiddenIconClose = () => {
    setHoverRowId(null);
  };

  if (contacts && contacts.length > 0) {
    // console.log(contacts);
    rows = contacts.map((contact) => {
      return {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        country: contact.country,
        title: contact.title,
        email: contact.email,
        organisation: contact.organisation,
      };
    });
  }

  return (
    <>
      <PageHeader hasButton={true} linkPath="/add-contact" title="Contact">
        Contacts
      </PageHeader>
      <DataTable
        checkboxSelection={false}
        columns={columns}
        rows={rows}
        isDataLoading={isContactsLoading}
        handleHiddenIconOpen={handleHiddenIconOpen}
        handleHiddenIconClose={handleHiddenIconClose}
      />
    </>
  );
};
export default Contacts;
