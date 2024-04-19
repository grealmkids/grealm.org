function contactus() {
  Swal.fire({
    html: `
        <div> <h1>Contact Us <button class="btn-lg btn-danger rounded-5 border-0" onclick="closePopup()"> &times; close
        </button></h1>
          
          <div class="w-100 bg-light text-center"><img src="images/minibanner.png" alt="Your Photo" class="w-100 text-center" /></div>
        
         <div class="my-3 text-center">
          
         <p class="py-3"> <button class="btn-lg btn-whatsapp border-0" onclick="whatsappUs()">
            <i class="bi bi-whatsapp"></i>  +256781 584927
          </button>
         
</p>

          <p class="pb-3">
          <button class="btn btn-dark rounded rounded-5" onclick="window.location.href='https://youtube.com/@grealmkidsstudio6335?si=IHylkxHHBRy2FpOm'">
            <i class="bi bi-youtube"></i> G-Realm Studio</button>
             </p>
     
        <p class="pb-3">
          <a class="btn btn-primary rounded rounded-5" href="tel:+256781 584927"> <i class="bi bi-phone"></i>  +256781 584927</a>
          </p>
          <p class="pb-3">
           <a class="btn btn-light shadow-2 shadow rounded rounded-5" href="tel:+256781 584927" href="mailto:grealmkids@gmail.com ">
           <i class="bi bi-envelope-fill"></i>  grealmkids@gmail.com</a>
          </p>
          <p>
          Mbalala (Mukono-Uganda)
         </p>
          </div>

        </div>
      `,
    showConfirmButton: false,
    showCancelButton: false,
  });
}

function closePopup() {
  Swal.close();
}

function whatsappUs() {
  window.location.href =
    "https://wa.me/+256781584927?text=Praise God G-Realm kids' Studio! ";
}

function emailUs() {
  window.location.href = "mailto:grealmkids@gmail.com";
}
