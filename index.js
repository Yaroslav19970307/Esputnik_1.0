let text =
{
    "params": [
    {
        "name": "email",
        "value": "zharkoyaroslav@gmail.com"
    },
    {
        "name": "date",
        "value": "2020-11-20T10:11:00"
    },
    {
        "name": "items",
        "value": "[{\"externalItemId\":\"200600\",\"name\":\"Super Device\",\"category\":\"devices\",\"quantity\":1,\"cost\":990,\"url\":\"http://example.com/item/200600\",\"imageUrl\":\"http://example.com/item/200600/image.png\",\"description\":\"High quality\"}]"
    }
]
};

let jsonSet = document.getElementById('set');
let jsonGet = document.getElementById('get');
let buttonPro = document.getElementById('pro');
let buttonCopy = document.getElementById('copy');

jsonSet.placeholder = JSON.stringify(text, true, ' ');

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function handler() {
    let obj = JSON.parse(jsonSet.value);
    let obj1 = obj.params;
    let name, value;
    let resultJSON = new Object();

    obj1.forEach(item => {
        for (let key in item) {
            if (key == "name") {
                name = item[key];
            }
            if (key == "value") {
                value = item[key];
            }
        }
        if (IsJsonString(value) === true) {
            value = JSON.parse(value);
        };
        resultJSON[name] = value;
    });
    console.log(resultJSON);
    jsonGet.value = JSON.stringify(resultJSON, true, ' ');
};


function Copy() {
    let text = jsonGet.value;
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('done');
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
};

buttonPro.addEventListener("click", handler);
buttonCopy.addEventListener("click", Copy);
