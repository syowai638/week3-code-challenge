document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000/films";
  
    const filmDetails = {
      poster: document.getElementById("poster"),
      title: document.getElementById("title"),
      description: document.getElementById("description"),
      runtime: document.getElementById("runtime"),
      showtime: document.getElementById("showtime"),
      availableTickets: document.getElementById("available-tickets"),
      buyButton: document.getElementById("buy-ticket"),
    };
  
    const moviesList = document.getElementById("movies-list");
  
    let currentFilm;
  
    // Fetch all movies and populate the list
    fetch(API_URL)
      .then((response) => response.json())
      .then((films) => {
        films.forEach((film) => {
          const li = document.createElement("li");
          li.textContent = film.title;
          li.addEventListener("click", () => displayFilmDetails(film));
          moviesList.appendChild(li);
        });
  
        // Display the first movie by default
        if (films.length > 0) {
          currentFilm = films[0];
          displayFilmDetails(currentFilm);
        }
      });
  
    // Display movie details in the main section
    function displayFilmDetails(film) {
      currentFilm = film;
      filmDetails.poster.src = film.poster;
      filmDetails.title.textContent = film.title;
      filmDetails.description.textContent = film.description;
      filmDetails.runtime.textContent = film.runtime;
      filmDetails.showtime.textContent = film.showtime;
      filmDetails.availableTickets.textContent =
        film.capacity - film.tickets_sold;
  
      filmDetails.buyButton.disabled = film.capacity - film.tickets_sold === 0;
  
      filmDetails.buyButton.onclick = () => buyTicket(film);
    }
  
    // Handle ticket purchase
    function buyTicket(film) {
      const availableTickets = film.capacity - film.tickets_sold;
      if (availableTickets > 0) {
        film.tickets_sold += 1;
        filmDetails.availableTickets.textContent = film.capacity - film.tickets_sold;
  
        if (film.capacity - film.tickets_sold === 0) {
          filmDetails.buyButton.disabled = true;
        }
  
        fetch(`${API_URL}/${film.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tickets_sold: film.tickets_sold,
          }),
        });
      } else {
        alert("Tickets are sold out!");
      }
    }
  });
  