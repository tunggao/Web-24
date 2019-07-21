window.onload = () => {
    function pushData() {
        var player1 = document.getElementById('player1').value;
        var player2 = document.getElementById('player2').value;
        var player3 = document.getElementById('player3').value;
        var player4 = document.getElementById('player4').value;

        var myArray = '';
        myArray.push(player1);
        myArray.push(player2);
        myArray.push(player3);
        myArray.push(player4);

        var pVal = "";
        for (i = 0; i < myArray.length; i++) {
            pVal = pVal + myArray[i] + "<br/>";
        }
    }

    fetch(`/create-games`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:{
            playerName: myArray,
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if(data){
                window.location.href(`/games/${data.id}`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
app.listen(8080);