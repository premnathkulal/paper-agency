import "./JobOrderForm.scss";
import InputBox, { InputTypes } from "../../components/input-box/InputBox";
import { useState } from "react";
import RadioBox from "../../components/radio-box/RadioBox";
import useGeneratePdf from "../../hooks/useGeneratePdf";

const JobOrderForm = () => {
  const [jobOrderNumber, setJobOrderNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [place, setPlace] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");
  const [paperType, setPaperType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [printingType, setPrintingType] = useState("");
  const [jobType, setJobType] = useState("invitation-card");
  const [printingQuantity, setPrintingQuantity] = useState("");
  const [invitationCardType, setInvitationCardType] = useState("family-card");
  const [cardType, setCardType] = useState("");
  const [cardSize, setCardSize] = useState("");
  const [cardPaperType, setCardPaperType] = useState("");
  const [designType, setDesignType] = useState("");
  const [designTime, setDesignTime] = useState("");
  const [sealType, setSealType] = useState("");
  const [frameSize, setFrameSize] = useState("");
  const [frameType, setFrameType] = useState("");
  const { generatePdf } = useGeneratePdf();

  const handleCreateReleaseOrderFile = () => {
    const data = {
      jobOrderNumber,
      clientName,
      place,
      contactNumber,
      orderDate,
      orderTime,
      paperType,
      deliveryDate,
      deliveryTime,
      printingType,
      jobType,
      printingQuantity,
      invitationCardType,
      cardType,
      cardSize,
      cardPaperType,
      designType,
      designTime,
      sealType,
      frameSize,
      frameType,
      agencyTitle: "YADAV AGENCY",
    };
    // generatePdf(data);
  };

  return (
    <div className="simple-create-form">
      <form className="form-container">
        <div className="form-title">
          <h2>JOB ORDER FORM</h2>
        </div>
        <div className="form-items">
          <InputBox
            id="job-order-number"
            name="job-order-number"
            type={InputTypes.Number}
            label="Job Order Number"
            value={jobOrderNumber}
            setInputValue={setJobOrderNumber}
            isRequired
          />
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
            id="place"
            name="place"
            type={InputTypes.Text}
            label="Place"
            value={place}
            setInputValue={setPlace}
            isRequired
          />
          <InputBox
            id="contact-number"
            name="contact-number"
            type={InputTypes.Number}
            label="Contact Number"
            value={contactNumber}
            setInputValue={setContactNumber}
            isRequired
          />
          <InputBox
            id="order-date"
            name="order-date"
            type={InputTypes.Date}
            label="Order Date"
            value={orderDate}
            setInputValue={setOrderDate}
            isRequired
          />
          <InputBox
            id="order-time"
            name="order-time"
            type={InputTypes.Text}
            label="Order Time"
            value={orderTime}
            setInputValue={setOrderTime}
            isRequired
          />
          <InputBox
            id="paper-type"
            name="paper-type"
            type={InputTypes.Text}
            label="Paper Type"
            value={paperType}
            setInputValue={setPaperType}
            isRequired
          />
          <InputBox
            id="delivery-date"
            name="delivery-date"
            type={InputTypes.Date}
            label="Delivery Date"
            value={deliveryDate}
            setInputValue={setDeliveryDate}
            isRequired
          />
          <InputBox
            id="delivery-time"
            name="delivery-time"
            type={InputTypes.Text}
            label="Delivery Time"
            value={deliveryTime}
            setInputValue={setDeliveryTime}
            isRequired
          />
        </div>
      </form>
      <form className="form-container form-container-right">
        <div className="form-items">
          <InputBox
            id="printing-type"
            name="printing-type"
            type={InputTypes.DropDown}
            label="Printing Type"
            value={printingType}
            setInputValue={setPrintingType}
            options={[
              { id: "digital-print", title: "Digital Print" },
              { id: "offset-print", title: "Offset Print" },
              { id: "laser-print", title: "Laser Print" },
              { id: "ink-jet-print", title: "Ink Jet Print" },
              { id: "screen-print", title: "Screen Print" },
            ]}
            isRequired
          />
          <InputBox
            id="printing-quantity"
            name="printing-quantity"
            type={InputTypes.Number}
            label="Printing Quantity"
            value={printingQuantity}
            setInputValue={setPrintingQuantity}
            isRequired
          />
          <div className="form-title form-title-right">
            <h3>PRINTING TYPE</h3>
          </div>
          <div className="radio-box-container">
            <RadioBox
              id="invitation-card"
              name="job-type"
              handleChange={() => setJobType("invitation-card")}
              label="Invitation Card"
              value="invitation-card"
              selectedValue={jobType}
            />
            <RadioBox
              id="official-job"
              name="job-type"
              handleChange={() => setJobType("official-job")}
              label="Official job"
              value="official-job"
              selectedValue={jobType}
            />
          </div>
        </div>
        {jobType === "invitation-card" && (
          <div className="form-items job-type-form">
            <div className="radio-box-container">
              <RadioBox
                id="family-card"
                name="invitation-card-type"
                handleChange={() => setInvitationCardType("family-card")}
                label="Family Card"
                value="family-card"
                selectedValue={invitationCardType}
              />
              <RadioBox
                id="personal-card"
                name="invitation-card-type"
                handleChange={() => setInvitationCardType("personal-card")}
                label="Personal Card"
                value="personal-card"
                selectedValue={invitationCardType}
              />
            </div>
            <InputBox
              id="card-type"
              name="card-type"
              type={InputTypes.DropDown}
              label="Card Type"
              value={cardType}
              setInputValue={setCardType}
              options={[
                { id: "bill-book", title: "Bill Book" },
                { id: "receipt-book", title: "Receipt Book" },
                { id: "letter-head", title: "Letter Head" },
                { id: "notice", title: "Notice" },
                { id: "sticker-print", title: "Sticker Print" },
                { id: "visiting-card", title: "Visiting Card" },
                { id: "invitation-card", title: "Invitation Card" },
                { id: "envelope", title: "Envelope" },
                { id: "death-card", title: "Death Card" },
                { id: "wedding-card", title: "Wedding Card" },
                { id: "birthday-card", title: "Birthday Card" },
                { id: "greeting-card", title: "Greeting Card" },
                { id: "other", title: "Other" },
              ]}
              isRequired
            />
            <InputBox
              id="card-size"
              name="card-size"
              type={InputTypes.Number}
              label="Card Size"
              value={cardSize}
              setInputValue={setCardSize}
              isRequired
            />
            <InputBox
              id="card-paper-type"
              name="card-paper-type"
              type={InputTypes.Text}
              label="Card Paper Type"
              value={cardPaperType}
              setInputValue={setCardPaperType}
              isRequired
            />
          </div>
        )}
        {jobType === "official-job" && (
          <div className="form-items job-type-form">
            <InputBox
              id="card-type"
              name="card-type"
              type={InputTypes.DropDown}
              label="Card Type"
              value={cardType}
              setInputValue={setCardType}
              options={[
                { id: "seal", title: "Seal" },
                { id: "glass-print", title: "Glass Print" },
                { id: "spiral-binding", title: "Spiral Binding" },
                { id: "lamination", title: "Lamination" },
                { id: "memento", title: "Memento" },
                { id: "certificate", title: "Certificate" },
                { id: "id-card", title: "ID Card" },
                { id: "badge", title: "Badge" },
                { id: "name-tag", title: "Name Tag" },
                { id: "sanmana-patra", title: "Sanmana Patra" },
                { id: "other", title: "Other" },
              ]}
              isRequired
            />
            {cardType === "seal" && (
              <InputBox
                id="seal-type"
                name="seal-type"
                type={InputTypes.DropDown}
                label="Seal Type"
                value={sealType}
                setInputValue={setSealType}
                options={[
                  { id: "ordinary-stamp", title: "Ordinary Stamp" },
                  { id: "sun-stamp", title: "Sun Stamp" },
                  { id: "round-stamp", title: "Round Stamp" },
                  { id: "square-stamp", title: "Square Stamp" },
                  { id: "rectangular-stamp", title: "Rectangular Stamp" },
                  { id: "custom-stamp", title: "Custom Stamp" },
                  { id: "other-stamp", title: "Other" },
                ]}
                isRequired
              />
            )}
            {cardType !== "sanmana-patra" && (
              <InputBox
                id="card-size"
                name="card-size"
                type={InputTypes.Number}
                label="Size"
                value={cardSize}
                setInputValue={setCardSize}
                isRequired
              />
            )}
            {cardType === "sanmana-patra" && (
              <>
                <InputBox
                  id="frame-size"
                  name="frame-size"
                  type={InputTypes.Number}
                  label="Frame Size"
                  value={frameSize}
                  setInputValue={setFrameSize}
                  isRequired
                />
                <InputBox
                  id="frame-type"
                  name="frame-type"
                  type={InputTypes.Text}
                  label="Frame Type"
                  value={frameType}
                  setInputValue={setFrameType}
                  isRequired
                />
              </>
            )}
          </div>
        )}
        <div className="form-items">
          <InputBox
            id="design-type"
            name="design-type"
            type={InputTypes.Text}
            label="Design Type"
            value={designType}
            setInputValue={setDesignType}
            isRequired
          />
          <InputBox
            id="design-time"
            name="design-time"
            type={InputTypes.Number}
            label="Design Time"
            value={designTime}
            setInputValue={setDesignTime}
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
    </div>
  );
};

export default JobOrderForm;
