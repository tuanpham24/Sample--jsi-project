// DOM
const registerForm = document.querySelector("#register-form");
const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const dobInput = document.querySelector("#dob");
const passwordInput = document.querySelector("#password");
const passwordConfirmInput = document.querySelector("#password-confirm");


// Handle register
const handleRegiser = (e) => {
  e.preventDefault();

  // Get value input
  const fullname = fullnameInput.value;
  const email = emailInput.value;
  const dob = dobInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  // Validate form data
  if (!fullname || !email || !dob || !password || !passwordConfirm) {
    alert("Plesae fill all fields");
    return;
  }

  // Regex email js
  if (password !== passwordConfirm) {
    alert("Plesae fill all fields");
    return;
  }

  // code xử lý
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;

      alert("Signup successfully!");
      console.log(user);

      db.collection("users")
        .add({
          fullname,
          dob,
          email,
          password,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

      alert(errorMessage);
      // ..
    });
};

// Kiểm tra trạng thái đăng nhập
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // Người dùng chưa đăng nhập, tiếp tục xử lý đăng ký
    registerForm.addEventListener("submit", handleRegister);
  } else {
    // Nếu người dùng đã đăng nhập, chuyển hướng đến trang khác
    window.location.replace("index.html");
  }
});

