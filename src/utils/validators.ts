const nameValidate = (name: string) => {
    return name?.toString().length > 2;
  }
  
  const emailValidate = (email: string) => {
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
  }
  
  const passwordValidate = (password: string) => {
    return password?.toString().length >= 6;
  }
  
  const confirmPasswordValidate = (password: string, confirm: string) => {
    return passwordValidate(password) && password === confirm;
  }
  
  export {
    nameValidate,
    emailValidate,
    passwordValidate,
    confirmPasswordValidate
  }