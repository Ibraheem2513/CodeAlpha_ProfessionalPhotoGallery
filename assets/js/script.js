const galleryData = [
  {
    src: "https://cdn.pixabay.com/photo/2025/07/12/10/04/reinebringen-9710168_1280.jpg",
    title: "Mountain Serenity",
    description: "A breathtaking view of mountains during purple hour.",
    category: "Nature",
  },
  {
    src: "https://cdn.pixabay.com/photo/2022/06/27/18/55/grain-7288138_640.jpg",
    title: "Golden Hour",
    description: "Sunset over snow-capped mountains.",
    category: "Nature",
  },
  {
    src: "https://cdn.pixabay.com/photo/2019/08/29/20/00/wheat-fields-4439896_640.jpg",
    title: "Rolling Hills",
    description: "Gentle rolling hills in sunrise.",
    category: "Nature",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/05/05/15/06/architecture-2287327_1280.jpg",
    title: "Modern Architecture",
    description: "Modern curves and forms.",
    category: "Architecture",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg",
    title: "Glass Perspective",
    description: "Sky-touching glass building.",
    category: "Architecture",
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/09/28/21/10/saint-isaacs-cathedral-3710237_1280.jpg",
    title: "Historic Dome",
    description: "Classical cathedral dome.",
    category: "Architecture",
  },
  {
    src: "https://cdn.pixabay.com/photo/2017/08/05/18/53/mountain-2585069_1280.jpg",
    title: "Mountain Explorer",
    description: "Traveler at a cliff edge.",
    category: "Travel",
  },
  {
    src: "https://cdn.pixabay.com/photo/2023/01/18/13/09/camera-7726802_1280.jpg",
    title: "Capture the Moment",
    description: "Photographer in action.",
    category: "Travel",
  },
];

let currentIndex = 0;
let filtered = [...galleryData];

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const currentIndexSpan = document.getElementById("current-index");
const totalImagesSpan = document.getElementById("total-images");


navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

function renderGallery(images) {
  gallery.innerHTML = "";
  images.forEach((img, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-category", img.category);
    item.innerHTML = `
      <img src="${img.src}" alt="${img.title}" />
      <div class="overlay">
        <h3>${img.title}</h3>
        <p>${img.category}</p>
        <button class="view-btn"><i class="fas fa-expand"></i></button>
      </div>
    `;
    item.addEventListener("click", () => openLightbox(filtered.indexOf(img)));
    item.querySelector(".view-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(filtered.indexOf(img));
    });
    gallery.appendChild(item);
  });
  totalImagesSpan.textContent = images.length;
}

function openLightbox(index) {
  currentIndex = index;
  const img = filtered[currentIndex];
  lightboxImage.classList.remove("loaded");
  lightboxImage.onload = () => lightboxImage.classList.add("loaded");
  lightboxImage.src = img.src;
  lightboxTitle.textContent = img.title;
  lightboxDescription.textContent = img.description;
  currentIndexSpan.textContent = currentIndex + 1;
  totalImagesSpan.textContent = filtered.length;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % filtered.length;
  openLightbox(currentIndex);
}

function previousImage() {
  currentIndex = (currentIndex - 1 + filtered.length) % filtered.length;
  openLightbox(currentIndex);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-filter");
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filtered =
      category === "all"
        ? [...galleryData]
        : galleryData.filter((img) => img.category === category);
    renderGallery(filtered);
  });
});

document.querySelector(".close-btn").addEventListener("click", closeLightbox);
document.querySelector(".next-btn").addEventListener("click", nextImage);
document.querySelector(".prev-btn").addEventListener("click", previousImage);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") previousImage();
  if (e.key === "ArrowRight") nextImage();
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = scrollPercent + "%";
});

document.addEventListener("DOMContentLoaded", () => {
  renderGallery(filtered);
});
