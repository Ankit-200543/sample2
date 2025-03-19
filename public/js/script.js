
const socket = io();
const Fbutton = document.getElementById("of");
const Fc = document.getElementById("form");
const sname = document.getElementById("sname");
const content= document.getElementById("content");




Fbutton.addEventListener("click", function () {
    if (Fc.style.display === "none" || Fc.style.display === "") {
        Fc.style.display = "block";
    } else {
        Fc.style.display = "none";
    }
});
sname.addEventListener("click", function () {
    const userName = document.getElementById("name").value; // Fetch value inside event
    Fc.style.display = "none";
    content.innerText = "Hello " + userName + ", now your location is starting to be shared";
    Fbutton.style.display = "none";
})




if (navigator.geolocation) {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("location is started sharing")
                const { latitude, longitude } = position.coords;
               socket.emit("send-location", { latitude, longitude });

                window.currentLatitude = latitude;
                window.currentLongitude = longitude;

                if (typeof initMap === "function") {
                    initMap(latitude, longitude);
                }
            },
            (error) => {
                console.log("Something went wrong!", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    }, 5000); 
} else {
    console.log("Geolocation is not supported by this browser.");
}
