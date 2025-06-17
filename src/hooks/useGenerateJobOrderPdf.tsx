import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import vamshaLogo from "../assets/vamsha-logo.jpg";

interface PdfData {
  jobOrderNumber: string;
  clientName: string;
  place: string;
  contactNumber: string;
  orderDate: string;
  orderTime: string;
  paperType: string;
  deliveryDate: string;
  deliveryTime: string;
  printingType: string;
  jobType: string;
  printingQuantity: string;
  invitationCardType: string;
  cardType: string;
  cardSize: string;
  cardPaperType: string;
  designType: string;
  designTime: string;
  sealType: string;
  frameSize: string;
  frameType: string;
}

const userData = {
  userName: "yadav",
  agentName: "Yadav Agency",
  agencyTitle: "YADAV AGENCY",
  agencyPhone: "9844276869",
  agencyAddress: "Opp. Mini Vidhana Sowda\n           B.C.Road - 574219",
  agencyEmail: "yadavvkbantwal@gmail.com",
};

const useGenerateJobOrderPdf = () => {
  const generatePdf = (data: PdfData) => {
    const {
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
    } = data;

    const doc = new jsPDF();

    doc.setFontSize(10);
    doc.text(userData.agencyAddress, 154, 17, {
      lineHeightFactor: 1.4,
    });
    doc.setFontSize(10);
    doc.text(`Ph: ${userData.agencyPhone}`, 169, 26.8);
    doc.text(`Email: ${userData.agencyEmail}`, 140, 32);

    // Center the header and add border
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    const headerText = "JOB ORDER FORM";
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
    doc.text(`${clientName},\n${place},\n${contactNumber}`, 14.2, 61, {
      lineHeightFactor: 1.6,
    });

    doc.text(`Job Order No.                 :   ${jobOrderNumber}`, 114, 61);
    doc.text(`Order Date and Time      :   ${orderDate}:${orderTime}`, 114, 68);
    doc.text(
      `Delivery Date and Time  :   ${deliveryDate}:${deliveryTime}`,
      114,
      75
    );

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(13, 80, doc.internal.pageSize.getWidth() - 13, 80);

    doc.text(`Paper Type           :  ${paperType}`, 13, 90);
    doc.text(`Printing Type        :  ${printingType}`, 13, 98);
    doc.text(`Printing Quantity   :  ${printingQuantity}`, 13, 106);

    // doc.setDrawColor(0, 0, 0);
    // doc.setLineWidth(0.3);
    // doc.line(13, 112, doc.internal.pageSize.getWidth() - 13, 112);

    const releaseOrderData = [
      [
        "Job Type",
        ":",
        jobType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      ],
      [
        "Card Type",
        ":",
        cardType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      ],
      ["Card Size", ":", cardSize],
      ["Card Paper Type", ":", cardPaperType],
      ["Design Type", ":", designType],
      ["Design Time", ":", designTime],
    ];

    if (jobType === "invitation-card") {
      releaseOrderData.splice(1, 0, [
        "Invitation Card Type",
        ":",
        invitationCardType
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      ]);
    }

    if (jobType === "official-job") {
      if (cardType === "seal") {
        releaseOrderData.splice(2, 0, [
          "Seal Type",
          ":",
          sealType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        ]);
      }
      if (
        ["sanmana-patra", "badge", "id-card", "certificate"].includes(cardType)
      )
        releaseOrderData.splice(
          3,
          0,
          ["Frame Size", ":", frameSize],
          ["Frame Type", ":", frameType]
        );
    }

    // ["Seal Type", ":", sealType],
    // ["Frame Size", ":", frameSize],
    // ["Frame Type", ":", frameType],

    autoTable(doc, {
      body: releaseOrderData,
      startY: 120,
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

    // Add an image
    const img = new Image();
    img.src = vamshaLogo;
    img.onload = function () {
      doc.addImage(img, "JPEG", 14.2, 15, 50, 18);
      doc.save(`${clientName ? clientName + "-" : ""}release-order.pdf`);
      // const pdfOutput = doc.output("bloburl");
      // window.open(pdfOutput, "_blank");
    };

    // Download the PDF
    // const pdfOutput = doc.output("bloburl");
    // window.open(pdfOutput, "_blank");
  };

  return { generatePdf };
};

export default useGenerateJobOrderPdf;
