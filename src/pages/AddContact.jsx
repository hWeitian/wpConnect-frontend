import { useState, useRef, useEffect } from "react";
import useGetAccessToken from "../hooks/useGetAccessToken";
import PageHeader from "../components/PageHeader";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContactForm from "../components/ContactForm";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { addContact } from "../services/contacts";

const AddContact = () => {
  const [selectedCountries, setSelectedCountries] = useState();
  const [selectedTitle, setSelectedTitle] = useState();
  const [photoPreviewLink, setPhotoPreviewLink] = useState("");
  const inputRef = useRef(null);
  const getAccessToken = useGetAccessToken();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [setOpenFeedback, setFeedbackMsg, setFeedbackSeverity] =
    useOutletContext();

  const form = useForm({
    defaultValues: {
      photo: "",
      firstName: "",
      lastName: "",
      country: { value: "", label: "" },
      title: { value: "", label: "" },
      email: "",
      organisation: "",
      biography: "",
      isAdmin: false,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm();

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
    mutate: uploadContact,
    isLoading,
    isError: addHasError,
    error: addError,
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

        return addContact(accessToken, data);
      }

      data.photoUrl = "";

      return addContact(accessToken, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["contacts"], { exact: true });
        form.reset();
        setPhotoPreviewLink("");
        navigate("/contacts");
        setOpenFeedback(true);
        setFeedbackSeverity("success");
        setFeedbackMsg(`Contact Added`);
      },
    }
  );

  useEffect(() => {
    if (addHasError) {
      const errorMsg = addError.errors[0].message;
      setOpenFeedback(true);
      setFeedbackSeverity("error");
      if (errorMsg === "email must be unique") {
        setFeedbackMsg(
          `Email address is already in used. Please use another email address`
        );
      } else {
        setFeedbackMsg(errorMsg);
      }
    }
  }, [addHasError, addError]);

  const onSubmit = (data) => {
    console.log("submit clicked");
    data.country = selectedCountries.value;
    data.title = selectedTitle.value;
    console.log(data);
    uploadContact(data);
  };

  return (
    <>
      <PageHeader hasButton={false}>Add Contact</PageHeader>
      <ContactForm
        onSubmit={onSubmit}
        control={control}
        handleSubmit={handleSubmit}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        selectedTitle={selectedTitle}
        setSelectedTitle={setSelectedTitle}
        photoPreviewLink={photoPreviewLink}
        handleInputClick={handleInputClick}
        inputRef={inputRef}
        handlePhotoInput={handlePhotoInput}
        loading={isLoading}
      />
    </>
  );
};

export default AddContact;
