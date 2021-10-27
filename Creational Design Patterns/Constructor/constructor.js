// ES 5

/*function Server(name , ip) {
    this.name = name;
    this.ip = ip;
}

Server.prototype.getUrl = function () {
    return `https://${this.ip}:80`;
}*/

// ES 6

class Server {
    constructor(name, ip) {
        this.name = name;
        this.ip = ip
    }

    getUrl() {
        return `https://${this.ip}:80`;
    }
}

const aws = new Server('Something', '83.83.83.83');
console.log(aws.getUrl());