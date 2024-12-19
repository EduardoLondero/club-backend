

export default class Sport {
    constructor(name, schedule, price) {
        this.name = name;
        this.schedule = schedule;
        this.price = price;
    }

    showInfoSport() {
        return `
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Schedule:</strong> ${this.schedule}</p>
            <p><strong>Price:</strong> ${this.price}</p>
        `;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }
    
    getSchedule() {
        return this.schedule;
    }

    setSchedule(newSchedule) {
        this.schedule = newSchedule;
    }

    getPrice() {
        return this.price;
    }

    setPrice(newPrice) {
        this.price = newPrice;
    }
}



