// DOM
const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// Handle login
const handleLogin = (e) => {
  e.preventDefault();

  // Get value input
  const email = emailInput.value;
  const password = passwordInput.value;


  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

    console.log(user);
    // Lưu thông tin user vào Localtorage

    localStorage.setItem('current_user_data', JSON.stringify(user.email))

    alert('Login successfully!');


    // window.location.pathname = '/index.html'
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorMessage);
  });
}


// Kiểm tra trạng thái đăng nhập
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Nếu người dùng đã đăng nhập, chuyển hướng đến trang khác
    window.location.replace("index.html");
  } else {
    // Người dùng chưa đăng nhập, tiếp tục xử lý đăng nhập
    loginForm.addEventListener("submit", handleLogin);
  }
});