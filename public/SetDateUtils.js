export function setCurrentDate(inputId) {
  const dateInput = document.getElementById(inputId);
  const today = new Date().toISOString().slice(0, 10);
  dateInput.value = today;
}
