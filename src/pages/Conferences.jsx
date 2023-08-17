import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import useGetAccessToken from "../hooks/useGetAccessToken";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getConferences } from "../services/conferences";

const Conferences = () => {
  const getAccessToken = useGetAccessToken();

  let rows = [];

  const {
    data: conferences,
    isLoading: isConferenceLoading,
    isFetching: isConferenceFetching,
  } = useQuery({
    queryKey: ["conferences"],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      return getConferences(accessToken);
    },
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
  });

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      editable: false,
    },
    {
      field: "venue",
      headerName: "Venue",
      width: 300,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      editable: false,
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "number",
      width: 120,
      editable: false,
    },
  ];

  if (conferences && conferences.length > 0) {
    rows = conferences.map((conference) => {
      return {
        id: conference.id,
        name: conference.name,
        venue: conference.venue,
        country: conference.country,
        startDate: conference.startDate,
        endDate: conference.endDate,
      };
    });
  }

  return (
    <>
      <PageHeader
        hasButton={true}
        linkPath="/add-conference"
        title="Conference"
      >
        Conferences
      </PageHeader>
      <DataTable
        checkboxSelection={false}
        columns={columns}
        rows={rows}
        isDataLoading={isConferenceLoading}
      />
    </>
  );
};

export default Conferences;
