export const CompaniesApi = {
  show: (async () => {
    const response = await fetch(`/api/derp/`, {
      method: 'get',
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
