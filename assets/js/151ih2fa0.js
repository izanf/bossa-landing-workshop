(() => {

  const BASE_API = 'https://landing-bossa.firebaseio.com/registrations.json'

  const API = axios.create({
    baseURL: BASE_API
  });

  const fetchData = () => {
    API
      .get(BASE_API)
      .then(response => renderData(response.data))
      .catch('error')
  }

  const renderData = (data) => {
    const table = document.querySelector('#items')
    let i = 1;

    for (var key in data) {
      var tr = document.createElement('tr');
      if (i % 2) tr.style.background = '#eee'
      var td = document.createElement('td');
      td.innerHTML = i;
      tr.appendChild(td);

      for (var campo in data[key]) {
        var td = document.createElement('td');
        td.innerHTML = data[key][campo];
        tr.appendChild(td);
      };
      table.appendChild(tr);
      i++
    };

  }

  fetchData()
})()