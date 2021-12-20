export const CompaniesApi = {
  show: (async () => {
    const response = await fetch(`/api/companies/derp/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const data = response.json();

    return data;
  })
}

export const UsersApi = {
  login: (email, password) => {
    (async () => {
      const response = await fetch(`/api/users/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = response.json();

      return data;
    })();
  },

  create: (email, password) => {
    (async () => {
      const response = await fetch(`/api/users/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = response.json();

      return data;
    })();
  }
}
