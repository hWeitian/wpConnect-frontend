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
import DeleteIcon from "@mui/icons-material/Delete";
import DateRangePicker from "./DateRangePicker";
import { setDefaultLocale } from "react-datepicker";

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

const ConferenceForm = ({
  onSubmit,
  control,
  handleSubmit,
  selectedCountries,
  setSelectedCountries,
  data,
  loading,
  append,
  remove,
  rooms,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onDateChange,
}) => {
  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
          <Grid container justifyContent="space-between" sx={{ width: "100%" }}>
            <Grid item xs={5.5}>
              <label className="form-label">Conference Name</label>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Please enter conference name" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`name`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="Conference Name"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5.5}>
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
            <Grid item xs={12} sx={{ mt: 2 }}>
              <label className="form-label">Date</label>
              <DateRangePicker
                date={endDate}
                startDate={startDate}
                endDate={endDate}
                onDateChange={onDateChange}
              />
            </Grid>

            <Grid item xs={5.5} sx={{ mt: 2 }}>
              <label className="form-label">Venue</label>
              <Controller
                control={control}
                name="venue"
                rules={{ required: "Please enter venue" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`venue`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="Venue"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={5.5} sx={{ mt: 2 }}>
              <label className="form-label">WordPress URL</label>
              <Controller
                control={control}
                name="url"
                rules={{ required: "Please enter WordPress URL" }}
                defaultValue=""
                render={({
                  field: { ref, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <TextField
                    id={`url`}
                    variant="outlined"
                    size="small"
                    error={error}
                    value={field.value}
                    onChange={onChange}
                    helperText={error?.message}
                    placeholder="WordPress URL"
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <label className="form-label">Rooms</label>
              {rooms.map((field, index) => (
                <Grid container key={field.id} sx={{ mt: index === 0 ? 1 : 2 }}>
                  <Grid item xs={11.5}>
                    <Controller
                      control={control}
                      name={`roomItems.${index}.name`}
                      defaultValue=""
                      rules={{ required: "Please enter a room" }}
                      render={({
                        field: { ref, onChange, ...field },
                        fieldState: { error },
                      }) => (
                        <TextField
                          id={`name-${index}`}
                          variant="outlined"
                          size="small"
                          error={error}
                          onChange={onChange}
                          helperText={error?.message}
                          placeholder="Room"
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                  </Grid>
                  {index > 0 && (
                    <Grid item xs={0.5} sx={{ textAlign: "right" }}>
                      <IconButton
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              ))}
              <Button
                type="button"
                color="secondary"
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  append({
                    name: "",
                  });
                }}
              >
                Add Room
              </Button>
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

export default ConferenceForm;
