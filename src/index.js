function displayDetails(movie){
  const title = document.getElementById('title');
  title.textContent = movie.title;

  const runtime = document.getElementById('runtime');
  runtime.innerHTML = `<p>Runtime: ${movie.runtime}</p>`;

  const showtime = document.getElementById('showtime');
  showtime.innerHTML = `<p>Showtime: ${movie.showtime}</p>`;

  const poster = document.getElementById('poster');
  poster.src = movie.poster;
  poster.alt = movie.title;

  const description = document.getElementById('film-info');
  description.innerHTML = `<p>${movie.description}</p>`;

  const remaining = document.getElementById('ticket-num');
  remaining.textContent = `${movie.capacity - movie.sold} tickets remaining`;

  // Buy Ticket functionality
  const buyTicketButton = document.getElementById('buy-ticket');
  buyTicketButton.addEventListener('click', () => {
    if (movie.sold < movie.capacity) {
      movie.sold++;
      remaining.textContent = `${movie.capacity - movie.sold} tickets remaining`;
    } else {
      alert('Sorry, all tickets are sold out!');
    }
  });
}
