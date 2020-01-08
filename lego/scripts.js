const set = '7191-1';
// const set = 'MOC-7540';
const app = document.getElementById('root');

let legoSetID = localStorage.getItem('legoSetID') ? localStorage.getItem('legoSetID') : '';
let rebrickApiKey = localStorage.getItem('rebrickApiKey') ? localStorage.getItem('rebrickApiKey') : '';
let rebrickType = localStorage.getItem('rebrickType') ? localStorage.getItem('rebrickType') : '';

var logo = document.createElement('img');
var container = document.createElement('div');
var options = document.createElement('div');
var clearStorage = document.createElement('button');
var apiKey = document.createElement('input');
var setID = document.createElement('input');
var loadSet = document.createElement('button');

// var baseUrl = `https://rebrickable.com/api/v3/lego/${rebrickType}/${legoSetID}`;
var baseUrl = 'https://rebrickable.com/api/v3/lego/';
var partsUrl = '/parts/?page_size=100000';

container.setAttribute('class', 'container');
logo.setAttribute('id', 'setImage');
logo.setAttribute('class', 'headerImage');
options.setAttribute('class', 'buttons');
apiKey.setAttribute('class', 'field-light text');
apiKey.setAttribute('type', 'text');
apiKey.setAttribute('id', 'rebrickApiKey');
apiKey.setAttribute('placeholder', 'User API Key');
apiKey.value = rebrickApiKey;
setID.setAttribute('class', 'field-light text');
setID.setAttribute('type', 'text');
setID.setAttribute('id', 'legoSetID');
setID.setAttribute('placeholder', 'LEGO Set ID');
setID.setAttribute('placeholder', 'LEGO Set ID');
setID.value = legoSetID;

app.appendChild(logo);
app.appendChild(options);
options.appendChild(clearStorage);
options.appendChild(apiKey);
options.appendChild(setID);
options.appendChild(loadSet);
app.appendChild(container);

clearStorage.innerHTML = "Reset";
clearStorage.onclick = function () {
    setID.value = '';
    apiKey.value = '';
    localStorage.clear();
    // window.location.reload();
};

loadSet.innerHTML = "Load";
loadSet.onclick = function () {
    legoSetID = document.getElementById('legoSetID').value.toLowerCase();
    localStorage.setItem('legoSetID', legoSetID);

    rebrickApiKey = document.getElementById('rebrickApiKey').value;
    localStorage.setItem('rebrickApiKey', rebrickApiKey);

    rebrickType = checkSetIDType(legoSetID);

    setSetLogo();

    url = baseUrl + rebrickType + 's/' + legoSetID + partsUrl;

    partList(url);
};


function request(url) {
    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `key ${rebrickApiKey}`,
            'Accept': 'application/json'
        })
    });
    return request;
};

function checkSetIDType() {
    if (legoSetID.includes('moc')) {
        // localStorage.setItem('rebrickType', 'mocs');
        type = 'moc';
        return type;
    } else {
        // localStorage.setItem('rebrickType', 'sets');
        type = 'set';
        return type;
    }
}

function setSetLogo() {
    console.log('LEGO Set ID: ' + legoSetID)
    console.log('Rebrickable API Key: ' + rebrickApiKey)
    console.log('LEGO Set Type: ' + rebrickType)

    url = baseUrl + rebrickType + 's/' + legoSetID + '/';
    console.log('Rebrickable Set URL: ' + url)

    fetch(request(url))
        .then(response => response.json())
        .then(set => {
            console.log(set);
            document.getElementById('setImage').style.background = 'none';
            logo.src = set[rebrickType + '_img_url'];
        })
        .catch(console.error);
}

function partList(url) {
    console.log('Rebrickable Parts URL: ' + url) 

    fetch(request(url))
        .then(response => response.json())
        .then(parts => {
            var object = parts.results;
            console.log(object)

            console.log('Creating cards now')
            object.forEach(function (object) {
                var setPartID = set + '-' + object.id

                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const title = document.createElement('div');
                title.setAttribute('class', 'title');
                const name = document.createElement('h1');
                name.setAttribute('class', 'box');
                name.textContent = object.part.name;

                const body = document.createElement('div');
                body.setAttribute('class', 'body');

                const partImg = document.createElement('img');
                partImg.setAttribute('class', 'partImg');
                partImg.src = object.part.part_img_url;

                const info = document.createElement('span');
                info.innerText = `Colour: ${object.color.name}\r\nQuantity: `;

                let qtyState = localStorage.getItem(setPartID) ? localStorage.getItem(setPartID) : 0;
                var qty = document.createElement('span');
                qty.setAttribute('id', setPartID);
                qty.innerHTML = qtyState;
                var qtyTotal = document.createElement('span');
                qtyTotal.innerText = ` of ${object.quantity}`;

                var buttons = document.createElement('div');
                buttons.setAttribute('class', 'buttons')

                var buttonPlus = document.createElement('button');
                buttonPlus.innerHTML = "+";

                var buttonMinus = document.createElement('button');
                buttonMinus.innerHTML = "-";

                var buttonReset = document.createElement('button');
                buttonReset.innerHTML = "RESET";

                container.appendChild(card);
                card.appendChild(title);
                title.appendChild(name);
                card.appendChild(body);
                body.appendChild(partImg);
                body.appendChild(info);
                info.appendChild(qty);
                info.appendChild(qtyTotal);
                card.appendChild(buttons)
                buttons.appendChild(buttonPlus);
                buttons.appendChild(buttonMinus);
                buttons.appendChild(buttonReset);

                buttonPlus.onclick = function () {
                    qtyState++;
                    localStorage.setItem(setPartID, qtyState);
                    return qty.innerHTML = qtyState;
                };

                buttonMinus.onclick = function () {
                    qtyState--;
                    localStorage.setItem(setPartID, qtyState);
                    return qty.innerHTML = qtyState;
                };

                buttonReset.onclick = function () {
                    qtyState = 0;
                    localStorage.setItem(setPartID, qtyState);
                    return qty.innerHTML = qtyState;
                };

            });
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });

}

textFit(document.getElementsByClassName('box'), {
    multiLine: true
});