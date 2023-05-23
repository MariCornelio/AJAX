// vamos hacer un clousure o vamos a empaquetar nuestro codigo porque vamos a poner varias funciones que puedan tener las mismas variables, era la forma antigua de escribir modulos en JS



// 1.XMLHTTPRequest

(() => {
  // 1. instanciar el objeto xmilhttprequest
  const xhr = new XMLHttpRequest(),

    $xhr = document.getElementById('xhr'),
    $fragment = document.createDocumentFragment();


  // 2.asignar el/los eventos que vamos manejar en la petición
  xhr.addEventListener('readystatechange', (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(xhr);
      // console.log('éxito');
      // console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);
      // console.log(json)
      json.forEach((el) => {
        const $li = document.createElement('li');
        $li.innerHTML = `
        ${el.name} -- ${el.email} -- ${el.phone}
        `;
        $fragment.appendChild($li);

      })
      $xhr.appendChild($fragment);
    } else {
      // console.log('error');
      let message = xhr.statusText || 'Ocurrió un error';
      $xhr.innerHTML = `Error ${xhr.status}:${message}`;
    }
    // console.log('Este mensaje cargará de cualquier forma');
  })

  // abrir la peticion, estableces el metodo que lo vamos hacer, pasar la URL o el endPoint
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users")
  // xhr.open("GET", "assets/user.json")

  // enviar la petición
  // solo estamos hacien el READ del CRUD el send va vacio
  xhr.send();
})();


// 2. API Fetch
(() => {
  const $fetch = document.getElementById('fetch'),
    $fragment = document.createDocumentFragment();

  fetch('https://jsonplaceholder.typicode.com/user')
    .then(res => {
      console.log(res);
      return res.ok ? res.json() : Promise.reject(res);;
    })
    .then((json) => {
      // console.log(json)
      json.forEach((el) => {
        const $li = document.createElement('li');
        $li.innerHTML = `
        ${el.name} -- ${el.email} -- ${el.phone}
        `;
        $fragment.appendChild($li);

      })
      $fetch.appendChild($fragment);
    })
    .catch(err => {
      console.log('Estamos en el catch', err)
      let message = err.statusText || 'Ocurrió un error';
      $fetch.innerHTML = `Error ${err.status}:${message}`;
    })
    .finally(() => {
      // console.log('Esto se ejecutará independientemente de la promesa fetch')
    })
})();

(() => {
  const $fetchAsync = document.getElementById('fetch-async'),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch('https://jsonplaceholder.typicode.com/users'),
        json = await res.json();
      // console.log(res, json);
      // noes personalizado
      // if (!res.ok) {
      //   throw new Error('Ocurrio un error al solicitar los datos')

      // }
      if (!res.ok) throw { status: res.status, statusText: res.statusText }

      json.forEach((el) => {
        const $li = document.createElement('li');
        $li.innerHTML = `
        ${el.name} -- ${el.email} -- ${el.phone}
        `;
        $fragment.appendChild($li);

      })
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      let message = err.statusText || 'Ocurrió un error';
      $fetchAsync.innerHTML = `Error ${err.status}:${message}`;
    } finally {
      // console.log('Esto se ejecuta independientemente del try catch')
    }
  }
  getData();

})();
(() => {
  const $axios = document.getElementById('axios'),
    $fragment = document.createDocumentFragment();

  axios.get('https://jsonplaceholder.typicode.com/user')
    .then(res => {
      console.log(res)
      let json = res.data
      json.forEach((el) => {
        const $li = document.createElement('li');
        $li.innerHTML = `
        ${el.name} -- ${el.email} -- ${el.phone}
        `;
        $fragment.appendChild($li);

      })
      $axios.appendChild($fragment);
    })
    .catch(err => {
      // console.log('Entro al catch', err.response)
      let message = err.response.statusText || 'Ocurrió un error';
      $axios.innerHTML = `Error ${err.response.status}:${message}`;
    })
    .finally(() => {
      console.log('Esto se ejecutará independientemente')
    });
})();