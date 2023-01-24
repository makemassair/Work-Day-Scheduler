// Set constants
const currentDay = $("#currentDay");
const container = $(".container");
// $("#saved-message").hide()

var hours = { 
    dayStart: 9, // start of day 
    dayEnd: 18 // end of day
};

// handle to display the time
displayTime();

function displayTime() {
    let today = moment().format('dddd, MMMM Do')
    currentDay.text(today)
};

for (let i = hours.dayStart; i <= hours.dayEnd; i++) {
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

    // prints hour slot on schedule
    let displayHour = moment(`2023-01-01T${i < 10 ? "0" + i : i}:00:00`).format("ha")
    let displayLabel = $('<label>')
    .addClass("timeSlot")
    .addClass("text-right")
    .text(displayHour);

    textAreaWrapper.append(displayLabel);
    // textAreaWrapper.text(displayHour);
    textAreaWrapper.append(textarea);
    textAreaWrapper.append(btnSave);

    // identifies if time slot is past, present of future
    let currentTime = moment().format("H");
    if (i < currentTime) {
      textarea.addClass("past");
    } else if (i == currentTime) {
      textarea.addClass("present");
    } else {
      textarea.addClass("future");
    };
};

// saving to local storage
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

// confirmation display message
function displaySavedMessage() {
  let displayMessage = $("#saved-message")
  displayMessage.toggleClass("hideMessage");
  setTimeout(() => {
    displayMessage.toggleClass("hideMessage")
  }, 2000)
;}

