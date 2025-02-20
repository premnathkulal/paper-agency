import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import yadavLogo from "../assets/yadava-sign.jpeg";
import useFormateDate, { DateFormats } from "./useFormateDate";

interface PdfData {
  releaseOrderNumber: string;
  clientName: string;
  publicationPlace: string;
  dateOfInsertion: string;
  size: string;
  position: string;
  caption: string;
  rate: string;
  specialInsertion: string;
  matterThrough: string;
  photoFileName: string;
}

const userData = {
  userName: "yadav",
  agentName: "Yadav Agency",
  agencyTitle: "YADAV AGENCY",
  agencyPhone: "9844276869",
  agencyAddress: "Opp. Mini Vidhana Sowda\nB.C.Road - 574219",
  agencyEmail: "yadavvkbantwal@gmail.com",
  toAddress: "The Advt.Manager\nVijaya Karnataka, Mangalore",
};

const useGeneratePdf = () => {
  const { formateDate } = useFormateDate();

  const generatePdf = (data: PdfData) => {
    const {
      releaseOrderNumber,
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
    } = data;

    const today = new Date();
    const date = formateDate(today, DateFormats.DDMMYYYY);
    const doc = new jsPDF();

    // Set header with custom font and style
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(userData.agencyTitle, 14.2, 20);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(13);
    doc.text(`Ph: ${userData.agencyPhone}`, 163.5, 20);

    doc.setFontSize(10);
    doc.text(userData.agencyAddress, 14.2, 26, {
      lineHeightFactor: 1.4,
    });

    doc.setFontSize(11);
    doc.text(`Email: ${userData.agencyEmail}`, 136, 26);

    // Center the header and add border
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    const headerText = "RELEASE ORDER";
    const headerX =
      (doc.internal.pageSize.getWidth() - doc.getTextWidth(headerText)) / 2;
    doc.text(headerText, headerX, 45);

    const headerWidth = doc.getTextWidth(headerText) + 4;
    const headerHeight = 10;
    const headerY = 38;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(headerX - 2, headerY, headerWidth, headerHeight);
    doc.setFont("helvetica", "normal");

    // Set font for the content
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.text(userData.toAddress, 14.2, 61, {
      lineHeightFactor: 1.6,
    });

    doc.text(`R.O.No :   ${releaseOrderNumber}`, 152, 61);
    doc.text(`Date     :   ${date}`, 152, 68);
    doc.text(`Client Name :  ${clientName}`, 14.2, 80);

    // Display disclaimer text
    doc.setFontSize(12);
    const disclaimerText =
      "Kindly arrange to publish the above client's advertisement as per the details given below.";
    const disclaimerMaxWidth = 170;
    const disclaimerX = 14.2;
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
        "Date of Insertion",
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
      theme: "plain",
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
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.5,
      didDrawCell: function (data) {
        let doc = data.doc;

        if (data.row.index < data.table.body.length) {
          doc.setLineWidth(0.1);
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.5);
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        }

        doc.setLineWidth(0);
      },
    });

    // Display disclaimer text again
    doc.setFontSize(12);
    const disclaimerText2 =
      "Your bill along with advertisement voucher copy should be submitted to us for payment. Any change in rate and size should be intimated before publication.";
    const disclaimerMaxWidth2 = 170;
    const disclaimerX2 = 105;
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
    const signatureText2 = "For ";
    const signatureText3 = userData.agentName;
    const signatureMaxWidth = 170;

    const splitSignatureText1 = doc.splitTextToSize(
      signatureText1,
      signatureMaxWidth
    );

    doc.text(splitSignatureText1, 185, 244, { align: "right" });
    doc.text(signatureText2, 158, 251, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(signatureText3, 187, 251, { align: "right" });
    doc.setFont("helvetica", "normal");

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Proprietor", 180, 274, { align: "right" });

    // Add an outer border
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Add an image
    const img = new Image();
    img.src = yadavLogo;
    img.onload = function () {
      doc.addImage(img, "JPEG", 155, 252, 25, 18);
      doc.save(`${clientName ? clientName + "-" : ""}release-order.pdf`);
    };

    // Download the PDF
    // const pdfOutput = doc.output("bloburl");
    // window.open(pdfOutput, "_blank");
  };

  return { generatePdf };
};

export default useGeneratePdf;
