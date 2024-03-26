import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="date-of-birth"
export default class extends Controller {
  elemYear = null;
  elemMonth = null;
  elemDay = null;
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentYear = null

  connect() {
    this.elemYear = document.getElementById("bday_year");
    this.elemMonth = document.getElementById("bday_month");
    this.elemDay = document.getElementById("bday_day");
    this.currentYear = new Date().getFullYear();

    this.defaults();
    this.element.querySelector('#bday_month').addEventListener('change', () => this.updateDays())
  };

  getDaysInMonth(month, year){
    // Handles leap years
    return new Date(year, month, 0).getDate();
  }

  defaults(){
    // Reset selections
    this.elemYear.innerHTML = ``;
    this.elemMonth.innerHTML = ``;
    this.elemDay.innerHTML = `<option value="1">1</option>`;

    for(let i = this.currentYear; i >= this.currentYear-100; i--){
      this.elemYear.innerHTML += `<option value="${i}">${i}</option>`;
    }
    this.monthNames.forEach((_,i) => {
      this.elemMonth.innerHTML += `<option value="${i+1}">${this.monthNames[i]}</option>`;
    })
    for(let i = 2; i <= 31; i++){
      this.elemDay.innerHTML += `<option value="${i}">${i}</option>`;
    }
  };

  updateDays() {
    const day = this.elemDay.value;      
    const month = this.elemMonth.value;
    const year = this.elemYear.value;
    const monthIndex = this.monthNames.indexOf(month)+1;
    const daysInMonth = this.getDaysInMonth(monthIndex, year);

    this.elemDay.innerHTML = '';
    for(let i = 1; i <= daysInMonth; i++){
      this.elemDay.innerHTML += `<option value="${i}">${i}</option>`;
    }

    this.elemDay.value = (day <= daysInMonth) ? day : daysInMonth;
  }
}