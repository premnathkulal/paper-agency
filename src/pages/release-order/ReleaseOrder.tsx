import InputBox, { InputTypes } from "../../components/input-box/InputBox";
import { useEffect, useState } from "react";
import "./ReleaseOrder.scss";
import useFormateDate, { DateFormats } from "../../hooks/useFormateDate";
import useGeneratePdf from "../../hooks/useGeneratePdf";
import Lottie from "lottie-react";
import animationData from "../../assets/lottie/news-paper.json";

const ReleaseOrder = () => {
  const [clientName, setClientName] = useState("");
  const [publicationPlace, setPublicationPlace] = useState("");
  const [dateOfInsertion, setDateOfInsertion] = useState("");
  const [size, setSize] = useState("");
  const [position, setPosition] = useState("");
  const [caption, setCaption] = useState("");
  const [rate, setRate] = useState("");
  const [specialInsertion, setSpecialInsertion] = useState("");
  const [matterThrough, setMatterThrough] = useState("");
  const [photoFileName, setPhotoFileName] = useState("");
  const { formateDate } = useFormateDate();
  const { generatePdf } = useGeneratePdf();

  const handleSetDateOfInsertion = (value: string) => {
    const date = new Date(value);
    const formattedDate = formateDate(date, DateFormats.YYYYMMDD);
    setDateOfInsertion(formattedDate);
  };

  const handleCreateReleaseOrderFile = () => {
    const data = {
      clientName,
      publicationPlace,
      dateOfInsertion,
      size,
      position,
      caption,
      rate,
      specialInsertion,
      matterThrough,
      photoFileName,
    };
    generatePdf(data);
  };

  useEffect(() => {
    const today = new Date();
    setDateOfInsertion(formateDate(today, DateFormats.YYYYMMDD));
  }, []);

  return (
    <div className="simple-create-form">
      <form className="form-container">
        <div className="form-title">
          <h2>YADAV AGENCY - RELEASE ORDER</h2>
        </div>
        <div className="form-items">
          <InputBox
            id="client-name"
            name="client-name"
            type={InputTypes.Text}
            label="Client Name"
            value={clientName}
            setInputValue={setClientName}
            isRequired
          />
          <InputBox
            id="publication-place"
            name="publication-place"
            type={InputTypes.Text}
            label="Publication Place"
            value={publicationPlace}
            setInputValue={setPublicationPlace}
            isRequired
          />
          <InputBox
            id="publication-date"
            name="publication-date"
            type={InputTypes.Date}
            label="Publication Date"
            value={dateOfInsertion}
            setInputValue={handleSetDateOfInsertion}
            isRequired
          />
          <InputBox
            id="size"
            name="size"
            type={InputTypes.Text}
            label="Size"
            value={size}
            setInputValue={setSize}
            isRequired
          />
          <InputBox
            id="position"
            name="position"
            type={InputTypes.Text}
            label="Position"
            value={position}
            setInputValue={setPosition}
            isRequired
          />
          <InputBox
            id="caption"
            name="caption"
            type={InputTypes.Text}
            label="Caption"
            value={caption}
            setInputValue={setCaption}
            isRequired
          />
          <InputBox
            id="rate"
            name="rate"
            type={InputTypes.Text}
            label="Rate"
            value={rate}
            setInputValue={setRate}
            isRequired
          />
          <InputBox
            id="special-insertion"
            name="special-insertion"
            type={InputTypes.Text}
            label="Special Insertion"
            value={specialInsertion}
            setInputValue={setSpecialInsertion}
            isRequired
          />
          <InputBox
            id="matter-through"
            name="matter-through"
            type={InputTypes.Text}
            label="Matter Through"
            value={matterThrough}
            setInputValue={setMatterThrough}
            isRequired
          />
          <InputBox
            id="photo-file-name"
            name="photo-file-name"
            type={InputTypes.Text}
            label="Photo File Name"
            value={photoFileName}
            setInputValue={setPhotoFileName}
            isRequired
          />
          <button
            type="button"
            className="btn"
            onClick={handleCreateReleaseOrderFile}
          >
            CREATE
          </button>
        </div>
      </form>
      <div className="lottie-anim-container">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default ReleaseOrder;
