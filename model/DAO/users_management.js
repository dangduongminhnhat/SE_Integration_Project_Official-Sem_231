// var database = require("./connect_db");

// // API for other models to contact to users in DB //

// function searchByEmail(email) {
//     for (let d of database.users) {
//         if (email === d.email) {
//             return true;
//         }
//     }
//     return false;
// }
// function searchByEmailAndPassword(email, password) {
//     for (let d of database.users) {
//         if (email === d.email && password === d.password) {
//             return true;
//         }
//     }
//     return false;
// }
// function searchByUserID(userID) {
//     for (let d of database.users) {
//         if (userID === d.userID) {
//             return true;
//         }
//     }
//     return false;
// }
// function getDataByEmail(email) {
//     for (let d of database.users) {
//         if (email === d.email) {
//             return d;
//         }
//     }
//     return null;
// }
// function getDataByUserID(userID) {
//     for (let d of database.users) {
//         if (userID === d.userID) {
//             return d;
//         }
//     }
//     return null;
// }
// function addUser(name, email, password) {
//     database.users.push({
//         userID: 3,
//         email: email,
//         password: password,
//         name: name,
//         role: "student"
//     });
// }

// module.exports = {
//     searchByEmail,
//     searchByEmailAndPassword,
//     searchByUserID,
//     getDataByEmail,
//     getDataByUserID,
//     addUser
// }