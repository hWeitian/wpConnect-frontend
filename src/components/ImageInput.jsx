import EditIcon from "@mui/icons-material/Edit";

const ImageInput = ({ handleInputClick, photoPreviewLink, dummyImage }) => {
  return (
    <button
      type="button"
      onClick={handleInputClick}
      style={{ marginTop: "10px", border: "0", backgroundColor: "white" }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={photoPreviewLink ? photoPreviewLink : dummyImage}
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
  );
};

export default ImageInput;
