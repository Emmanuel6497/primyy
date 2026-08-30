/* ==========================================================================
   TRIAD OFFICIAL SCRIPT - DYNAMIC CONTROLLER & SPA NAVIGATION
   ========================================================================== */

// --- Comprehensive Service Catalogue for Dynamic Search ---
const triadServices = [
  { name: "Photography & Cinematic Videography", cat: "Media" },
  { name: "UI/UX & Graphics Design", cat: "Media" },
  { name: "Video Advertisements & Commercials", cat: "Media" },
  { name: "Live Video Transmission", cat: "Media" },
  { name: "Complete Brand Identity & Guidelines", cat: "Media" },
  { name: "Multimedia Technical Training", cat: "Media" },
  { name: "Full-Stack Web Development", cat: "Tech" },
  { name: "Custom Tech & Enterprise Solutions", cat: "Tech" },
  { name: "Digital Transformation Projects", cat: "Tech" },
  { name: "Business Web Presence Enhancement", cat: "Tech" },
  { name: "Web Technologies Training", cat: "Tech" },
  { name: "Data-Driven Digital Marketing", cat: "Business" },
  { name: "Global Customer Outreach Systems", cat: "Business" },
  { name: "Brand Growth Strategy", cat: "Business" }
];

// --- Category Detailed Content Payload ---
const categoryDetails = {
  media: {
    title: "Media Solutions",
    tagline: "High-Definition Visual Storytelling & Human-Centric Design",
    heroImg: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    services: [
      { name: "Photography & Videography", desc: "Studio-grade photography, event coverage, and 4K commercial videos tailored to highlight your product elegance." },
      { name: "UI/UX & Graphics Design", desc: "Modern user interface design, user journey mapping, logos, vector illustration, and brand visual guidelines." },
      { name: "Video Ads & Live Transmission", desc: "Engaging commercial advertisements designed for viral conversion alongside broadcast-quality live streaming." },
      { name: "Complete Branding & Training", desc: "End-to-end brand identity creation and hands-on professional multimedia coaching." },
      { name: "Media Training", desc: "Training on media tools, technologies and techniques." }

    ]
  },
  tech: {
    title: "Tech and Engineering Solutions",
    tagline: "Scalable Web Applications & Enterprise Software Infrastructure",
    heroImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    services: [
      { name: "Web Development", desc: "Blazing fast, responsive web applications engineered using modern JavaScript frameworks and robust backend architectures." },
      { name: "Digital Transformation", desc: "Automating legacy offline business processes with custom automated cloud platforms." },
      { name: "Web Presence Enhancement", desc: "Optimizing technical performance, SEO, security, and conversion rate architecture for existing platforms." },
      { name: "Tech Training", desc: "Capacity building programs teaching modern web tech stack implementation." }
    ]
  },
  business: {
    title: "Business Solutions & Growth",
    tagline: "Connecting Technological Excellence with Market Penetration",
    heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    services: [
      { name: "Digital Marketing", desc: "Targeted PPC, social media growth strategies, and content funnels designed to deliver measurable ROI." },
      { name: "Customer Acquisition", desc: "Leveraging custom lead generation systems to connect products directly with global client bases." },
      { name: "Strategic Business positioning", desc: "Market analysis and competitive positioning to establish brand authority in any country." }
    ]
  }
};

// --- Single Page Application (SPA) Router ---
function navigateTo(viewId) {
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => v.classList.remove('active-view'));
  
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// --- Dynamic Category Page Loader ---
function openCategory(catKey) {
  const data = categoryDetails[catKey];
  if (!data) return;

  const categoryContainer = document.getElementById('category-content');
  
  let servicesHtml = data.services.map(s => `
    <div class="category-card" style="padding: 24px; margin-bottom: 20px;">
      <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${s.name}</h3>
      <p style="color: #4b5563; font-size: 0.95rem;">${s.desc}</p>
    </div>
  `).join('');

  categoryContainer.innerHTML = `
    <div style="margin-bottom: 30px;">
      <span class="hero-badge">Department Deep-Dive</span>
      <h1 style="font-size: 2.8rem; margin: 10px 0;">${data.title}</h1>
      <p style="font-size: 1.2rem; color: #4b5563;">${data.tagline}</p>
    </div>
    <div style="width: 100%; height: 350px; border-radius: 12px; overflow: hidden; margin-bottom: 40px;">
      <img src="${data.heroImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="${data.title}" />
    </div>
    <h2 style="margin-bottom: 20px;">Detailed Service Offerings</h2>
    <div>${servicesHtml}</div>
    <div style="margin-top: 40px; text-align: center; background: #f8f9fa; padding: 40px; border-radius: 12px;">
      <h3>Ready to start a ${data.title} contract?</h3>
      <p style="color: #6b7280; margin: 10px 0 20px;">Remember, you pay zero upfront fees. Payment is strictly post-delivery.</p>
      <button class="btn btn-primary shimmer-btn" onclick="navigateTo('booking-view')">Book This Service Now</button>
    </div>
  `;

  navigateTo('category-view');
}

// --- Expandable Search Bar Handler ---
function toggleSearch() {
  const searchBox = document.getElementById('searchBox');
  const searchInput = document.getElementById('searchInput');
  searchBox.classList.toggle('active');
  if (searchBox.classList.contains('active')) {
    searchInput.focus();
  }
}

function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const dropdown = document.getElementById('searchResults');

  if (query.length < 2) {
    dropdown.style.display = 'none';
    return;
  }

  const results = triadServices.filter(s => s.name.toLowerCase().includes(query) || s.cat.toLowerCase().includes(query));
  
  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-item">No service found</div>`;
  } else {
    dropdown.innerHTML = results.map(r => `
      <div class="search-item" onclick="selectSearchResult('${r.cat}')">
        <strong>${r.name}</strong> <br/>
        <small style="color: #6b7280;">Category: ${r.cat}</small>
      </div>
    `).join('');
  }

  dropdown.style.display = 'flex';
}

function selectSearchResult(category) {
  document.getElementById('searchResults').style.display = 'none';
  openCategory(category.toLowerCase());
}

// --- Geo Location & Flag Detection ---
async function detectUserCountry() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      if (data.country_name) {
        document.getElementById('user-country').innerText = data.country_name;
        document.getElementById('user-flag').innerText = data.country_code ? getFlagEmoji(data.country_code) : '🌐';
        document.getElementById('userCountryInput').value = data.country_name;
      }
    }
  } catch (e) {
    console.log('Geo detection fallback used.');
  }
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// --- Booking Form Handler ---
function handleBookingSubmit(event) {
  event.preventDefault();
  document.getElementById('bookingForm').style.display = 'none';
  document.getElementById('bookingSuccessMsg').style.display = 'block';
}

// --- Continuous Infinite Carousel Cloning ---
function initEndlessCarousel() {
  const track = document.getElementById('endlessTrack');
  if (!track) return;
  const slides = Array.from(track.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });
}

// --- Initialize On Load ---
document.addEventListener('DOMContentLoaded', () => {
  detectUserCountry();
  initEndlessCarousel();
});









function composeEmail() {
  const recipient = "primyyofficial@gmail.com";
  const subject = encodeURIComponent("Inquiry regarding PRIMY Services");
  
  // Detect if user is on mobile
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Opens default mail app (Gmail app on mobile)
    window.location.href = `mailto:${recipient}?subject=${subject}`;
  } else {
    // Opens Gmail web compose directly on desktop
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}`, '_blank');
  }
}