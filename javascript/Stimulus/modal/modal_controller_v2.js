import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ['modal','content'];

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
      // this.submit(e);
    }
  }

  open() {
    this.setVisibility(true);
  }

  close(e) {
    e.preventDefault(); // Prevent default action

    this.setVisibility(false);

    // wait for 1.2s before cleanup
    setTimeout(()=>{
      this.contentTarget.removeAttribute("src");
      this.contentTarget.innerHTML = "";
    }, 1200);
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
