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
    let user = userCredential.user;

    // Lưu thông tin user vào Localtorage
    let userSaveLS = {
      displayName: user.displayName,
      email: user.email,
    }
    localStorage.setItem('current_user_data', JSON.stringify(userSaveLS))
    alert('Login successfully!');
  })
  .catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorMessage);
  });
}

loginForm.addEventListener("submit", handleLogin);

// Kiểm tra trạng thái đăng nhập
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // Người dùng chưa đăng nhập, tiếp tục xử lý đăng nhập
    loginForm.addEventListener("submit", handleLogin);
  } else {
    // Nếu người dùng đã đăng nhập, chuyển hướng đến trang home
    window.location.replace("index.html");
  }
});