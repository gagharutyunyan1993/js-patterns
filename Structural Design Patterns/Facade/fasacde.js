class Complaints {
    constructor() {
        this.complaints = [];
    }

    reply(complaint) {
    }

    add(complaint) {
        this.complaints.push(complaint);
        return this.reply(complaint)
    }
}

class ProductComplaints extends Complaints {
    reply({id, customer, details}) {
        return `Product: ${id}: ${customer}  (${details})`
    }
}

class ServiceComplaints extends Complaints {
    reply({id, customer, details}) {
        return `Service: ${id}: ${customer}  (${details})`
    }
}

class ComplaintRegistry {
    register(customer, type, details) {
        const id = Date.now();
        let complaint;

        if (type === 'service') {
            complaint = new ServiceComplaints();
        } else {
            complaint = new ProductComplaints();
        }

        return complaint.add({id, customer, details});
    }
}

const registry = new ComplaintRegistry();

console.log(registry.register('Mike','service', "can't find"))
console.log(registry.register('Elena','product', "can't find product"))

//--------------------------- ( EXAMPLE 2 ) ---------------------------------

// var Mortgage = function (name) {
//     this.name = name;
// }
//
// Mortgage.prototype = {
//
//     applyFor: function (amount) {
//         // access multiple subsystems...
//         var result = "approved";
//         if (!new Bank().verify(this.name, amount)) {
//             result = "denied";
//         } else if (!new Credit().get(this.name)) {
//             result = "denied";
//         } else if (!new Background().check(this.name)) {
//             result = "denied";
//         }
//         return this.name + " has been " + result +
//             " for a " + amount + " mortgage";
//     }
// }
//
// var Bank = function () {
//     this.verify = function (name, amount) {
//         // complex logic ...
//         return true;
//     }
// }
//
// var Credit = function () {
//     this.get = function (name) {
//         // complex logic ...
//         return true;
//     }
// }
//
// var Background = function () {
//     this.check = function (name) {
//         // complex logic ...
//         return true;
//     }
// }
//
// function run() {
//     var mortgage = new Mortgage("Joan Templeton");
//     var result = mortgage.applyFor("$100,000");
//
//     console.log(result);
// }
//
// run();