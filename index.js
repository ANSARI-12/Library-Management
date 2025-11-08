let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let messageEl = document.getElementById("message");
let headingEl = document.createElement("h1");

function appendAndSearchResult(search_results) {
    if (search_results.length < 1) {
        messageEl.textContent = "No result found";
        searchResultsEl.textContent = "";
        headingEl.textContent = "";
    } else {
        searchResultsEl.textContent = "";
        messageEl.textContent = "";
        headingEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headingEl);
        for (let eachItem of search_results) {
            let title = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;
            let imgEl = document.createElement("img");
            let textEl = document.createElement("p");
            imgEl.setAttribute("src", image);
            textEl.textContent = author;
            searchResultsEl.appendChild(imgEl);
            searchResultsEl.appendChild(textEl);
            console.log(eachItem);
        }

    }
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");

        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                appendAndSearchResult(search_results);
                spinnerEl.classList.toggle("d-none");
            });
    }
})
