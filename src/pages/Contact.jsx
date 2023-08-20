import { useState, useRef, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useGetAccessToken from "../hooks/useGetAccessToken";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TabPanel, TabContext } from "@mui/lab";
import { getContact } from "../services/contacts";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import ImageInput from "../components/ImageInput";
import ScheduleTable from "../components/ScheduleTable";
import Dummy from "../assets/dummy.jpg";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { updateContact } from "../services/contacts";

const Contact = () => {
  const [tabSelection, setTabSelection] = useState("detail");
  const [photoPreviewLink, setPhotoPreviewLink] = useState("");
  const inputRef = useRef(null);
  const { contactId } = useParams();
  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();
  const [setOpenFeedback, setFeedbackMsg, setFeedbackSeverity] =
    useOutletContext();

  console.log("contact id: ", contactId);

  const {
    data: contactFromFetch,
    isSuccess: getContactSuccess,
    isLoading: getContactLoading,
    isFetching: getContactFetching,
  } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: async () => {
      const accessToken = await getAccessToken();
      return getContact(accessToken, contactId);
    },
    refetchOnWindowFocus: false, // it is not necessary to keep refetching
    cacheTime: 0, // Disable data cache
  });

  const handleTabChange = () => {
    if (tabSelection === "detail") {
      setTabSelection("conferences");
    } else {
      setTabSelection("detail");
    }
  };

  const handleInputClick = () => {
    inputRef.current.click();
  };

  const handlePhotoInput = (event) => {
    // Create a preview of the file before uploading it onto database
    if (event.target.files[0]) {
      setPhotoPreviewLink(URL.createObjectURL(event.target.files[0]));
    }
  };

  const {
    mutate: updateData,
    isLoading,
    isError: updateHasError,
    error: updateError,
    isFetched,
  } = useMutation(
    async (data) => {
      const accessToken = await getAccessToken();
      if (data.photo !== "") {
        const storageRef = ref(
          storage,
          `photos/${data.firstName}-${data.lastName}.png`
        );

        // Upload the photo onto Firebase storage with uploadBytes
        const snapshot = await uploadBytes(storageRef, data.photo);

        // Get the download url for the uploaded photo
        const photoUrl = await getDownloadURL(snapshot.ref);

        data.photoUrl = photoUrl;
        return updateContact(accessToken, data, contactId);
      }

      return updateContact(accessToken, data, contactId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contact", contactId], { exact: true });
        setPhotoPreviewLink("");
        // navigate("/contacts");
        setOpenFeedback(true);
        setFeedbackSeverity("success");
        setFeedbackMsg(`Contact Updated`);
      },
    }
  );

  useEffect(() => {
    if (updateHasError) {
      console.log(updateError);
      const errorMsg = updateError.errors[0].message;
      setOpenFeedback(true);
      setFeedbackSeverity("error");
      if (errorMsg === "email must be unique") {
        setFeedbackMsg(
          `Email address is already in used. Please use another email address.`
        );
      } else {
        setFeedbackMsg(errorMsg);
      }
    }
  }, [updateHasError, updateError]);

  if (getContactLoading || getContactFetching) {
    return <Loading />;
  }

  return (
    <>
      <PageHeader>{contactFromFetch && contactFromFetch.fullName}</PageHeader>
      <ImageInput
        handleInputClick={handleInputClick}
        photoPreviewLink={photoPreviewLink}
        dummyImage={Dummy}
      />
      <div style={{ marginTop: "20px" }}>
        <TabContext value={tabSelection}>
          <Tabs
            value={tabSelection}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="detail" label="Contact Details" />
            <Tab value="conferences" label="Participated Conferences" />
          </Tabs>
          <TabPanel value="detail">
            <ContactForm
              photoPreviewLink={photoPreviewLink}
              setPhotoPreviewLink={setPhotoPreviewLink}
              handleInputClick={handleInputClick}
              inputRef={inputRef}
              handlePhotoInput={handlePhotoInput}
              loading={isLoading}
              submitData={updateData}
              disableImageInput={true}
              dataToPrefill={contactFromFetch && contactFromFetch}
            />
          </TabPanel>
          <TabPanel value="conferences">
            {contactFromFetch && contactFromFetch["Conferences"].length > 0 ? (
              contactFromFetch["Conferences"].map((conference, index) => (
                <Accordion key={`${conference.name}-${index}`}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> {conference.name}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    {conference.Sessions.length > 0 ? (
                      <ScheduleTable
                        conference={conference}
                        dates={createDateArray(
                          conference.startDate,
                          conference.endDate,
                          conference.Sessions
                        )}
                      />
                    ) : (
                      `${contactFromFetch.title} ${contactFromFetch.firstName} ${contactFromFetch.lastName} was invited to ${conference.name} but was not allocated with any presentation.`
                    )}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <p className="p-3">
                {`${contactFromFetch.title} ${contactFromFetch.firstName} ${contactFromFetch.lastName} did not participate in any
              conference.`}
              </p>
            )}
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

export default Contact;
