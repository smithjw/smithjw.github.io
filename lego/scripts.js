// const set = '7191-1';
// const set = 'MOC-7540';
const app = document.getElementById('root');
const logo = document.createElement('img');
const container = document.createElement('div');

let setValue = localStorage.getItem('set') ? localStorage.getItem('set') : '';
var key = '';

logo.src = 'lego.svg'
var type = 'sets';
var url = `https://rebrickable.com/api/v3/lego/${type}/${setValue}`;
var parts_url = "";

container.setAttribute('class', 'container');
logo.setAttribute('class', 'headerImage');

var options = document.createElement('div');
var clearStorage = document.createElement('button');
var apiKey = document.createElement('input');
var setID = document.createElement('input');
var loadSet = document.createElement('button');

options.setAttribute('class', 'buttons');
apiKey.setAttribute('class', 'field-light text');
apiKey.setAttribute('type', 'text');
apiKey.setAttribute('id','apiKey');
apiKey.setAttribute('placeholder','User API Key');
setID.setAttribute('class', 'field-light text');
setID.setAttribute('type', 'text');
setID.setAttribute('id', 'set');
setID.setAttribute('placeholder', 'LEGO Set ID');

clearStorage.innerHTML = "Clear Storage";
clearStorage.onclick = function () {
    localStorage.clear();
    window.location.reload();
};

loadSet.innerHTML = "Load";
loadSet.onclick = function () {
    set = document.getElementById('set').value;
    checkSetID();
};

apiKey.onclick = function () {
    apiKey.defaultValue = '';
};

setID.onclick = function () {
    setID.defaultValue = '';
};

app.appendChild(logo);
app.appendChild(options);
options.appendChild(clearStorage);
options.appendChild(apiKey);
options.appendChild(setID);
options.appendChild(loadSet);
app.appendChild(container);

function request(url) {
    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'key d72a0a731b4ae4b0baf67ad1cc2eb1c1',
            'Accept': 'application/json'
        })
    });
    return request;
};

function checkSetID() {
    fetch(request(url))
        .then(response => {
            if (response.ok) {
                parts_url = `${url}/parts/?page_size=100000`;
                window.addEventListener('load', partList(parts_url));
                return response;
            }
            else {
                type = 'mocs';
                url = `https://rebrickable.com/api/v3/lego/${type}/${setValue}`;
                console.log(url);
                fetch(request(url))
                    .then(response => {
                        return response.json();
                    })
                    .then(set => {
                        console.log(set);
                        logo.src = set.moc_img_url;
                        parts_url = `${url}/parts/?page_size=100000`;
                        window.addEventListener('load', partList(parts_url));
                    })
                    .catch(console.error);
                return response;
            }
        })
        .then(response => response.json())
        .then(set => {
            console.log(set);
            logo.src = set.set_img_url;
        })
        .catch(console.error);
}

function partList(url) {

    fetch(request(url))
        .then(response => response.json())
        .then(parts => {
            var object = parts.results;
            console.log(object)

            object.forEach(function (object) {
                var setPartID = set + '-' + object.id
                console.log(setPartID)

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

                console.log('Creating the Card now')
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