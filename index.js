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
          createFilmListItem(film);
        });
  
        // Display the first movie by default
        if (films.length > 0) {
          currentFilm = films[0];
          displayFilmDetails(currentFilm);
        }
      });
  
    // Create a list item for each film with a delete button
    function createFilmListItem(film) {
      const li = document.createElement("li");
      li.textContent = film.title;
  
      // Add 'sold-out' class if necessary
      if (film.capacity - film.tickets_sold === 0) {
        li.classList.add("sold-out");
      }
  
      // Add click event to display details
      li.addEventListener("click", () => displayFilmDetails(film));
  
      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent triggering the display event
        deleteFilm(film, li);
      });
  
      li.appendChild(deleteButton);
      moviesList.appendChild(li);
    }
  
    // Display movie details in the main section
    function displayFilmDetails(film) {
      currentFilm = film;
      filmDetails.poster.src = film.poster;
      filmDetails.title.textContent = film.title;
      filmDetails.description.textContent = film.description;
      filmDetails.runtime.textContent = film.runtime;
      filmDetails.showtime.textContent = film.showtime;
      const availableTickets = film.capacity - film.tickets_sold;
      filmDetails.availableTickets.textContent = availableTickets;
  
      // Update button state and text for sold-out films
      if (availableTickets === 0) {
        filmDetails.buyButton.textContent = "Sold Out";
        filmDetails.buyButton.disabled = true;
      } else {
        filmDetails.buyButton.textContent = "Buy Ticket";
        filmDetails.buyButton.disabled = false;
      }
  
      // Attach the event listener for buying tickets
      filmDetails.buyButton.onclick = () => buyTicket(film);
    }
  
    // Handle ticket purchase
    function buyTicket(film) {
      const availableTickets = film.capacity - film.tickets_sold;
      if (availableTickets > 0) {
        film.tickets_sold += 1;
        const updatedTickets = film.capacity - film.tickets_sold;
        filmDetails.availableTickets.textContent = updatedTickets;
  
        // Update button state and text if sold out
        if (updatedTickets === 0) {
          filmDetails.buyButton.textContent = "Sold Out";
          filmDetails.buyButton.disabled = true;
  
          // Update the sold-out class in the movie list
          const movieItems = moviesList.querySelectorAll("li");
          movieItems.forEach((item) => {
            if (item.textContent.includes(film.title)) {
              item.classList.add("sold-out");
            }
          });
        }
  
        // Persist the updated tickets to the server
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
  
    // Handle film deletion
    function deleteFilm(film, listItem) {
      fetch(`${API_URL}/${film.id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            listItem.remove(); // Remove the film from the list
            alert(`${film.title} has been deleted.`);
          } else {
            alert("Failed to delete the film. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error deleting film:", error);
          alert("An error occurred. Please try again.");
        });
    }
  });
  