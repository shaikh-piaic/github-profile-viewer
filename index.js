window.addEventListener("load", () => {
    let inputText = document.querySelector("#userNameInput");
    let submitBtn = document.querySelector("#submitBtn");
    var profileSection = document.querySelector(".profileSection");
    profileSection.style.display = "none";
    var inputSection = document.querySelector(".inputSection");
    let profileImage = document.querySelector(".profileImge");

    let userId = document.querySelector("#userId");
    let fullName = document.querySelector("#fullName");
    let detail = document.querySelector("#detail");
    let badge = document.querySelector(".badge");

    let repoEndPoint;

    let tableItems = document.querySelector(".tableItems");
    let details = document.querySelector("#details");
    submitBtn.addEventListener("click", () => {
        getInfo(inputText.value);
    });

    async function getInfo(username) {
        let endpoint = await fetch(`https://api.github.com/users/${username}`);
        let info = await endpoint.json();
        if (info.message != "Not Found") {
            // console.log(info)
            profileImage.src = info.avatar_url;
            userId.textContent = info.login;
            fullName.textContent = info.name;
            detail.textContent = info.bio;
            getRepoInfo(info.repos_url);
        } else {
            profileSection.style.display = "none";
            displaySuccess();
        }
    }
    async function getRepoInfo(repo) {
        fetch(repo).then((data) =>
            data.json().then((data) => {
                tableItems.innerHTML = "";
                console.log(data);
                var ii = 1;
                for (var i = 0; i < data.length; i++) {
                    tableItems.innerHTML +=
                        "<tr>" +
                        "<td>" +
                        ii +
                        "</td>" +
                        "<td>" +
                        data[i].name +
                        "</td>" +
                        "<td>" +
                        data[i].created_at +
                        "</td>" +
                        "<td>" +
                        data[i].language +
                        "</td>" +
                        '<td> <a target="_blank" href = "' +
                        data[i].html_url +
                        '">Click Here</a></td>' +
                        "</tr>";

                    ii++;
                }
            })
        );
        profileSection.style.display = "block";
        profileSection.scrollIntoView();
    }
});

function displaySuccess() {
    swal("Sorry", "Incorrect Username", "error");
}
