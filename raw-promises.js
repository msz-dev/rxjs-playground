function doSomeStuff(time, index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${index} is done in ${time}ms`);
            resolve(`${index} is done in ${time}ms`);
        } , time)
    })
}

const times = [];
//---------------------------------------------------------------------------
// ex 1
// for (let i = 0; i < 5; i++) {
//     const time = Math.floor(Math.random() * (10000 - 100) ) + 100;
//     times.push(time);
// }

// Promise.all(times.map(doSomeStuff)).then(response => {
//     console.log(`This is my response: ${response}`);
// });

//---------------------------------------------------------------------------
// ex 2
const promises = [];
for (let index = 0; index < 5; index++) {
    const time = Math.floor(Math.random() * (10000 - 100) ) + 100;
    promises.push(doSomeStuff(time, index));
}


