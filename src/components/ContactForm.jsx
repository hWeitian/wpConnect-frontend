import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  Button,
  TextField,
  Tooltip,
  styled,
  Switch,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AutocompleteInput from "./AutocompleteInput";
import { countries, titles } from "../utils/dropdownData";
import EditIcon from "@mui/icons-material/Edit";
import Dummy from "../assets/dummy.jpg";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: "32px 32px 0 32px",
  overflowY: "auto",
};

const TextSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const ContactForm = ({
  onSubmit,
  control,
  handleSubmit,
  selectedCountries,
  setSelectedCountries,
  selectedTitle,
  setSelectedTitle,
  data,
  photoPreviewLink,
  handleInputClick,
  inputRef,
  handlePhotoInput,
  loading,
}) => {
  return (
    <>
      <button
        type="button"
        onClick={handleInputClick}
        style={{ marginTop: "10px", border: "0", backgroundColor: "white" }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={photoPreviewLink ? photoPreviewLink : Dummy}
            alt="speaker photo"
            width="120px"
            style={{ borderRadius: "10px" }}
          />

          <EditIcon
            style={{
              position: "absolute",
              bottom: "-5px",
              right: "-10px",
              cursor: "pointer",
            }}
          />
        </div>
      </button>
      <div style={{ marginTop: "40px" }}>
        <Typography
          style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "10px" }}
        >
          Contact Details
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
          <Controller
            control={control}
            name="photo"
            rules={{ required: "Please enter first name" }}
            defaultValue=""
            render={({
              field: { ref, onChange, ...field },
              fieldState: { error },
            }) => (
              <input
                ref={inputRef}
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  e.target.files[0] && onChange(e.target.files[0]);
                  handlePhotoInput(e);
                }}
              />
            )}
          />
          <Grid container justifyContent="space-between" sx={{ width: "100%" }}>
            <Grid item xs={5.5}>
              <label className="form-label">First Name</label>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: "Please enter first name" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`firstName`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="First Name"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5.5}>
              <label className="form-label">Last Name</label>
              <Controller
                control={control}
                name="lastName"
                rules={{ required: "Please enter last name" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`lastName`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="Last Name"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5.5} sx={{ mt: 2 }}>
              <label className="form-label">Country</label>
              <AutocompleteInput
                id="country"
                placeholder="Select a country"
                options={countries}
                columnName="value"
                hasTwoColumns={false}
                columnNameTwo=""
                value={selectedCountries}
                onChange={(e) => setSelectedCountries(e)}
                error={false}
                disableClear={true}
                width="100%"
              />
            </Grid>
            <Grid item xs={5.5} sx={{ mt: 2 }}>
              <label className="form-label">Title</label>
              <AutocompleteInput
                id="title"
                placeholder="Select a title"
                options={titles}
                columnName="value"
                hasTwoColumns={false}
                columnNameTwo=""
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e)}
                error={false}
                disableClear={true}
                width="100%"
              />
            </Grid>
            <Grid item xs={5.5} sx={{ mt: 2 }}>
              <label className="form-label">Email</label>
              <Controller
                control={control}
                name="email"
                rules={{ required: "Please enter email" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <Tooltip
                    title={
                      data
                        ? data.isAdmin
                          ? "Unable to edit email of an admin"
                          : ""
                        : ""
                    }
                  >
                    <TextField
                      id={`email`}
                      variant="outlined"
                      size="small"
                      disabled={data ? (data.isAdmin ? true : false) : false}
                      error={error}
                      value={field.value}
                      onChange={onChange}
                      helperText={error?.message}
                      placeholder="Email"
                      sx={{ width: "100%" }}
                    />
                  </Tooltip>
                )}
              />
            </Grid>
            <Grid item xs={5.5} sx={{ mt: 2 }}>
              <label className="form-label">Organisation</label>
              <Controller
                control={control}
                name="organisation"
                rules={{ required: "Please enter Organisation" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`organisation`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="Organisation"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <label className="form-label">Biography</label>
              <Controller
                control={control}
                name="biography"
                rules={{ required: "Please enter Biography" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`biography`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="Biography"
                    sx={{ width: "100%" }}
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <label className="form-label">Admin Access</label>
              <Controller
                control={control}
                name="isAdmin"
                defaultValue={false}
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextSwitch
                    id="isAdmin"
                    color="secondary"
                    onChange={onChange}
                    checked={field.value}
                  />
                )}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={loading}
            sx={{ mt: 4, mb: 2, width: "10%" }}
          >
            Save
          </LoadingButton>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
