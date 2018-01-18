(() => {
  const PROJECT_URL = 'https://landing-bossa.firebaseio.com/registrations.json'

  const btnSend = document.querySelector('#send')

  btnSend.addEventListener('click', (e) => {
    e.preventDefault()

    const data = {
      name: document.querySelector('#name').value,
      email: document.querySelector('#email').value,
      profession: document.querySelector('#profession').value,
      crm: document.querySelector('#crm').value,
      institution: document.querySelector('#institution').value
    }

    sendForm(data)
  })

  const sendForm = (data) => {
    const alert = document.querySelector('p.msg')

    axios.post(PROJECT_URL, data)
      .then(function (response) {
        alert.textContent = 'Sucesso!'
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})()