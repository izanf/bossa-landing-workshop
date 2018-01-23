(() => {
  const BASE_API = 'https://workshop-hepatologia.firebaseio.com/registrations.json'
  
  const API = axios.create({
    baseURL: BASE_API
  });

  const btnSend = document.querySelector('#send')
  const inputName = document.querySelector('#name')
  const inputEmail = document.querySelector('#email')
  const inputProfession = document.querySelector('#profession')
  const inputCRM = document.querySelector('#crm')
  const inputInstitution = document.querySelector('#institution')

  btnSend.addEventListener('click', e => {
    e.preventDefault()

    const data = {
      name: inputName.value,
      email: inputEmail.value,
      profession: inputProfession.value,
      crm: inputCRM.value,
      institution: inputInstitution.value
    }

    validateForm(data)
  })

  const validateForm = (data) => {
    let error = false;

    if (data.name.length > 10) inputStatus(inputName, false)
    else {
      inputStatus(inputName, true)
      defineStatus('Erro no nome, verifique se possui mais de 10 caracteres.', 'error')
      error = true
    }

    if (data.email.match('@')) inputStatus(inputEmail, false)
    else {
      inputStatus(inputEmail, true)
      defineStatus('Erro no email, verifique se esta preenchido corretamente.', 'error')
      error = true
    }

    if (data.profession.length > 5) inputStatus(inputProfession, false)
    else {
      inputStatus(inputProfession, true)
      defineStatus('Erro na profissão, verifique se ela foi preenchida corretamente.', 'error')
      error = true
    }

    if (data.institution.length > 2) inputStatus(inputInstitution, false)
    else {
      inputStatus(inputInstitution, true)
      defineStatus('Erro na instituição, verifique se ela foi preenchida corretamente.', 'error')
      error = true
    }

    !error && sendForm(data)
  }

  const inputStatus = (input, error) => {
    if (error) {
      input.classList.add('error')
      input.classList.contains('success') && input.classList.remove('success')
    } else {
      input.classList.add('success')
      input.classList.contains('error') && input.classList.remove('error')
    }
  }

  const defineStatus = (msg, status) => {
    const alert = document.querySelector('p.msg')
    console.log(status)

    switch (status) {
      case 'success':
      case 'error': 
        alert.innerHTML += `<span>${msg}</span>`
        alert.classList.add(status)
        setTimeout(() => {
          alert.classList.remove(status)
          alert.textContent = ''
        }, 10000)
        break;
      default: 
        alert.textContent = 'Erro desconhecido'
        alert.classList.add('error')
        break;
    }
  }

  activeInputs = (error) => {
    if (!error) {
      inputName.value = ''
      inputEmail.value = ''
      inputProfession.value = ''
      inputCRM.value = ''
      inputInstitution.value = ''
      inputName.classList.remove('success')
      inputEmail.classList.remove('success')
      inputProfession.classList.remove('success')
      inputCRM.classList.remove('success')
      inputInstitution.classList.remove('success')
    }
    btnSend.disabled = false
    inputName.disabled = false
    inputEmail.disabled = false
    inputProfession.disabled = false
    inputCRM.disabled = false
    inputInstitution.disabled = false
  }

  const sendForm = (data) => {
    btnSend.disabled = true
    inputName.disabled = true
    inputEmail.disabled = true
    inputProfession.disabled = true
    inputCRM.disabled = true
    inputInstitution.disabled = true

    return API
      .post(BASE_API, data)
      .then(response => {
        console.log(response)
        defineStatus('Registro efetuado com sucesso', 'success')
        activeInputs(false)
      })
      .catch(response => {
        console.log(response)
        defineStatus('Erro ao registrar', 'error')
        activeInputs(true)
      })
  }
})()