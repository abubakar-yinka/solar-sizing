export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const pass = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d]).{8,35}$/;
  return pass.test(password);
};

export const validatePhone = (phone: string): boolean => {
  if (typeof phone === "string" && phone.length === 11) {
    return true;
  } else {
    return false;
  }
};

export const validateUsername = (usernames: string[], userName: string): boolean => {
  if (usernames.indexOf(userName) === -1) {
    return true;
  } else {
    return false;
  }
};

export const validateBVN = (bvn: string): boolean => {
  const validate = /^[0-9]*$/;
  if (typeof bvn === "string" && validate.test(bvn) && bvn.length === 11) {
    return true;
  } else {
    return false;
  }
};
export const validateFundAmount = (amount: number): boolean => {
  if (amount && Number(amount / 100) > 199) {
    return true;
  } else {
    return false;
  }
};

export const validatePasscode = (code: string): boolean => {
  if (code && code.length === 4) {
    return true;
  } else {
    return false;
  }
};
