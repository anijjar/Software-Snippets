import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toast"
export default class extends Controller {
   static values = { flash: String }
   
   connect() {
      // handle async updates by the modal controller
      document.addEventListener("modalToast", this.modalToastHandler.bind(this));
      
      // on page load, read the flash cache and display them.
      setTimeout(() => {
         try {
            // console.log(this.flashValue);
            const toasts = JSON.parse(this.flashValue);
            // console.log(toasts);
            let listOfToasts = [];
            
            // Iterate over each flash message
            toasts.forEach(toast => {
               // Create an object with the type as the key and the message as the value
               let fixedToast = { [toast.type]: toast.message };
               // Add the combined object to the array
               listOfToasts.push(fixedToast);
            });
            
            // console.log(listOfToasts);
            // Pass the array of combined objects to the routine method
            this.routine(listOfToasts);
         } catch (e) {
            console.error("Toast Controller: Failed to parse flashValue", e);
         }
      }, 500);
   }
   
   disconnect() {
      document.removeEventListener("modalToast", this.modalToastHandler.bind(this));
   }

   modalToastHandler(e) {
      try {
         const data = JSON.parse(e.detail.JSON);
         console.log(data);
         // Check if data is an array and call routine accordingly
         this.routine(Array.isArray(data) ? data : [data]);
      } catch (error) {
         console.error('Error parsing JSON:', error);
      }
   }
   // Recursively, display each toast one at a time
   routine(toasts, indx = 0) {
      if (indx >= toasts.length) return; // exit recursion at the end of queue.
      const toast = toasts[indx];
      const type = Object.keys(toast)[0];
      // console.log(type, toast[type]);
      // console.log(type == 'notice');
      // if the message has nothing or it is a notice, skip it  
      if (toast[type] === null || type == 'notice') {
         this.routine(toasts, indx + 1);
      } else {
         this.element.innerHTML = toast[type];
         this.setClass(true, type);
         this.setVisibility(true);
         setTimeout( ()=>{
            this.setVisibility(false);
            setTimeout( ()=>{
               this.setClass(false, type);
               this.routine(toasts, indx + 1); // Show the next toast
            }, 500 ); // Let it fade out in 500ms
         }, 3000 ); // Wait for 3s
      }
   }
  
   // Modify messageClasses to change toast style
   setClass(open, type) {
      const messageClasses = {
         notice: "bg-magic-mint-700 text-magic-mint-50 border-magic-mint-900 animate-bounce",
         alert: "bg-rose-500 text-magic-mint-50 border-rose-900 animate-bounce",
         alert_nobounce: "bg-rose-500 text-magic-mint-50 border-rose-900",
         error: "bg-rose-500 text-magic-mint-50 border-rose-900",
         info: "bg-magic-mint-700 text-magic-mint-50 border-magic-mint-900 animate-bounce",
         default: "bg-slate-700 text-magic-mint-50 border-slate-900",
       };
      const style = messageClasses[type] || messageClasses["default"];
      const classes = style.split(' ');
      if(open){
         if(!this.element.classList.contains(...classes)){
            this.element.classList.add(...classes)
         }
      } else {
         this.element.classList.remove(...classes)
      }
   }
   // Make the toast visible
   setVisibility(open) {
      if(open){
         this.element.classList.remove("opacity-0")
         this.element.classList.add("opacity-100")
      } else {
         this.element.classList.remove("opacity-100")
         this.element.classList.add("opacity-0")
      }
   }
}
