const formatMongoDateToIndian = (messageSubmitDate: string | Date): string => {
  const date = new Date(messageSubmitDate);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const formatMongoDate = (messageSubmitDate: string | Date): string => {
  const date = new Date(messageSubmitDate);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
export default formatMongoDateToIndian;
