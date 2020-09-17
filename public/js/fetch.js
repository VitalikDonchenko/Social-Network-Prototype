const addNewFriend = document.getElementsByClassName('addUser');
const friendsList = document.getElementsByClassName('friendsList');

if (addNewFriend) {
  [...addNewFriend].forEach((elem) => {
    elem.addEventListener('submit', async (event) => {
      event.preventDefault();
      const userId = event.target.name;
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: userId,
        }),
      });
      const result = await response.json();
      if (result) {
        event.target.childNodes[1].childNodes[1].remove();
      }
    });
  });
}

if (friendsList) {
  [...friendsList].forEach((elem) => {
    elem.addEventListener('submit', async (event) => {
      event.preventDefault();
      const { name } = event.target;
      const response = await fetch(`/cabinet/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.delete) {
        event.target.childNodes[1].childNodes[1].remove();
      }
    });
  });
}
