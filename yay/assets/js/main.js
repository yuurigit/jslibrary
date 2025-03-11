// Gallery data
const seaScapes = [
    { name: "Reef at 10:30 AM", location: "Kerama Island", imageUrl: "./assets/images/Blue Reef at 1030 AM.jpeg" },
    { name: "Okinawa clear water at 4:00 PM", location: "Yomitan, Okinawa", imageUrl: "./assets/images/Yomitan, Okinawa clear water at 400 PM.jpg" },
    { name: "Sunset at 6:15 PM", location: "Itoman, Okinawa", imageUrl: "./assets/images/Itoman, Okinawa Sunset at 615 PM.jpeg" },
    { name: "Morning tide at 8:15 AM", location: "Yaese, Okinawa", imageUrl: "./assets/images/Morning tide at 815 AM.jpeg" },
    { name: "Sunrise over the horizon at 5:15 AM", location: "Kitanakagusuku, Okinawa", imageUrl: "./assets/images/Sunrise at 515 AM.jpg" },
    { name: "Crystal beach at 2:30 PM", location: "Ishigaki Island", imageUrl: "./assets/images/Ishigaki Island Crystal beach at 230 PM.jpeg" },
    { name: "Evening glow at 6:45 PM", location: "Motobu Okinawa", imageUrl: "./assets/images/Evening glow at 645 PM.jpeg" },
    { name: "Shallow waters at 11:00 AM", location: "Miyako Island", imageUrl: "./assets/images/Miyako Island Shallow waters at 1100 AM.jpeg" },
    { name: "Waves crashing at 7:00 PM", location: "Ginowan, Okinawa", imageUrl: "./assets/images/Waves crashing at 700 PM.jpeg" },
    { name: "Beach cove at 3:00 PM", location: "Uruma, Okinawa", imageUrl: "./assets/images/Beach cove at 300 PM.jpeg" },
    { name: "Calm sea at 1:45 PM", location: "Taketomi Island", imageUrl: "./assets/images/Calm sea at 145 PM.jpeg" },
    { name: "Tide pools at 11:45 AM", location: "Hamahiaga, Okinawa", imageUrl: "./assets/images/Tide pools at 1145 AM.jpeg" },
    { name: "Evening reflections at 5:50 PM", location: "Chatan, Okinawa", imageUrl: "./assets/images/Evening reflections at 550 PM.jpg" },
    { name: "Morning calm at 8:15 AM", location: "Yaese, Okinawa", imageUrl: "./assets/images/Morning calm at 715 AM.jpg" },
    { name: "Coastal cliffs at 2:15 PM", location: "Onna, Okinawa", imageUrl: "./assets/images/Coastal cliffs at 215 PM.jpeg" },

];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Fancybox
    Fancybox.bind("[data-fancybox]", {
        // Fancybox options
        caption: function (fancybox, carousel, slide) {
            return slide.caption;
        }
    });
    
    // Set initial positions of gallery items
    setRandomPositions();
});

// Function to set random positions using Lodash
function setRandomPositions() {
    const galleryContainer = document.getElementById('sea-gallery');
    galleryContainer.innerHTML = '';
    
    const shuffledSeaScapes = _.shuffle(seaScapes);
    const galleryItems = [];
  
    shuffledSeaScapes.forEach((seascape, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const topPos = Math.floor(Math.random() * 60);  
        const leftPos = Math.floor(Math.random() * 60) + 10; 

        galleryItem.style.top = `${topPos}%`;
        galleryItem.style.left = `${leftPos}%`;
        galleryItem.style.opacity = '0';
        
        galleryItem.innerHTML = `
            <a href="${seascape.imageUrl}" data-fancybox="gallery" data-caption="${seascape.name} - ${seascape.location}">
                <img src="${seascape.imageUrl}" alt="${seascape.name}">
            </a>
            <div class="image-overlay">
                <p class="font-bold">${seascape.name}</p>
                <p class="text-sm">${seascape.location}</p>
            </div>
        `;
        
        galleryContainer.appendChild(galleryItem);
        galleryItems.push(galleryItem);
        
        // image rotation
        gsap.to(galleryItem, {
            rotation: _.random(-3, 3),
            duration: 0
        });
    });
    
    // Anime.js 
    anime({
        targets: galleryItems,
        opacity: [0, 0.9],
        translateY: [50, 0],
        delay: anime.stagger(150),
        easing: 'easeOutQuad',
        duration: 800
    });

    // hover
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            anime({
                targets: item,
                scale: 1.05,
                opacity: 1,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                easing: 'easeOutElastic(1, .6)',
                duration: 800
            });
        });
        
        item.addEventListener('mouseleave', () => {
            anime({
                targets: item,
                scale: 1,
                opacity: 0.9,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                easing: 'easeOutQuad',
                duration: 400
            });
        });
    });
}

// random postioning
window.addEventListener('resize', _.debounce(setRandomPositions, 200));
