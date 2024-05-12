// document.getElementById('logout-btn').addEventListener('click', function() {
//   firebase.auth().signOut().then(function() {
//     // Đăng xuất thành công
//     window.location.replace("login.html"); // Chuyển hướng đến trang đăng nhập sau khi logout
//   }).catch(function(error) {
//     // Xử lý lỗi nếu có
//     console.log(error);
//   });
// });

const logoutBtn = document.getElementById("logout-btn");

const handleLogout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Đăng xuất thành công
      window.location.replace("login.html"); // Chuyển hướng đến trang đăng nhập sau khi logout
    })
    .catch(function (error) {
      // Xử lý lỗi nếu có
      console.log(error);
    });
};

logoutBtn.addEventListener("click", function () {
  handleLogout();
});
