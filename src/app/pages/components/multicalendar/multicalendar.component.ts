import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-multicalendar',
  templateUrl: './multicalendar.component.html',
  styleUrls: ['./multicalendar.component.scss'],
})
export class MulticalendarComponent implements OnInit {

  private selectYear;
  private selectMonth;
  private months = [];
  private years = [];
  private highlightToday = true;
  private today = new Date();
  @Output() messageEmit = new EventEmitter<any>();;
  private selectedDates = [];
  private highlightClass = 'highlight';

  private minYear = new Date().getFullYear();
  private maxYear = new Date().getFullYear() + 2;
  private startMonth = 0;
  private endMonth = 11;
  private dateSeparator = ', ';

  private currentMonth = this.today.getMonth();
  private currentYear = this.today.getFullYear();

  private dictionaryMonth =
    [
      ["Enero", 0],
      ["Febrero", 1],
      ["Marzo", 2],
      ["Abril", 3],
      ["Mayo", 4],
      ["Junio", 5],
      ["Julio", 6],
      ["Agosto", 7],
      ["Septiembre", 8],
      ["Octubre", 9],
      ["Noviembre", 10],
      ["Diciembre", 11]
    ];

  constructor() {
  }

  ngOnInit(): void {
    this.today = new Date();
    let currentMonth = this.today.getMonth();
    let currentYear = this.today.getFullYear();
    this.selectYear = document.getElementById("year");
    this.selectMonth = document.getElementById("month");
    this.loadControl(currentMonth, currentYear);
  }

  loadControl(month, year) {
    this.addMonths(month);
    this.addYears(year);

    let firstDay = (new Date(year, month)).getDay();

    // body of the calendar
    var tbl = document.querySelector("#calendarBody");
    // clearing all previous cells
    tbl.innerHTML = "";


    var monthAndYear = document.getElementById("monthAndYear");
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = this.months[month] + " " + year;


    this.selectYear.value = year;
    this.selectMonth.value = month;

    // creating the date cells here
    let date = 1;

    // add the selected dates here to preselect
    //selectedDates.push((month + 1).toString() + '/' + date.toString() + '/' + year.toString());

    // there will be maximum 6 rows for any month
    for (let rowIterator = 0; rowIterator < 6; rowIterator++) {

      // creates a new table row and adds it to the table body
      let row = document.createElement("tr");

      //creating individual cells, filing them up with data.
      for (let cellIterated = 0; cellIterated < 7 && date <= this.daysInMonth(month, year); cellIterated++) {

        // create a table data cell
        let cell = document.createElement("td");
        let textNode = "";
        // check if this is the valid date for the month
        if (rowIterator !== 0 || cellIterated >= firstDay) {
          cell.id = (month + 1).toString() + '/' + date.toString() + '/' + year.toString();
          //cell.class = "clickable";
          textNode = date.toString();

          // this means that highlightToday is set to true and the date being iterated it todays date,
          // in such a scenario we will give it a background color
          if (this.highlightToday
            && date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
            cell.classList.add("today-color");
          }

          // set the previous dates to be selected
          // if the selectedDates array has the dates, it means they were selected earlier. 
          // add the background to it.
          if (this.selectedDates.indexOf((month + 1).toString() + '/' + date.toString() + '/' + year.toString()) >= 0) {
            cell.classList.add(this.highlightClass);
          }

          date++;
        }

        let cellText = document.createTextNode(textNode);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tbl.appendChild(row); // appending each row into calendar body.
    }

    // this adds the button panel at the bottom of the calendar
    this.addButtonPanel(tbl);

    // function when the date cells are clicked
    let daysReturn = document.querySelectorAll("#calendarBody > tr > td");
    let multicalendarObject = this;
    for (var i = 0; i < daysReturn.length; i++) {
      let contador = 0;
      daysReturn[i].addEventListener('click', function (event) {
        this.setAttribute('id', i);
        var id = this.getAttribute('id');
        // check the if cell clicked has a date
        // those with an id, have the date
        let day = this.innerHTML;
        let selectedDate = new Date(year, month, day);
        let dateContent = selectedDate.getFullYear() + '/' +
          ((selectedDate.getMonth() + 1).toString().length == 1 ? ('0' + (selectedDate.getMonth() + 1).toString()) : (selectedDate.getMonth() + 1).toString())
        + '/' +
          ((selectedDate.getDate()).toString().length == 1 ? ('0' + (selectedDate.getDate()).toString()) : (selectedDate.getDate()).toString());
        if (typeof id !== typeof undefined) {
          if (this.classList.length == 0) {
            this.setAttribute('class', i + "class");
          }
          if (!this.innerHTML.includes("Reset") && !this.innerHTML.includes("Done") && !this.getAttribute("class").includes("highlight")) {
            multicalendarObject.selectedDates.push(dateContent);
            multicalendarObject.messageEmit.emit(multicalendarObject.selectedDates);
          }
          else {
            var index = multicalendarObject.selectedDates.indexOf(dateContent);
            if (index > -1) {
              multicalendarObject.selectedDates.splice(index, 1);
              multicalendarObject.messageEmit.emit(multicalendarObject.selectedDates);
            }
          }
          if (this.getAttribute("class").includes("highlight")) {
            this.style.backgroundColor = "";
            this.classList.remove("highlight");
          } else {
            if (!this.innerHTML.toLowerCase().includes("reset") && !this.innerHTML.toLowerCase().includes("done")) {
              this.style.backgroundColor = "lightblue";
              this.classList.add("highlight");
            }
          }
        }

        // sort the selected dates array based on the latest date first
        var sortedArray = multicalendarObject.selectedDates.sort((a, b) => {
          return new Date(a).getTime() - new Date(b).getTime();
        });

        // update the selectedValues text input
        (document.getElementById('selectedValues') as HTMLInputElement).value = multicalendarObject.datesToString(sortedArray);

      });
    }

    let $search = document.querySelector('#selectedValues');
    let $dropBox: HTMLElement = document.querySelector('#parent');

    $search.addEventListener('blur', function (event) {
      //$dropBox.hide();
    });
    $search.addEventListener('focus', function () {
      //$dropBox.css( "display", "block" );
      $dropBox.style.display = "block";
    });
  }

  datesToString(dates) {
    return dates.join(this.dateSeparator);
  }

  next() {
    this.currentYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    if (this.currentYear > this.maxYear) return;
    this.loadControl(this.currentMonth, this.currentYear);
    (document.getElementById("month") as HTMLSelectElement).value = this.currentMonth.toString();
    (document.getElementById("year") as HTMLSelectElement).value = this.currentYear.toString();
  }
  previous() {
    this.currentYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    if (this.currentYear < this.minYear) return;
    this.loadControl(this.currentMonth, this.currentYear);
  }
  change() {
    this.currentYear = parseInt(this.selectYear.value);
    this.currentMonth = parseInt(this.selectMonth.value);
    this.loadControl(this.currentMonth, this.currentYear);
  }

  addMonths(selectedMonth) {
    let select: HTMLSelectElement = document.getElementById("month") as HTMLSelectElement;

    if (this.months.length > 0) {
      return;
    }

    for (var month = this.startMonth; month <= this.endMonth; month++) {
      let monthInstance = this.dictionaryMonth[month];
      this.months.push(monthInstance[0]);
      select.options[select.options.length] = new Option(monthInstance[0].toString(), monthInstance[1].toString(), parseInt(monthInstance[1].toString()) === parseInt(selectedMonth));
    }
  }

  addYears(selectedYear) {

    if (this.years.length > 0) {
      return;
    }

    let select = document.getElementById("year") as HTMLSelectElement;

    for (var year = this.minYear; year <= this.maxYear; year++) {
      this.years.push(year);
      select.options[select.options.length] = new Option(year.toString(), year.toString(), parseInt(year.toString()) === parseInt(selectedYear));
    }
    //select.value = 2012;
  }

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  resetCalendar() {
    // reset all the selected dates
    this.selectedDates = [];
    this.messageEmit.emit(this.selectedDates);
    let tr = document.querySelectorAll('#calendarBody  > tr');
    for (var i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
        td[j].classList.remove("highlight");
        td[j].style.backgroundColor = "";
      }
    }
  };

