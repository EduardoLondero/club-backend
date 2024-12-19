import Sportentity from '../../models/sport.entity.js';

// Array para almacenar los deportes
const sportsCollection = [];

document.getElementById("createSport").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("sportName").value;
    const schedule = document.getElementById("sportSchedule").value;
    const price = document.getElementById("sportPrice").value;

    const deporte = new Sportentity(name, schedule, price);

    // Agregar el nuevo deporte a la colección
    sportsCollection.push(deporte);

    // Mostrar la colección actualizada de deportes
    displaySportsCollection();
});

function displaySportsCollection() {
    const infoDiv = document.getElementById("registeredInfo");
    infoDiv.innerHTML = "";

    sportsCollection.forEach((sport, index,) => {
        const sportInfo = document.createElement("div");
        const editSport = document.createElement ("button")
        editSport.innerHTML = "Editar Deporte";
        editSport.id=`editSport ${index+1}`;
        
        const deleteSport = document.createElement ("button")
        deleteSport.innerHTML = "Eliminar Deporte";
        deleteSport.id=`editSport ${index+1}`;

        editSport.addEventListener("click", function() {
            const currentSchedule = sport.getSchedule();
            const currentPrice = sport.getPrice();
            const currentName = sport.getName();
           
            const newName = prompt(`Ingrese el nuevo nombre (actual: ${currentName}):`, currentName);
            const newSchedule = prompt(`Ingrese el nuevo horario (actual: ${currentSchedule}):`, currentSchedule);
            const newPrice = prompt(`Ingrese el nuevo precio (actual: ${currentPrice}):`, currentPrice);

            if (newName !== null && newName.trim() !== "" && newSchedule !== null && newSchedule.trim() !== "" && newPrice !== null && !isNaN(newPrice) && newPrice.trim() !== "") {
                
                sport.setName(newName);
                sport.setSchedule(newSchedule);
                sport.setPrice(parseFloat(newPrice));
                displaySportsCollection();
            }
        });
        
        deleteSport.addEventListener("click", function() {
            const confirmation = confirm(`¿Estás seguro de que quieres eliminar el deporte ${sport.getName()}?`);
            if (confirmation) {
                sportsCollection.splice(index, 1);
                displaySportsCollection();
            }
        });

        sportInfo.innerHTML = `<h3>Deporte ${index + 1}</h3>${sport.showInfoSport()}`;
        sportInfo.appendChild(editSport);
        infoDiv.appendChild(sportInfo);
        sportInfo.appendChild(deleteSport);
    });
}


