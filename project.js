const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")

//?ES5
// Starting UI Object
// const ui = new UI();

// Produce Storage Object
// const storage = new Storage();

//! Loading All Events
eventListeners();

function eventListeners(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //! Err
        UI.displayMessages("Fill in all the fields...", "danger")
    }
    else{
        //! New film
        const newFilm = new Film(title, director, url);

        
        UI.addFilmToUI(newFilm); //! Adding new film to interface
        Storage.addFilmToStorage(newFilm); //!Adding film to Storage
        UI.displayMessages("Film successfully added...", "success")
    }

    UI.clearInputs(titleElement, urlElement, directorElement);
    
    e.preventDefault();
}

function deleteFilm(e){
    if (e.target.id === "delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        UI.displayMessages("Deletion successful...", "success");
    }
}

function clearAllFilms (){
    if(confirm("Are you sure?")){
        UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
    }
    
}