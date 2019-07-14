window.onload = () => {
    const button = document.getElementById("send");
    const text = document.getElementById("text");
    var resultfound;
    button.onclick = () => {
        var myDiv = document.getElementById("resultfind");
        while (myDiv.firstChild) {
            myDiv.removeChild(myDiv.firstChild);
        }
        console.log(text.value);
        fetch(`/getfind/${text.value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success) {
                    for (var i = 0; i < data.data.length; i++) {
                        var newDiv = document.createElement("Div");
                        newDiv.innerHTML = data.data[i].questionContent;
                        document.getElementById("resultfind").appendChild(newDiv);
                    }
                }
            })
            .catch((error) => {
                window.alert(error);
            });
    }
}