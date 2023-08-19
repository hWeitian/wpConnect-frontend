import { useState } from "react";
import useGetAccessToken from "../hooks/useGetAccessToken";
import ConferenceForm from "../components/ConferenceForm";
import PageHeader from "../components/PageHeader";
import { useForm, useFieldArray } from "react-hook-form";
import { addConference } from "../services/conferences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";

const AddConference = () => {
  const [selectedCountries, setSelectedCountries] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const queryClient = useQueryClient();
  const [setOpenFeedback, setFeedbackMsg, setFeedbackSeverity] =
    useOutletContext();
  const navigate = useNavigate();
  const getAccessToken = useGetAccessToken();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      country: { value: "", label: "" },
      venue: "",
      url: "",
      roomItems: [{ name: "" }],
    },
  });

  const {
    fields: rooms,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "roomItems",
  });

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Function to add data to database
  const { mutate: addConferenceToDb, isLoading } = useMutation(
    async (data) => {
      const accessToken = await getAccessToken();
      return addConference(accessToken, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["conferences"], { exact: true });
        reset();
        navigate("/");
        setOpenFeedback(true);
        setFeedbackSeverity("success");
        setFeedbackMsg(`Conference Added`);
      },
    }
  );

  const onSubmit = (data) => {
    data.startDate = startDate;
    data.endDate = endDate;
    data.country = selectedCountries.value;
    // console.log(data);
    addConferenceToDb(data);
  };

  return (
    <>
      <PageHeader hasButton={false}>Add Conference</PageHeader>
      <ConferenceForm
        onSubmit={onSubmit}
        control={control}
        handleSubmit={handleSubmit}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        loading={isLoading}
        append={append}
        remove={remove}
        rooms={rooms}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onDateChange={onDateChange}
      />
    </>
  );
};

export default AddConference;
