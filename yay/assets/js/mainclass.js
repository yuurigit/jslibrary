const apiKey = "xVHKgULB1mfY2UelBe0rWo3wPY1UTQs3A0uFDww1";

document.getElementById("date-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // ページリロードを防ぐ

    const dateInput = document.getElementById("date-input").value; // ユーザーが入力した日付
    if (!dateInput) {
        alert("Please enter a valid date.");
        return;
    }

    await getData(dateInput);
});

async function getData(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("Error: " + data.error.message);
            return;
        }

        const imageContainer = document.getElementById("image-container");
        const description = document.getElementById("description");

        if (data.media_type === "image") {
            imageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}" />`;
        } else if (data.media_type === "video") {
            imageContainer.innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
        }

        description.innerHTML = `<strong>${data.title}</strong><br>${data.explanation}`;
    } catch (error) {
        console.error("API fetch error:", error);
    }
}
