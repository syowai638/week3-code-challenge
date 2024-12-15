# Flatdango

Flatdango is a mini web application for purchasing tickets to movies at the Flatiron Movie Theater.

## Features

- View details of the first movie when the page loads, including:
  - Poster
  - Title
  - Description
  - Runtime
  - Showtime
  - Available tickets
- Browse a list of movies and select any movie to view its details.
- Purchase tickets for a selected movie, with the number of available tickets updated in real time.

## Technologies Used

- HTML, CSS, JavaScript
- JSON Server (for simulating a backend)

## Getting Started

- To ensure persistent data storage, the app uses local storage and synchronizes changes with the db.json file. Make sure the JSON Server is running while using the application to ensure API updates are applied successfully.



1. Clone this repository:
```bash
   git clone git@github.com:syowai638/week3-code-challenge.git
```

2. Navigate to the project directory
```bash
cd flatdango
```
3. Install JSON Server
```bash
npm install -g json-server
```
4. Start the JSON Server to serve data from the db.json file:
```bash
json-server --watch db.json --port 3000
```
5. Open the index.html file in your browser to access the application.

## How It Works
- Movie Details Section
- Displays information about the currently selected movie, including:
      - Poster
      - Title
     - Description
     - Runtime
     - Showtime
     - Available Tickets: Calculated as capacity - tickets_sold.

- Inline Editing for Movie Details
    - Users can double-click on specific movie attributes (e.g., title, description) to edit them.
    - Pressing "Enter" saves the changes, and the updated details are displayed immediately.

- Persistence with Local Storage
     - User actions, such as buying tickets or editing movie details, are stored in local storage.
     - Refreshing the page or restarting the app does not reset the data.


## Movies List Sidebar
- A list of all available movies is displayed.
- Clicking on a movie in the list updates the details section with information for the selected movie.

## Buying Tickets
- Users can buy a ticket for the selected movie by clicking the Buy Ticket button.
- Available tickets are updated in real-time. If no tickets are available, the button is disabled.

## JSON Server API Endpoints
- Get all movies:
     - GET http://localhost:3000/films

- Get a single movie:
     - GET http://localhost:3000/films/:id

- Update tickets sold for a movie:
    - PATCH http://localhost:3000/films/:id

## Inline Editing
- Users can edit the existing movie details directly from the interface.
- Changes made to the movie details are automatically saved and updated in real time.

## Persistent Data with Local Storage
- Movie preferences and purchase states are now saved in local storage.
- Even after refreshing the page or restarting the application, previously updated details remain intact.

## Enhanced User Experience
- Added visual feedback for successful ticket purchases.
- Disabled "Buy Ticket" button dynamically when tickets are sold out.

## Additional API Integrations
- Real-time data synchronization with JSON Server:
     - Inline edits update the db.json file via PATCH requests.
     - Ticket purchases are accurately reflected in the database.
- Added error handling for network issues or server unavailability.


## Folder Structure
```bash

flatdango/
├── index.html       # Main HTML file
├── index.css        # Styles for the app
├── index.js         # JavaScript functionality
├── db.json          # Data source for the JSON Server
├── README.md        # Project documentation
```

## License
This project is licensed under the MIT License.


