const car = {
    wheels: 4,
    init() {
        console.log(`I have ${this.wheels} wheels, my owner is ${this.owner}`);
    }
}

const carWithOwner = Object.create(car,{
    wheels: {
      value: 8
    },
    owner: {
        value: "Tom"
    }
})

console.log(carWithOwner.__proto__ === car); // true

carWithOwner.init(); // I have 8 wheels, my owner is Tom