//code challenge 3
const baseURL = 'http://localhost:3000';

// Function to make GET requests
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to make PATCH requests
async function patchData(url, body) {
  await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

// Function to make POST requests
async function postData(url, body) {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

// Function to delete a film
async function deleteFilm(id) {
  await fetch(`${baseURL}/films/${id}`, {
    method: 'DELETE',
  });
}

// Function to render films in the menu
async function renderFilms() {
  const films = await fetchData(`${baseURL}/films`);
  const filmsList = document.getElementById('films');

  films.forEach((film) => {
    const li = document.createElement('li');
    li.classList.add('film', 'item');
    if (film.tickets_sold >= film.capacity) {
      li.classList.add('sold-out');
    }
    li.textContent = film.title;
    filmsList.appendChild(li);
  });
}

// Function to render film details
async function renderFilmDetails() {
  const film = await fetchData(`${baseURL}/films/1`);

  const poster = document.getElementById('poster');
  poster.src = film.poster;

  const title = document.getElementById('title');
  title.textContent = film.title;

  const runtime = document.getElementById('runtime');
  runtime.textContent = `Runtime: ${film.runtime} minutes`;

  const showtime = document.getElementById('showtime');
  showtime.textContent = `Showtime: ${film.showtime}`;

  const description = document.getElementById('film-info');
  description.textContent = film.description;

  const availableTickets = document.getElementById('ticket-num');
  const ticketsSold = film.tickets_sold;
  const available = film.capacity - ticketsSold;
  availableTickets.textContent = `${available} remaining tickets`;

  const buyTicketButton = document.getElementById('buy-ticket');
  if (available === 0) {
    buyTicketButton.disabled = true;
    buyTicketButton.textContent = 'Sold Out';
  } else {
    buyTicketButton.disabled = false;
    buyTicketButton.textContent = 'Buy Ticket';
  }

  buyTicketButton.addEventListener('click', async () => {
    if (available > 0) {
      await patchData(`${baseURL}/films/${film.id}`, { tickets_sold: ticketsSold + 1 });
      await postData(`${baseURL}/tickets`, { film_id: film.id, number_of_tickets: 1 });
      await renderFilmDetails();
    }
  });
}

// Event listener for film delete buttons
document.addEventListener('click', async (event) => {
  if (event.target.matches('.delete-button')) {
    const filmId = event.target.dataset.filmId;
    await deleteFilm(filmId);
    event.target.parentElement.remove();
  }
});

// Initial setup
renderFilms();
renderFilmDetails();
// Honestly I had to get some help :)
