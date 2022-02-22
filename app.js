function addHistory(elem) {
    $("tbody").prepend(`\
    <tr>\
      <td>${elem.date}</td>\
      <td>${elem.time}</td>\
      <td>${elem.accountID}</td>\
      <td>${elem.checkID}</td>\
      <td>${elem.key}</td>\
    </tr>\
    `);
}

async function registerBet() {
    const key = document.getElementById("key").value
    const accountID = document.getElementById("accountID").value
    const amount = 10
    try {
        const response = await fetch("https://credibank-webclient.herokuapp.com/getdigitalcheck", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ accountID: accountID, amount: amount })
        });
        response.text().then(async function (text) {
            const data = JSON.parse(text);
            console.log(data)
            if (data.status == "OK") {
                const response2 = await fetch("https://euromilregister-webclient.herokuapp.com/register", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ checkID: data.checkID, key: key })
                });
                response2.text().then(function (text) {
                    if (text.search("Success.") == 0) {
                        const datetime = new Date(Date.now())
                        const date = datetime.toLocaleDateString()
                        const time = datetime.toLocaleTimeString()
                        $("#resultStatus").text(data.message)
                        $("#resultAccount").text("Account ID: " + accountID)
                        $("#resultAmount").text("Amount: " + amount + "€")
                        $("#resultDate").text("Date: " + date)
                        $("#resultTime").text("Time: " + time)
                        $("#resultCheckID").text("Check ID: " + data.checkID)
                        $("#resultKey").text("Key: " + key)
                        $("#resultStatus").show()
                        $("#resultAccount").show()
                        $("#resultAmount").show()
                        $("#resultDate").show()
                        $("#resultTime").show()
                        $("#resultCheckID").show()
                        $("#resultKey").show()
                        const datenow = new Date(Date.now())
                        const objHistory = {
                            date: date,
                            time: time,
                            accountID: accountID,
                            checkID: data.checkID,
                            key: key
                        }
                        addHistory(objHistory)
                    } else {
                        $("#resultStatus").text(text)
                        $("#resultStatus").show()
                    }
                });
            } else {
                $("#resultStatus").text(data.message)
                $("#resultStatus").show()
            }
        });
    } catch (error) {
        $("#resultStatus").text("Transaction failed!")
        $("#resultStatus").show()
        console.log(error)
    }
}

$(document).ready(function () {
    document.getElementById('resultModal').addEventListener('hidden.bs.modal', function (event) {
        $("#resultStatus").hide()
        $("#resultAccount").hide()
        $("#resultAmount").hide()
        $("#resultDate").hide()
        $("#resultTime").hide()
        $("#resultCheckID").hide()
        $("#resultKey").hide()
    })
})
