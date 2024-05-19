const postsContainer = document.querySelector("#posts-container");
const postForm = document.querySelector("#post-form");
const editPostBtn = document.querySelector('.edit-post');
const editModal = document.querySelector('.popup');

const addPost = (title, content, imgPath) => {
  db.collection("posts")
    .add({
      title: title,
      content: content,
      imgPath: imgPath,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Post added successfully!");
      fetchPosts();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Failed to add post.");
    });
};

const editPost = (postId, updatedTitle, updatedContent, updatedImgPath) => {
  db.collection("posts")
    .doc(postId)
    .update({
      title: updatedTitle,
      content: updatedContent,
      imgPath: updatedImgPath,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Document successfully updated!");
      alert("Post updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
      alert("Failed to update post.");
    });
};

const deletePost = (postId) => {
  if (confirm("Ban chac chan muon xoa")) {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        alert("Post deleted successfully!");
        fetchPosts()
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
        alert("Failed to delete post.");
      });
  }
};

const fetchPosts = () => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      renderPosts(posts);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

const renderPosts = (posts) => {
  const html = posts.map( (post) => {
    return `
      <div class="post">
        <h2>${post.title}</h2>
        <img src="${post.imgPath}" alt="${post.title}" />
        <p>${post.content}</p>
        <button class="edit-post">Edit</button>
        <button onclick="deletePost('${post.id}')">Delete</button>
      </div>
    `
  })
    .join("");
  postsContainer.innerHTML = html;
};


// Bật pupup để sửa post
// editPostBtn.forEach(editBtn => {
//   editBtn.addEventListener('click', function() {
    
//   })
// })

// Đóng pupup
const closePopup = () => {
  document.querySelector('.popup').classList.remove('show');
  overlay.classList.remove('show');
};

// Thêm post
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;
  const imgPath = document.querySelector("#post-image").value;
  addPost(title, content, imgPath);
  postForm.reset();
});

window.addEventListener("DOMContentLoaded", fetchPosts);
