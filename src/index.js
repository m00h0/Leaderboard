import './style.css';

const form = document.getElementById('form');
const list = document.getElementById('ListOfScores');
let allScores = '';

const getReq = async () => {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdw/scores/')
    .then((scores) => scores.json())
    .then((scores1) => {
      allScores = scores1.result;
      let lists = '';
      allScores.forEach((element) => {
        lists += `<li>Player Name : ${element.user} <span> ${element.score}</span></li>`;
      });
      list.innerHTML = lists;
    });
};

const click = document.getElementById('click');
click.addEventListener('click', () => {
  getReq();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const Fdata = new FormData(form);
  const data1 = Object.fromEntries(Fdata);

  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdw/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data1),
  }).then((response) => response.json());
  document.getElementById('form').reset();
});