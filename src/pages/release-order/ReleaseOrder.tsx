import InputBox, { InputTypes } from "../../components/input-box/InputBox";
import { useEffect, useState } from "react";
import "./ReleaseOrder.scss";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/yadava-sign.jpeg"; // Adjust the path as necessary

enum DateFormats {
  DDMMYYYY = "DD-MM-YYYY",
  YYYYMMDD = "YYYY-MM-DD",
}

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
  const [date, setDate] = useState("");

  const formateDate = (date: Date, formate: DateFormats) => {
    const today = new Date(date);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear();
    if (formate === DateFormats.YYYYMMDD) return `${year}-${month}-${day}`;
    if (formate === DateFormats.DDMMYYYY) return `${day}-${month}-${year}`;
    return "";
  };

  const createReleaseOrderFile = () => {
    const doc = new jsPDF();

    // Set header with custom font and style
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold"); // Set font to bold
    doc.text("YADAV AGENCY", 14.2, 20); // Add the header
    doc.setFont("helvetica", "normal"); // Reset font back to normal

    doc.setFontSize(13);
    doc.text("Ph: 9844276869", 163.5, 20);

    doc.setFontSize(10);
    doc.text("Opp. Mini Vidhana Sowda\nB.C.Road - 574219", 14.2, 26, {
      lineHeightFactor: 1.4,
    });

    doc.setFontSize(11);
    doc.text("Email: yadavvkbantwal@gmail.com", 136, 26);

    // Center the header and add border
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold"); // Set font to bold
    const headerText = "RELEASE ORDER";
    const headerX =
      (doc.internal.pageSize.getWidth() - doc.getTextWidth(headerText)) / 2;
    doc.text(headerText, headerX, 45); // Center the header

    // Add border around the header
    const headerWidth = doc.getTextWidth(headerText) + 4; // Add some padding
    const headerHeight = 10; // Height of the header box
    const headerY = 38; // Y position of the header box
    doc.setDrawColor(0, 0, 0); // Border color
    doc.setLineWidth(0.5); // Border width
    doc.rect(headerX - 2, headerY, headerWidth, headerHeight); // Draw the border
    doc.setFont("helvetica", "normal"); // Reset font back to normal

    // Set font for the content
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Default text color (black)

    doc.setFontSize(12);
    doc.text("The Advt.Manager\nVijaya Karnataka, Mangalore", 14.2, 61, {
      lineHeightFactor: 1.6,
    });

    doc.text("R.O.No :   362", 152, 61);
    doc.text(`Date     :   ${date}`, 152, 68);
    doc.text(`Client Name :  ${clientName}`, 14.2, 80);

    // Display disclaimer text
    doc.setFontSize(12);
    const disclaimerText =
      "Kindly arrange to publish the above client's advertisement as per the details given below.";
    const disclaimerMaxWidth = 170; // Maximum width of the text
    const disclaimerX = 14.2; // Left aligned X position
    const disclaimerY = 100;
    const splitDisclaimerText = doc.splitTextToSize(
      disclaimerText,
      disclaimerMaxWidth
    );
    doc.text(splitDisclaimerText, disclaimerX, disclaimerY);

    // Add input data with some styling
    const releaseOrderData = [
      ["Publication & Place", ":", publicationPlace],
      [
        "Date of insertion",
        ":",
        formateDate(new Date(dateOfInsertion), DateFormats.DDMMYYYY),
      ],
      ["Size", ":", size],
      ["Position", ":", position],
      ["Caption", ":", caption],
      ["Rate", ":", rate],
      ["Special Insertion", ":", specialInsertion],
      ["Matter Through", ":", matterThrough],
      ["Photo File Name", ":", photoFileName],
    ];

    autoTable(doc, {
      body: releaseOrderData,
      startY: 106,
      theme: "plain", // Removes default borders
      styles: {
        fontSize: 12,
        cellPadding: 3,
      },
      headStyles: {
        textColor: [255, 255, 255],
      },
      columnStyles: {
        0: { cellWidth: 48 },
        1: { cellWidth: 10 },
        2: { cellWidth: "auto" },
      },
      tableLineColor: [0, 0, 0], // Table border color
      tableLineWidth: 0.5, // Table border width
      didDrawCell: function (data) {
        let doc = data.doc;

        // Only draw horizontal borders (remove vertical borders)
        if (data.row.index < data.table.body.length) {
          doc.setLineWidth(0.1);
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.5);
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          ); // Bottom border
        }

        // Remove left and right borders (vertical borders)
        doc.setLineWidth(0);
      },
    });

    // Display disclaimer text again
    doc.setFontSize(12);
    const disclaimerText2 =
      "Your bill along with advertisement voucher copy should be submitted to us for payment. Any change in rate and size should be intimated before publication.";
    const disclaimerMaxWidth2 = 170; // Maximum width of the text
    const disclaimerX2 = 105; // Centered X position
    const disclaimerY2 = 208;
    const splitDisclaimerText2 = doc.splitTextToSize(
      disclaimerText2,
      disclaimerMaxWidth2
    );
    const disclaimerTextHeight = doc.getTextDimensions(splitDisclaimerText2).h;
    const disclaimerTextY = disclaimerY2 + disclaimerTextHeight / 2;
    doc.text(splitDisclaimerText2, disclaimerX2, disclaimerTextY, {
      align: "center",
      lineHeightFactor: 1.6,
    });

    // Add signature section
    doc.setFontSize(12);
    const signatureText1 = "Yours faithfully,";
    const signatureText2 = "For "; // Keep this normal
    const signatureText3 = "Yadav Agency"; // Make this bold
    const signatureMaxWidth = 170; // Maximum width for wrapping

    // Split text if needed
    const splitSignatureText1 = doc.splitTextToSize(
      signatureText1,
      signatureMaxWidth
    );

    // Draw text with different font styles
    doc.text(splitSignatureText1, 185, 244, { align: "right" }); // Normal text
    doc.text(signatureText2, 158, 251, { align: "right" }); // "For"
    doc.setFont("helvetica", "bold"); // Set font to bold
    doc.text(signatureText3, 187, 251, { align: "right" }); // "Yadav Agency" in bold
    doc.setFont("helvetica", "normal"); // Reset font back to normal

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Proprietor", 180, 274, { align: "right" });

    // Add an outer border
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277); // Rect(x, y, width, height)

    // Add an image
    doc.addImage(logo, "PNG", 155, 252, 25, 18); // Adjust the position and size as necessary

    // Download the PDF
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
  };

  const handleSetDateOfInsertion = (value: string) => {
    const date = new Date(value);
    const formattedDate = formateDate(date, DateFormats.YYYYMMDD);
    setDateOfInsertion(formattedDate);
  };

  useEffect(() => {
    const today = new Date();
    setDate(formateDate(today, DateFormats.DDMMYYYY));
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
            id="date-of-insertion"
            name="date-of-insertion"
            type={InputTypes.Date}
            label="Publication Place"
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
