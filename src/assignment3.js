function fetchData() {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve({
                name: 'David',
                gender: 'male',
                age: 22
            })
        } else {
            reject(new Error('Data not found'))
        }
    });
}
fetchData()
 .then((data) =>{
console.log(data.name + " is a " +data.age+ " years old " +data.gender)
 })

 .catch((error)=>{
    console.log(error.message)
 })
 .finally(() =>{
    console.log('fetchData is done!')
 }
)