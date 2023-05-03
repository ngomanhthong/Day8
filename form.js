var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#password_2')
var form = document.querySelector('form')

function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.add('error')
    small.innerText = message
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerText = ''
}

function checkEmptyError(listInput) {
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()

        if (!input.value) {
            showError(input, 'Khong duoc de trong')
            isEmptyError = true;
        } else {
            showSuccess(input)
        }
    });

    return isEmptyError;
}

function checkEmail(input) {
  const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(input.value.trim())) {
      showSuccess(input)
  } else {
      showError(input, 'Email không hợp lệ')
  }
}

function checklengthError(input, min, max) {
    input.value = input.value.trim()

    if (input.value.length < min) {
        showError(input, `phai co it nhat ${min} ky tu`)
        return true
    }
    if (input.value.length > max) {
        showError(input, `Toi da ${max} ky tu`)
        return true
    }

    showSuccess(input)
    return false
}

function checkMatchPassword(passwordInput, confirmPassword) {
    if (passwordInput.value !== confirmPassword.value) {
        showError(confirmPassword, 'Mat khau khong trung khop')
        return true
    }
    return false
}

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let isEmptyError = checkEmptyError([username, email, password, confirmPassword])
    let isEmailError = checkEmail(email)
    let isUsernameLengthError = checklengthError(username, 5, 10)
    let isPasswordLengthError = checklengthError(password, 5, 10)
    let isMatchError = checkMatchPassword(password, confirmPassword)

    if (isEmptyError || isEmailError || isUsernameLengthError || isPasswordLengthError || isMatchError) {
        return false;
    } else {
        form.submit();
    }
})