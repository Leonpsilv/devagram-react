const regex = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
}

const nameValidate = (name: string) => {
    return name?.toString().length >= 2 ? false : true;
}
  
const emailValidate = (email: string) => {
  const emailStr = email?.toString();

  if(emailStr.length != 0 && !regex.email.test(emailStr)) return true
  
  return false
}

const passwordValidate = (password: string) => {
  const passwordStr = password?.toString()

  if(passwordStr.length != 0 && !regex.password.test(passwordStr)) return true
  
  return false
}

const confirmPasswordValidate = (password: string, confirm: string) => {
  if(confirm?.toString().length != 0 &&
    password?.toString().length != 0 &&
    password !== confirm) return true

  return false
}

export {
  nameValidate,
  emailValidate,
  passwordValidate,
  confirmPasswordValidate
}