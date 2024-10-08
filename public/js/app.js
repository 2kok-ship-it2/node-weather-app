console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  // this prevents the browser from doing the default page refresh and clearing of fields
  event.preventDefault();
  const location = searchTerm.value;
  const message1 = document.querySelector("#message1");
  const message2 = document.querySelector("#message2");

  message1.textContent = "loading...";
  message2.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = "";
        message2.textContent = data.error;
      } else {
        console.log(data);
        message1.textContent = data.location;
        message2.textContent = data.Forecast;
      }
    });
  });
});
