import InputBox, { InputTypes } from "../../components/input-box/InputBox";
import { useState } from "react";
import "./ReleaseOrder.scss";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ReleaseOrder = () => {
  const [publicationPlace, setPublicationPlace] = useState("a");
  const [dateOfInsertion, setDateOfInsertion] = useState(null);
  const [size, setSize] = useState("a");
  const [position, setPosition] = useState("a");
  const [caption, setCaption] = useState("a");
  const [rate, setRate] = useState("a");
  const [specialInsertion, setSpecialInsertion] = useState("a");
  const [matterThrough, setMatterThrough] = useState("a");
  const [photoFileName, setPhotoFileName] = useState("a");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const createReleaseOrderFile = () => {
    const doc = new jsPDF();

    // Set header with custom font and style
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 255); // Set color for the header
    doc.text("Release Order - YADAV AGENCY", 20, 20); // Add the header

    // Add a horizontal line under the header
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25); // Line from left to right

    // Set font for the content
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Default text color (black)

    // Add input data with some styling
    doc.text(`Publication Place: ${publicationPlace}`, 20, 40);
    doc.text(`Size: ${size}`, 20, 50);
    doc.text(`Position: ${position}`, 20, 60);
    doc.text(`Caption: ${caption}`, 20, 70);
    doc.text(`Rate: ${rate}`, 20, 80);
    doc.text(`Special Insertion: ${specialInsertion}`, 20, 90);
    doc.text(`Matter Through: ${matterThrough}`, 20, 100);
    doc.text(`Photo File Name: ${photoFileName}`, 20, 110);

    // Create a Blob URL to preview the PDF
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);

    setShowPdfPreview(true);
  };

  const savePDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "release-order.pdf";
      link.click();
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const cancelPDF = () => {
    setPdfUrl(null);
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
            onClick={createReleaseOrderFile}
          >
            CREATE
          </button>
        </div>
      </form>
      <div className="lottie-anim-container">YADAV AGENCY - RELEASE ORDER</div>
      {showPdfPreview && pdfUrl && (
        <div className="pdf-preview-modal">
          <iframe
            src={`https://docs.google.com/gview?embedded=true&url=${pdfUrl}`}
            title="PDF Preview"
            className="pdf-preview-iframe"
          ></iframe>
          <button className="btn" onClick={savePDF}>
            Download PDF
          </button>
          <button className="btn" onClick={cancelPDF}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ReleaseOrder;
