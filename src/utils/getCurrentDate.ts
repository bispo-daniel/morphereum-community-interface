const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const month = date.toLocaleString("default", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return { formattedDay, capitalizedMonth, year };
};

export default getCurrentDate;
