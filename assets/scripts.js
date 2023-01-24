// // Displayed the current day
// const currentDay = $('#currentDay');
// const schedule = $('#schedule');

// setInterval(() => {
//     currentDay.text(moment().format('dddd, MMMM Do'))
// }, 1000);

// var hours = { start: 8, end: 18 };
// for (let i = hours.start; i <= hours.end; i++) {
//     let textAreaWrapper = $("<div>");
//     let textArea = $("<li><textarea>");
//     schedule.append(textArea);
// }

const currentDay = $("#currentDay");
const container = $(".container");
// $("#saved-message").hide()

var hours = { 
    start: 9, // start of day
    end: 18 
};

// handle displaying the time
displayTime();

function displayTime() {
    let today = moment().format('dddd, MMMM Do')
    currentDay.text(today)
};


for (let i = hours.start; i <= hours.end; i++) {
    let textAreaWrapper = $("<row>")
    let btnSave = $("<button>")

    textAreaWrapper.addClass("row")
    btnSave.addClass("saveBtn")
    btnSave.attr("data-hour", i)
    btnSave.html("<i class='fa-solid fa-floppy-disk'></i>")
    btnSave.on("click", saveBtnHandler);

    let textarea = $("<textarea>");
    
    textarea.attr("id", i);    
    textarea.val(localStorage.getItem(i));
    container.append(textAreaWrapper);

    // Time slot
    let displayHour = moment(`2023-01-01T${i < 10 ? "0" + i : i}:00:00`).format("ha")
    let displayLabel = $('<label>')
    .addClass("timeSlot")
    .addClass("text-right")
    .text(displayHour);

    textAreaWrapper.append(displayLabel);
    // textAreaWrapper.text(displayHour);
    textAreaWrapper.append(textarea);
    textAreaWrapper.append(btnSave);

    // Identify if time slot is past, present of future
    let currentTime = moment().format("H");
    if (i < currentTime) {
      textarea.addClass("past");
    } else if (i == currentTime) {
      textarea.addClass("present");
    } else {
      textarea.addClass("future");
    };
};

function saveBtnHandler(e) {
  let button = $(e.currentTarget)
  let hour = button.attr("data-hour")
  let textarea = $(`#${hour}`)


  if (textarea.val().trim() === "") {
    localStorage.removeItem(hour)
  }else {
    localStorage.setItem(hour, textarea.val());
    displaySavedMessage()
    // $("#saved-message").show()
    // $("#saved-message").hide(3000)
  }
};

function displaySavedMessage() {
  let displayMessage = $("#saved-message")
  displayMessage.toggleClass("hideMessage");
  setTimeout(() => {
    displayMessage.toggleClass("hideMessage")
  }, 2000)
;}

