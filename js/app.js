var allData = [];

displyMovies = function (arr) {
  var movies = "";
  for (var i = 0; i < arr.length; i++) {
    movies += `
      <div class="col-md-4 p-2 mb-3 movieCard rounded p-0 ">
      <img
      class="rounded"
      src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}"
      alt=""
      />
      
      <div class="movieDetals px-3 rounded overflow-hidden">
        <h2>${arr[i].title || arr[i].name}</h2>
        <p>${arr[i].overview}</p>
      </div>
    </div>
  `;
  }
  document.getElementById("myData").innerHTML = movies;
};

var menu = document.getElementById("menu");
var icon = document.getElementById("collapse");

hundeOpen = function () {
  menu.style.width = "250px";
  menu.style.padding = "20px";
  icon.classList.replace("fa-align-justify", "fa-xmark");

  var one = document.getElementById("one");
  var two = document.getElementById("two");
  var three = document.getElementById("three");
  var four = document.getElementById("four");
  var five = document.getElementById("five");
  var six = document.getElementById("six");

  one.style.bottom = "82%";
  two.style.bottom = "67%";
  three.style.bottom = "52%";
  four.style.bottom = "37%";
  five.style.bottom = "22%";
  six.style.bottom = "7%";
};

hundeClose = function () {
  menu.style.width = "0";
  menu.style.padding = "0";
  icon.classList.replace("fa-xmark", "fa-align-justify");
  var one = document.getElementById("one");
  var two = document.getElementById("two");
  var three = document.getElementById("three");
  var four = document.getElementById("four");
  var five = document.getElementById("five");
  var six = document.getElementById("six");

  one.style.bottom = "-100%";
  two.style.bottom = "-100%";
  three.style.bottom = "-100%";
  four.style.bottom = "-100%";
  five.style.bottom = "-100%";
  six.style.bottom = "-100%";

  one.addEventListener("click", function () {
    fetchMovies("/movie/now_playing");
  });
  two.addEventListener("click", function () {
    fetchMovies("/movie/popular");
  });
  three.addEventListener("click", function () {
    fetchMovies("/movie/top_rated");
  });
  four.addEventListener("click", function () {
    fetchMovies("/trending/all/day");
  });
  five.addEventListener("click", function () {
    fetchMovies("/movie/upcoming");
  });
};

fetchWord = function (word) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${word}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`
  )
    .then((response) => response.json())
    .then((data) => {
      displyMovies(data.results);
      allData = data.results;
    });
};

handleSearchWord = function (e) {
  fetchWord(e.target.value);
};

document
  .getElementById("searchWord")
  .addEventListener("keyup", handleSearchWord);

fetchMovies = function (cateogory) {
  fetch(
    `https://api.themoviedb.org/3${cateogory}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  )
    .then((response) => response.json())
    .then((data) => {
      displyMovies(data.results);
      allData = data.results;
    });
  hundeClose();
};

fetchMovies("/movie/now_playing");

icon.addEventListener("click", function () {
  if (menu.style.width == "0px") {
    hundeOpen();
  } else {
    hundeClose();
  }
});

handleSearch = function (e) {
  var newData = allData.filter((movie) =>
    movie.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  displyMovies(newData);
};

document.getElementById("search").addEventListener("keyup", handleSearch);

var handleSubmit = function () {
  if (
    document.getElementById("name").value !== "" &&
    document.getElementById("email").value !== "" &&
    document.getElementById("phone").value !== "" &&
    document.getElementById("age").value !== "" &&
    document.getElementById("Password").value !== "" &&
    document.getElementById("confirm").value !== "" &&
    document.getElementById("Password").value ===
      document.getElementById("confirm").value
  ) {
    alert("Success");
  } else {
    alert(`invalid data ("All fields are required*")`);
  }
};

document.getElementById("submit").addEventListener("click", handleSubmit);
