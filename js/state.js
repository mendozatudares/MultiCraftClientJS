var clientState = {
  username: "",
  uuid: "",
  server: "",
  port: "",
  move: false,
};

function getUUID(username) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  let headers = new Headers();
  
  headers.append('Accept', 'application/json');
  headers.append('Origin', window.location.origin);

  fetch(`${proxy}https://api.mojang.com/users/profiles/minecraft/${username}`, {
    method: 'GET',
    headers: headers
  })
  .then(response => response.json())
  .then(json => {
    let i = json.id;
    console.log(i.substr(0,8)+"-"+i.substr(8,4)+"-"+i.substr(12,4)+"-"+i.substr(16,4)+"-"+i.substr(20));
  })
  .catch(error => console.error(error));
}