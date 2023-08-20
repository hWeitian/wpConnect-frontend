import { useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import useGetAccessToken from "../hooks/useGetAccessToken";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContacts } from "../services/contacts";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useOutletContext } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { deleteContact } from "../services/contacts";

const Contacts = () => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [hoverRowId, setHoverRowId] = useState(null);
  const [setOpenFeedback, setFeedbackMsg, setFeedbackSeverity] =
    useOutletContext();
  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let rows = [];

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

  const { mutate: deleteContactMutation, isLoading: isDeleting } = useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessToken();
      return deleteContact(accessToken, selectedRowId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"], { exact: true });
      setOpenFeedback(true);
      setFeedbackSeverity("success");
      setFeedbackMsg(`Contact Deleted`);
      setSelectedRowId(null);
    },
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
        const deleteClicked = (event) => {
          event.stopPropagation();
          console.log("delete clicked for", params.row.id);
          setOpenConfirmation(true);
          setSelectedRowId(params.row.id);
        };
        return (
          +hoverRowId === params.row.id && (
            <IconButton onClick={(event) => deleteClicked(event)}>
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

  const handleRowClick = (params) => {
    navigate(`/contacts/${params.row.id}`);
  };

  const handleDelete = () => {
    deleteContactMutation();
    setOpenConfirmation(false);
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
        handleRowClick={handleRowClick}
      />
      <ConfirmationModal
        open={openConfirmation}
        setOpenConfirmation={setOpenConfirmation}
        handleDelete={handleDelete}
        title="Delete Contact"
      >
        Are you sure you want to delete this contact? This action cannot be
        undone.
      </ConfirmationModal>
    </>
  );
};
export default Contacts;
