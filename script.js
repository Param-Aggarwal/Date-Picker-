import { format, fromUnixTime, getUnixTime, addMonths, subMonths, startOfWeek, startOfMonth, endOfWeek, endOfMonth, eachDayOfInterval, isSameMonth, getDate} from "date-fns"

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");
const nextMonthButton = document.querySelector(".next-month-button");
const prevMonthButton = document.querySelector(".prev-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");
let shownDate = new Date(); 
setupDatePicker(shownDate);


datePickerButton.addEventListener("click", e => {
    datePicker.classList.toggle("show");
    const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
    shownDate = selectedDate;
    setupDatePicker(selectedDate);// function to set shown date
})

nextMonthButton.addEventListener("click", e => {
    const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
    shownDate = addMonths(shownDate, 1);
    setupDatePicker(selectedDate);
})

prevMonthButton.addEventListener("click", e => {
    const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
    shownDate = subMonths(shownDate, 1);
    setupDatePicker(selectedDate);
})

function setupDatePicker(selectedDate) {
    datePickerHeaderText.innerText= format(shownDate, "MMMM - yyyy");
    setupDates(selectedDate);
}

function setupDates(selectedDate){
    const firstWeekStart = startOfWeek(startOfMonth(shownDate));
    const lastWeekEnd = endOfWeek(endOfMonth(shownDate));
    const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeekEnd});
    dateGrid.innerHTML = "";

    dates.forEach(e => {
        const dateElement = document.createElement("button");
        dateElement.classList.add("date");
        dateElement.innerText = e.getDate();
        dateGrid.appendChild(dateElement);

        if (!isSameMonth(e, shownDate)) {
            dateElement.classList.add("date-picker-other-month-date");
        }

        if (getDate(e) === getDate(selectedDate)) {
            dateElement.classList.add("selected");
        }

        dateElement.addEventListener("click", () => {
            setDate(e);
            datePicker.classList.remove("show");
        })
    })
}

setDate(new Date());

function setDate(date){
    datePickerButton.innerText = format(date, "MMMM do, yyyy");
    datePickerButton.dataset.selectedDate = getUnixTime(date);
}






