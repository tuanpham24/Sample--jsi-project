const user = firebase.auth().currentUser;
const currentUser = document.querySelector('.current-user');

// Xử lý dropdown
const drdBtn = document.querySelector('.drd-btn');
const menu = document.querySelector('.menu');

drdBtn.addEventListener('click', function () {
  menu.classList.toggle("active");
})

// Lấy ra thông tin user để điền vào header
let currentEmail = JSON.parse(localStorage.getItem('current_user_data'));

if (currentEmail) {
  currentUser.innerHTML = currentEmail.displayName;
}