let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const API_PLANETA = "https://rickandmortyapi.com/api/location/1";

const GET_DATOS = (url_api) => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url_api, true);
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          // console.log('El responsetext es: ' + xhttp.responseText);
          // paso la cadena de texto a un objeto tipo JSON con JSON.parse
          let resultado = JSON.parse(xhttp.responseText);
          resolve(resultado);
        } else {
          let error = new Error("Error " + url_api);
          reject(error);
        }
      }
    };
    xhttp.send();
  });
};

// TIPO CALLBACK HELL, pero traigo los datos como hizo Toni
GET_DATOS(API)
  .then((data1) => {
    console.log(data1.info.count);
    GET_DATOS(API + data1.results[0].id)
      .then((data2) => {
        console.log(data2.name);
        GET_DATOS(data2.origin.url)
          .then((data3) => {
            console.log(data3.dimension);
          })
          .catch((err3) => console.error(err3));
      })
      .catch((err2) => console.error(err2));
  })
  .catch((err) => console.error(err));

// Si hago promise all con dos direcciones diferentes traigo los datos como Toni
Promise.all([GET_DATOS(API), GET_DATOS(API_PLANETA)])
//te devuelve el response en un array porque he hecho el promise.all
  .then((response) =>
    console.log("Array de resultados", [
      response[0].info.count,
      response[0].results[0].name,
      response[1].dimension
    ])
  )
  .catch((err) => console.error(err));

// ESTA CREO QUE ES LA MAS LIMPIA, pero no se como llamar a la página "https://rickandmortyapi.com/api/location/1"
GET_DATOS(API)
.then((response) => {
  console.log("Resultados", [
    response.info.count,
    response.results[0].name,
    response.results[0].origin.name
  ])
})
.catch((err) => console.error(err));
