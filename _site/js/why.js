function whypc() {
  Swal.fire({
    html: `
    <div="container-fluid">
      <h4 class="text-danger p-1 fw-bold">Benefits of the Workstation</h4><br>
   <p>With our current gadgets(Dell i7, 12GB RAM, 2.80GHz), it takes us 13 hours to render (output) a 30-second 3D Animation using Cinema 4D Software</p>
   <p class="text-green">Acquiring the workstation PC(HP i7, 64GB RAM, 5GHz, 4GB NVIDIA Graphics) will improve this speed by over 10 times. This means we shall be able to output more videos in a given timeframe to meet our goals.</p>
   <p class="py-3"> <button class="btn gbutton border-0" onclick="whatsappUs()">
   <i class="bi bi-whatsapp"></i>  Whatsapp us
 </button> <button class="ms-2 btn btn-danger border-0" onclick="emailUs()">
 <i class="bi bi-envelope"></i>  Email us
</button>

</p>
   </div>
  `,
    showConfirmButton: false,
    showCancelButton: false,
  });
}

function whyaudio() {
  Swal.fire({
    html: `
      <div="container-fluid">
        <h4 class="text-danger p-1 fw-bold">Benefits of the audio interface</h4><br>
     <p> We currently use the V8 sound card, microphone and mobile app to record our vocals. The sound output is good but has much noise.</p>
     <p class="text-green">We would like to upgrade to the scarlet 2i2 Studio (3rd Gen) audio interface. This will greatly improve the quality of our audio (sound) production</p>
      
     <p class="py-3"> <button class="btn gbutton border-0" onclick="whatsappUs()">
     <i class="bi bi-whatsapp"></i>  Whatsapp us
   </button> <button class="ms-2 btn btn-danger border-0" onclick="emailUs()">
   <i class="bi bi-envelope"></i>  Email us
 </button>
  
</p>
     </div>
    `,
    showConfirmButton: false,
    showCancelButton: false,
  });
}
