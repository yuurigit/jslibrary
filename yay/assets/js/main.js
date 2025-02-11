// NASA API Key
const apiKey = "xVHKgULB1mfY2UelBe0rWo3wPY1UTQs3A0uFDww1";
const apiUrl = "https://api.nasa.gov/planetary/apod";

async function fetchImage(date = "") {
    try {
        // Construct API URL with date if provided
        const url = date ? `${apiUrl}?api_key=${apiKey}&date=${date}` : `${apiUrl}?api_key=${apiKey}`;
        
        // Fetch data from NASA API
        const response = await fetch(url);
        const data = await response.json();

        // Update UI with the fetched data
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display the fetched data on the page
function displayData(data) {
    // Get elements from the DOM
    const heading = document.querySelector("h2");
    const dateHeading = document.querySelector("h3"); // Reference to h3 for the date 
    const imageContainer = document.querySelector("#image-container");
    const description = document.querySelector("#description");

    // Update the heading with the title
    heading.textContent = data.title;

    // Display the date in h3 	
    const date = data.date; 
    dateHeading.textContent = `Date: ${date}`;  

    // Clear previous content
    imageContainer.innerHTML = "";

    // Check if the media type is an image or video
    if (data.media_type === "image") {
        const imgElement = document.createElement("img");
        imgElement.src = data.url;
        imgElement.alt = data.title;
        imgElement.style.maxWidth = "100%";
        imageContainer.appendChild(imgElement);
    } else if (data.media_type === "video") {
        const iframeElement = document.createElement("iframe");
        iframeElement.src = data.url;
        iframeElement.allowFullscreen = true;
        iframeElement.style.width = "100%";
        iframeElement.style.height = "315px";
        imageContainer.appendChild(iframeElement);
    }

    // Update the description
    description.textContent = data.explanation;
}

// Event listener for form submission
document.querySelector("#date-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
    const dateInput = document.querySelector("#date-input").value;
    if (dateInput) {
        fetchImage(dateInput); // Fetch image for the selected date
    }
});

fetchImage();
