// function networkFetch(url) {
//     return `${url} - Server Answer`
// }
//
// const cache = new Set();
//
// const proxiedFetch = new Proxy(networkFetch, {
//     apply(target, thisArg, argArray) {
//         const url = argArray[0];
//         if (cache.has(url)) {
//             return `${url} - from cache`
//         }else{
//             cache.add(url);
//             return Reflect.apply(target, thisArg, argArray)
//         }
//     }
// });
//
// console.log(proxiedFetch('angular.io'));
// console.log(proxiedFetch('react.io'));
// console.log(proxiedFetch('angular.io'));

//-------------------------------------- ( Example 1 -> Object )-------------------------------

// const person = {
//     name: "David",
//     age: 25,
//     job: 'QA'
// }
//
// const op = new Proxy(person, {
//     get(target, prop){
//         console.log(`Getting prop ${prop}`)
//         if(!(prop in target)){
//             return prop
//                 .split('_')
//                 .map(p => target[p])
//                 .join(' ');
//         }
//         return target[prop];
//     },
//     set(target,prop,value){
//         if(prop in target){
//             target[prop] = value;
//         }else {
//             throw new Error(`No ${prop} field in target`);
//         }
//     },
//     has(target,prop){
//         return ['name','job'].includes(prop)
//     },
//     deleteProperty(target, prop) {
//         console.log("Deleting...", prop);
//         delete target[prop];
//     }
// })

// console.log(op.age = 226); // 226
// console.log(op) // { name: 'David', age: 226, job: 'QA' }
// //console.log(op.qqq = 2) // throw new Error(`No ${prop} field in target`);
//
// console.log('age2' in op) // false
// console.log('name' in op) // true
// console.log('age' in op) // false
//
// console.log(delete op.age); // Deleting... age / false
// console.log(op); // { name: 'David', job: 'QA' }
//
// console.log(op); // { name: 'David', age: 25, job: 'QA' }
// console.log(op.name_age_job) //David 25 QA


//-------------------------------------- ( Example 3 -> Function )-------------------------------

// const log = text => `Log: ${text};`
//
// const fp = new Proxy(log, {
//     apply(target, thisArg, argArray) {
//         console.log(('Calling fn...'));
//         return target.apply(thisArg, argArray).toLowerCase()
//     }
// })
//
// console.log(fp('ASDAD'))

//-------------------------------------- ( Example 3 -> Classes )-------------------------------

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }
//
// const PersonProxy = new Proxy(Person, {
//     construct(target, argArray, newTarget) {
//         console.log('Construct...');
//
//         return new Proxy(new target(...argArray), {
//             get(t, prop){
//                 console.log(`Getting prop ${prop}`)
//                 return t[prop]
//             }
//         })
//     }
// })
//
// const p = new PersonProxy('Mike',330);
// console.log(p); // Construct... / Person { name: 'Mike', age: 330 }
//
// console.log(p.name); // Getting prop name / Mike

//-------------------------------------- ( Example 4 -> Wrapper)-------------------------------

// const withDefaultValue = (target, defaultValue = 0) => {
//     return new Proxy(target, {
//         get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
//     })
// }
//
// const position = withDefaultValue({
//     x: 24,
//     y: 42
// }, 0)
//
// console.log(position.x) // 24
//
// console.log(position.z) // 0

//-------------------------------------- ( Example 5 -> Hidden properties )-------------------------------

// const withHiddenProps = (target, prefix = "_") => {
//     return new Proxy(target, {
//         has: (obj, prop) => (prop in obj) && (!prop.startsWith(prefix)),
//         ownKeys: obj => Reflect.ownKeys(obj).filter(p => !p.startsWith(prefix)),
//         get: (obj, prop, receiver) => (prop in receiver) ? obj[prop] : void 0
//     })
// }
// const data = withHiddenProps({
//     name: 'Armat',
//     age: 25,
//     _uid: '131215'
//
// })
//
//
// console.log(data); //{ name: 'Armat', age: 25, _uid: '131215' }
// console.log(data._uid) // undefined
// console.log(Object.keys(data)); // [ 'name', 'age' ]

//console.log(Reflect.ownKeys(position)) // ['x','y']


//-------------------------------------- ( Example 6 -> Optimization )-------------------------------

const IndexArray = new Proxy(Array, {
    construct(target, [args], newTarget) {
        const index = {};
        args.forEach(item => (index[item.id] = item))

        return new Proxy(new target(...args), {
            get(arr, prop) {
                switch (prop) {
                    case 'push':
                        return item => {
                            index[item.id] = item
                            arr[prop].call(arr, item);
                        }
                    case 'findById':
                        return id => index[id];
                    default:
                        return arr[prop]
                }
            }
        })
    }
})


const userData = new IndexArray([
    {id: 1, name: 'Arman', job: 'QA', age: 25},
    {id: 2, name: 'Arsen', job: 'Web Developer', age: 22},
    {id: 3, name: 'Hakob', job: 'PM', age: 34},
    {id: 4, name: 'Grish', job: 'CO', age: 65},
]);

//userData.push({id: 55, name: "Armen"});
console.log(userData)
console.log(userData.findById(1))
