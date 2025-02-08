import InputBox, { InputTypes } from "../../components/input-box/InputBox";
import { useState } from "react";
import "./ReleaseOrder.scss";

const ReleaseOrder = () => {
  const [publicationPlace, setPublicationPlace] = useState("");
  const [dateOfInsertion, setDateOfInsertion] = useState("");
  const [size, setSize] = useState("");
  const [position, setPosition] = useState("");
  const [caption, setCaption] = useState("");
  const [rate, setRate] = useState("");
  const [specialInsertion, setSpecialInsertion] = useState("");
  const [matterThrough, setMatterThrough] = useState("");
  const [photoFileName, setPhotoFileName] = useState("");

  const createReleaseOrderFile = () => {
    console.log("Publication Place:", publicationPlace);
  };

  return (
    <div className="simple-create-form">
      <form className="form-container">
        <div className="form-title">
          <h2>YADAV AGENCY - RELEASE ORDER</h2>
        </div>
        <div className="form-items">
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
            id="date-of-insertion"
            name="date-of-insertion"
            type={InputTypes.Date}
            label="Date of Insertion"
            value={dateOfInsertion}
            setInputValue={setDateOfInsertion}
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
            type="submit"
            className="btn"
            onClick={createReleaseOrderFile}
          >
            CREATE
          </button>
        </div>
      </form>
      <div className="lottie-anim-container">YADAV AGENCY - RELEASE ORDER</div>
    </div>
  );
};

export default ReleaseOrder;

{
  /* <div className="form-group">
            <label htmlFor="publicationPlace">Publication & Place</label>
            <input type="text" id="publicationPlace" name="publicationPlace" />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfInsertion">Date of Insertion</label>
            <input type="date" id="dateOfInsertion" name="dateOfInsertion" />
          </div>
          <div className="form-group">
            <label htmlFor="size">Size</label>
            <input type="text" id="size" name="size" />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input type="text" id="position" name="position" />
          </div>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <input type="text" id="caption" name="caption" />
          </div>
          <div className="form-group">
            <label htmlFor="rate">Rate</label>
            <input type="text" id="rate" name="rate" />
          </div>
          <div className="form-group">
            <label htmlFor="specialInsertion">Special Insertion</label>
            <input type="text" id="specialInsertion" name="specialInsertion" />
          </div>
          <div className="form-group">
            <label htmlFor="matterThrough">Matter Through</label>
            <input type="text" id="matterThrough" name="matterThrough" />
          </div>
          <div className="form-group">
            <label htmlFor="photoFileName">Photo File Name</label>
            <input type="text" id="photoFileName" name="photoFileName" />
          </div> */
}
