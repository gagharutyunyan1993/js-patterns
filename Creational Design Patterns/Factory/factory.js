class SimpleMemberShip {
    constructor(name) {
        this.name = name;
        this.cost = 50;
    }
}

class StandardMemberShip {
    constructor(name) {
        this.name = name;
        this.cost = 250;
    }
}

class PremiumMemberShip {
    constructor(name) {
        this.name = name;
        this.cost = 1250;
    }
}

class MemberFactory {
    static list = {
        simple: SimpleMemberShip,
        standard: StandardMemberShip,
        premium: PremiumMemberShip
    }

    create(name, type = 'simple') {
        const MemberShip = MemberFactory.list[type] || MemberFactory.list.simple;
        const member = new MemberShip(name);
        member.type = type;
        member.define = function () {
            console.log(`${this.name} (${this.type}): ${this.cost}`)
        }

        return member;
    }
}

const factory = new MemberFactory();

const members = [
    factory.create('Vladilen','simple'),
    factory.create('Elena', 'premium'),
]

members.forEach(m => {
    m.define();
})