  endSelection() {
    //document.querySelector('#parent').hide();
    (document.querySelector('#parent') as HTMLDivElement).style.display = "none";
  }

  addButtonPanel(tbl) {
    // after we have looped for all the days and the calendar is complete,
    // we will add a panel that will show the buttons, reset and done
    let row = document.createElement("tr");
    row.className = 'buttonPanel';
    let cell = document.createElement("td");
    cell.colSpan = 7;
    var parentDiv = document.createElement("div");
    parentDiv.classList.add('row');
    parentDiv.classList.add('buttonPanel-row');


    var div = document.createElement("div");
    div.className = 'col-sm';
    var resetButton = document.createElement("button");
    resetButton.className = 'btn';
    resetButton.value = 'Reset';
    let multicalendarObject = this;
    resetButton.addEventListener("click", function () {
      multicalendarObject.resetCalendar();
    });
    var resetButtonText = document.createTextNode("Reiniciar");
    resetButton.appendChild(resetButtonText);

    div.appendChild(resetButton);
    parentDiv.appendChild(div);


    var div2 = document.createElement("div");
    div2.className = 'col-sm';
    var doneButton = document.createElement("button");
    doneButton.className = 'btn';
    doneButton.value = 'Done';
    doneButton.addEventListener("click", function () {
      multicalendarObject.endSelection();
    });
    var doneButtonText = document.createTextNode("Finalizar");
    doneButton.appendChild(doneButtonText);

    div2.appendChild(doneButton);
    parentDiv.appendChild(div2);

    cell.appendChild(parentDiv);
    row.appendChild(cell);
    // appending each row into calendar body.
    tbl.appendChild(row);
  }

}
