// Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const searchSection = document.getElementById('search-section');
const bookingsSection = document.getElementById('bookings-section');
const flightsList = document.getElementById('flights-list');
const bookingsList = document.getElementById('bookings-list');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');
const bookingModal = document.getElementById('booking-modal');
const bookForm = document.getElementById('book-form');
const closeBookBtn = document.getElementById('close-book');
const flightIdInput = document.getElementById('flight_id');

// Dummy user database
let users = [];
let currentUser = null;

// Dummy flights data
const flights = [
  {id: 1, source: 'Delhi', destination: 'Mumbai', date: '2025-10-29', price: 5000},
  {id: 2, source: 'Delhi', destination: 'Bangalore', date: '2025-09-24', price: 4500},
  {id: 3, source: 'Mumbai', destination: 'Chennai', date: '2025-09-25', price: 4000}
];

// Bookings
let bookings = [];

// Switch to Register
showRegisterBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

// Switch to Login
showLoginBtn.addEventListener('click', () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Handle Register
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = registerForm.name.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  if(users.find(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }

  users.push({name, email, password});
  alert("Registration successful! Please login.");
  registerForm.reset();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Handle Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  const user = users.find(u => u.email === email && u.password === password);
  if(user) {
    alert(`Welcome, ${user.name}!`);
    currentUser = user;
    loginForm.style.display = 'none';
    searchSection.style.display = 'block';
    bookingsSection.style.display = 'block';
  } else {
    alert("Invalid email or password!");
  }
});

// Search Flights
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const source = e.target.source.value;
  const destination = e.target.destination.value;
  const date = e.target.date.value;

  const results = flights.filter(f => f.source === source && f.destination === destination && f.date === date);

  flightsList.innerHTML = '';
  if(results.length === 0){
    flightsList.innerHTML = '<p>No flights found.</p>';
    return;
  }

  results.forEach(f => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>Flight: ${f.source} → ${f.destination}, Date: ${f.date}, Price: ₹${f.price}</p>
      <button onclick="openBookingModal(${f.id})">Book</button>
    `;
    flightsList.appendChild(div);
  });
});

// Open Booking Modal
function openBookingModal(flightId){
  flightIdInput.value = flightId;
  bookingModal.style.display = 'block';
}

// Close Booking Modal
closeBookBtn.addEventListener('click', () => {
  bookingModal.style.display = 'none';
});

// Confirm Booking
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const flightId = parseInt(flightIdInput.value);
  const passenger_name = bookForm.passenger_name.value;
  const passenger_age = bookForm.passenger_age.value;
  const seats = bookForm.seats.value;

  const flight = flights.find(f => f.id === flightId);
  const booking = {
    user: currentUser.email,
    flight: flight,
    passenger_name,
    passenger_age,
    seats
  };
  bookings.push(booking);

  alert("Booking confirmed!");
  bookingModal.style.display = 'none';
  bookForm.reset();
  renderBookings();
});

// Render User Bookings
function renderBookings(){
  bookingsList.innerHTML = '';
  const userBookings = bookings.filter(b => b.user === currentUser.email);
  if(userBookings.length === 0){
    bookingsList.innerHTML = '<p>No bookings yet.</p>';
    return;
  }
  userBookings.forEach(b => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${b.passenger_name} (${b.passenger_age} yrs) - Flight: ${b.flight.source} → ${b.flight.destination}, Seats: ${b.seats}</p>
    `;
    bookingsList.appendChild(div);
  });
}
