const formatDate = (date: Date) => {
  const formatedDate = Intl.DateTimeFormat("fa-IR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return formatedDate;
};

export default formatDate;
