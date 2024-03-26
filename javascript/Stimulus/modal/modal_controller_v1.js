import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ['header','content', 'modal'];
  MAX_LENGTH_OF_TOAST_MESSAGE = 100;
 
  connect() {
    this.contentTarget.addEventListener("turbo:frame-load", this.open.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  disconnect() {
    this.contentTarget.removeEventListener("turbo:frame-load", this.open.bind(this));
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleKeydown(e) {
    // Check if a key is pressed
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'Enter'){
      this.submit(e);
    }
  }

  submit(e){
    e.preventDefault();
    // if all the forms are filled out, continue.
    const form = e.target.closest('form');
    let isValid = this.validateForm(form);

    if(isValid){
      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          "Accept": 'text/html',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin',
        cache: 'no-store', // Do not cache anything
        redirect: 'follow', // Always redirect
        referrerPolicy: 'no-referrer-when-downgrade'
      }).then(response => {
        if (!response.ok) return response.text().then(text => {throw new Error(text);});
        if (response.redirected) window.location.href = response.url;
        this.close(e);
      }).catch(e => {
        const modal = document.getElementById('modal_toast_default');
        // Try to get the server's toast if it is not too long = otherwise get the default message.
        let message = (e.message.length < this.MAX_LENGTH_OF_TOAST_MESSAGE) ? e.message : (modal !== null) ? modal.textContent : ''; 
        let payload = { "alert_nobounce" : message};
        console.log(payload);
        // Send the json payload to the toast controller for rendering
        const event = new CustomEvent("modalToast", { detail: { JSON: JSON.stringify(payload) } });
        document.dispatchEvent(event);
      })
    } else {
      // Send a toast saying there is a missing field
      const event = new CustomEvent("modalToast", { detail: { JSON: JSON.stringify({ "alert" : "Please fill out the missing enteries"}) } });
      document.dispatchEvent(event);
    }
  }

  validateForm(form) {
    // Tell the browser to find any required fields
    let isValid = true;
    let selector = 'input:required, select:required';
    let requiredFields = form.querySelectorAll(selector);
    console.log(form.querySelectorAll(selector));
    requiredFields.forEach((field) => {
      // for input
      if (!field.disabled && !field.value.trim()) {
        field.classList.add("border-red-900");
        isValid = false;
      }
    });
    return isValid;
  }
  
  open() {
    this.setModalHeader(true); // Set the header of the modal
    this.setVisibility(true);
  }

  close(e) {
    e.preventDefault(); // Prevent default action

    this.setVisibility(false);

    // wait for 1.2s before cleanup
    setTimeout(()=>{
      this.setModalHeader(false); 
      this.contentTarget.removeAttribute("src");
      this.contentTarget.innerHTML = "";
    }, 1200);


  }

  setModalHeader(open) {
    this.headerTarget.innerHTML = !open ? "" : document.getElementById("modal_header_text").textContent;
  }

  async setVisibility(open) {
    if(open){
      this.modalTarget.classList.remove("opacity-0", "hidden");
      this.modalTarget.classList.add("opacity-5");
      await new Promise(resolve => setTimeout(resolve, 1)); // Wait for 1ms
      this.modalTarget.classList.remove("opacity-5");
      this.modalTarget.classList.add("opacity-100");

    } else {
      this.modalTarget.classList.remove("opacity-100");
      this.modalTarget.classList.add("opacity-0");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1s
      this.modalTarget.classList.add("hidden");
    }
 }
}