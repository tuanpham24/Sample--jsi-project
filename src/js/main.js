const postsContainer = document.querySelector("#posts-container");
const postForm = document.querySelector("#post-form");
const editPostBtn = document.querySelector('.edit-post');
const editModal = document.querySelector('.popup');
const editForm = document.querySelector("#edit-form");

// Hàm thêm post
const addPost = (title, content, imgPath) => {
  let current_user_data = JSON.parse(localStorage.getItem('current_user_data'))
  db.collection("posts")
    .add(
      {
        author: current_user_data.displayName,
        title: title,
        content: content,
        imgPath: imgPath,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
    )
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

// Hàm xóa post
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

// Hàm lấy danh sách post từ Firebase về
const fetchPosts = () => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });

      // Gọi hàm để render
      renderPosts(posts);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

// Render dữ liệu
const renderPosts = (posts) => {
  const html = posts.map( (post) => {
    return `
      <div class="post">
        <h2>Tác giả: ${post.author}</h2>
        <h2>${post.title}</h2>
        <img src="${post.imgPath}" alt="${post.title}" />
        <p>${post.content}</p>
        <button class="edit-post bg-[orange]" onclick="openEditForm('${post.id}', '${post.title}', '${post.content}', '${post.imgPath}')">Edit</button>
        <button class="bg-[red]" onclick="deletePost('${post.id}')">Delete</button>
      </div>
    `
  })
    .join("");
  postsContainer.innerHTML = html;
};


// Function to open the edit form
const openEditForm = (id, title, content, imgPath) => {
  currentPostId = id;
  document.querySelector("#edit-title").value = title;
  document.querySelector("#edit-content").value = content;
  document.querySelector("#edit-image").value = imgPath 
  document.querySelector('.popup').classList.add('show');
  document.querySelector('.overlay').classList.add('show');
};

// Function to close the edit form
const closePopup = () => {
  document.querySelector('.popup').classList.remove('show');
  document.querySelector('.overlay').classList.remove('show');
};

// Function to update a post
const updatePost = async (id, title, content, imgPath) => {
  const updatedData = {
    title: title,
    content: content,
    imgPath: imgPath,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  console.log(updatedData);

  db.collection("posts")
    .doc(id)
    .update(updatedData)
    .then(() => {
      console.log("Document successfully updated!");
      alert("Post updated successfully!");
      fetchPosts();
      closePopup();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
      alert("Failed to update post.");
    });
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

// Event listener to handle form submission for editing a post
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#edit-title").value;
  const content = document.querySelector("#edit-content").value;
  const imgPath = document.querySelector("#edit-image").value;

  updatePost(currentPostId, title, content, imgPath);
});


// Lắng nghe sự kiện: Nếu DOM của tất cả file đã được load 
window.addEventListener("DOMContentLoaded", fetchPosts);
