let postsContainer = document.querySelector(".postsContainer");
let postsCount = document.querySelector("#postsCount");
let modalBody = document.querySelector(".modalBody");
let isLoadingText = document.querySelector("#isLoading");
let postCountText = document.querySelector(".postCountText");
let editFormDiv = document.querySelector(".editFormDiv");
//
postCountText.style.display = "none";
document.querySelector(".addPostBtn").style.display = "none";
//store data
let storeData = [];
let sizeOfPosts = 0;

// get data from api
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => {
    displayPosts(data);
    isLoadingText.style.display = "none";
    postCountText.style.display = "block";
    document.querySelector(".addPostBtn").style.display = "block";
  })
  .catch((error) => console.log(error));

//display all posts data
function displayAllPosts(storeData) {
  storeData.map((item) => {
    postsContainer.innerHTML += `
        <div class="post">
           <p> id: ${item.id} </p>
          <p> userId: ${item.userId} </p>
          <p> title: ${item.title.slice(0, 10) + "..."} </p>
          <p> description: ${item.body.slice(0, 25) + "..."} </p>
          <div class="editAndDeleteButton">
           <a href="#editFormData">
        <button class="editBtn" onclick="displayPostData(${
          item.id
        })">Edit</button>
        </a>
       <button class="deleteBtn" onclick="deletePost(${
         item.id
       })">Delete</button>
         </div>
          <button id="showMore" onclick="showDetails(${
            item.id
          })"> Show More </button>
        </div>
        `;
  });
}
//display posts

function displayPosts(posts) {
  sizeOfPosts = posts.length;
  storeData.push(...posts);
  postsCount.innerText = storeData.length;
  displayAllPosts(storeData);
}

document.querySelector(".modalBody").style.display = "none";

//show details

function showDetails(id) {
  document.querySelector(".modalBody").style.display = "block";
  // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //   .then((res) => res.json())
  //   .then((data) => displayDetails(data));
  let post = storeData.find((item) => item.id === id);
  displayDetails(post);
  postsContainer.innerHTML = "";
}

function displayDetails(post) {
  modalBody.innerHTML = `
        <div class="modal">
         <p> id: ${post.id} </p>
          <p> userId: ${post.userId} </p>
          <p> title: ${post.title} </p>
          <p> description: ${post.body} </p>
          <button onclick="closeModal()" id="closeModal">Close Modal</button>
          </div>   
 `;
}

//closeModal
function closeModal() {
  document.querySelector(".modalBody").style.display = "none";
  displayAllPosts(storeData);
}
//display data into form
editFormDiv.style.display = "none";
 function displayPostData(id) {
  document.querySelector(".addPostBtn").style.display="none" ;

  try {
    // let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    // let post = await res.json();
    let post = storeData.find((item) => item.id === id);
    editFormDiv.innerHTML = `
      <div class="editForm" id="editForm">
        <input type="text" name="userId" id="userId" value="${post.userId}"/>
        <input type="text" name="title" id="title"  value="${post.title}"/>
        <input type="text" name="body" id="body"  value="${post.body}"/>
        <button class="savePost" onclick="savePost(${post.id})"> Save post </button>
      </div>`;
    editFormDiv.style.display = "block";
    document.querySelector("#addPost").style.display="none" ;

  } catch (error) {
    console.error(error);
  }
}

//save post data
function savePost(id) {
  let userId = document.querySelector("#userId").value;
  let title = document.querySelector("#title").value;
  let body = document.querySelector("#body").value;
  //create new object
  let postObject = {
    id: id,
    userId: userId,
    title: title,
    body: body,
  };
  let filterData = storeData.filter((item) => item.id !== id);
  postsContainer.innerHTML = "";
  let newPosts = [postObject, ...filterData];
  storeData = newPosts;
  displayAllPosts(newPosts);
  editFormDiv.style.display = "none";
  alert("Post edited !!");
  document.querySelector(".addPostBtn").style.display="block" ;
}
//delete post

function deletePost(id) {
  let conform = window.confirm("Are you want to delete post ??");
  if (conform) {
    let posts = storeData.filter((item) => item.id !== id);
    // storeData = posts ;
    postsContainer.innerHTML = "";
    sizeOfPosts--;
    postsCount.innerText = sizeOfPosts;
    displayAllPosts(posts);
    alert("Your post is deleted !!");
  } else {
    alert("Your post is safe : )");
  }
}

//add form
let addPostDiv = document.querySelector(".addPostDiv");

function addPostForm() {
  addPostDiv.innerHTML = `
  <div class="editForm" id="addPost">
        <input type="text" name="userId" class="addUserId" id="userId" placeholder="Enter your userId"/>
        <input type="text" name="title"  class="addTitle" id="title"  placeholder="Enter your post title"/>
        <input type="text" name="body" class="addDescription"  id="body"  placeholder="Enter your post description"/>
        <button class="savePost addPost" onclick="addPost()"> Add post </button>
      </div>
  `;
  document.querySelector("#editForm").style.display="none" ;
}

/// add post

function addPost() {
  let addUserId = document.querySelector(".addUserId").value;
  let addTitle = document.querySelector(".addTitle").value;
  let addDescription = document.querySelector(".addDescription").value;
  if (addUserId === "" || addTitle === "" || addDescription === "") {
    return alert("Please fill up each input value !!");
  }
  sizeOfPosts++;
  postsCount.innerText = sizeOfPosts;

  //create object for insert element
  let postObject = {
    id: sizeOfPosts,
    userId: addUserId,
    title: addTitle,
    body: addDescription,
  };
  storeData.unshift(postObject);

  postsContainer.innerHTML = "";
  displayAllPosts(storeData);
  alert("Your new post added successfully !!");
  addPostDiv.innerHTML = "";
}
