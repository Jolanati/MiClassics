const vehicleToggle = document.getElementById('vehicleToggle');
const prices = Array.from(document.querySelectorAll('.price'));
const reviewText = document.getElementById('reviewText');
const reviewAuthor = document.getElementById('reviewAuthor');
const prevReview = document.getElementById('prevReview');
const nextReview = document.getElementById('nextReview');
const packageType = document.getElementById('packageType');
const vehicleType = document.getElementById('vehicleType');
const estimate = document.getElementById('estimate');

const reviews = [
  {
    text: 'Best car wash in the area. They removed stains I thought were permanent.',
    author: '— Alex M.',
  },
  {
    text: 'Interior detail was flawless. My SUV looked and smelled brand new.',
    author: '— Priya K.',
  },
  {
    text: 'Fast service, friendly crew, and no swirl marks. Highly recommended.',
    author: '— Daniel R.',
  },
];

let reviewIndex = 0;

function setReview(index) {
  const review = reviews[index];
  reviewText.textContent = `“${review.text}”`;
  reviewAuthor.textContent = review.author;
}

function updateDisplayedPrices() {
  const useSuv = vehicleToggle.checked;
  prices.forEach((price) => {
    const sedan = price.dataset.sedan;
    const suv = price.dataset.suv;
    price.textContent = `$${useSuv ? suv : sedan}`;
  });
}

function updateEstimate() {
  const base = Number(packageType.value);
  const multiplier = vehicleType.value === 'suv' ? 1.15 : 1;
  estimate.textContent = `$${Math.round(base * multiplier)}`;
}

function setupRevealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
}

function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    const isDecimal = String(target).includes('.');
    let value = 0;

    const timer = setInterval(() => {
      value += target / 40;
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      counter.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
    }, 25);
  });
}

vehicleToggle.addEventListener('change', updateDisplayedPrices);
packageType.addEventListener('change', updateEstimate);
vehicleType.addEventListener('change', updateEstimate);

prevReview.addEventListener('click', () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  setReview(reviewIndex);
});

nextReview.addEventListener('click', () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  setReview(reviewIndex);
});

setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  setReview(reviewIndex);
}, 5000);

setReview(0);
setupRevealOnScroll();
animateCounters();
updateDisplayedPrices();
updateEstimate();
document.getElementById('year').textContent = new Date().getFullYear();
