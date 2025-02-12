enum DateFormats {
  DDMMYYYY = "DD-MM-YYYY",
  YYYYMMDD = "YYYY-MM-DD",
}
const useFormateDate = () => {
  const formateDate = (date: Date, formate: DateFormats) => {
    const today = new Date(date);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear();
    if (formate === DateFormats.YYYYMMDD) return `${year}-${month}-${day}`;
    if (formate === DateFormats.DDMMYYYY) return `${day}-${month}-${year}`;
    return "";
  };

  return { formateDate };
};

export default useFormateDate;
export { DateFormats };
