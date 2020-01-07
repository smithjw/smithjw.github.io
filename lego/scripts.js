const set = '7191-1';
// const set = 'MOC-7540';
const app = document.getElementById('root');
const logo = document.createElement('img');
var type = 'sets';

let url = `https://rebrickable.com/api/v3/lego/${type}/${set}`;
let parts_url = "";

fetch(request(url))
    .then(response => {

        if (response.ok) {
            parts_url = `${url}/parts/?page_size=100000`;
            window.addEventListener('load', partList(parts_url));
            return response;
        } else {
            type = 'mocs';
            url = `https://rebrickable.com/api/v3/lego/${type}/${set}`;
            console.log(url)
            fetch(request(url))
                .then(response => {
                    return response.json();
                })
                .then(set => {
                    console.log(set)
                    logo.src = set.moc_img_url
                    parts_url = `${url}/parts/?page_size=100000`;
                    window.addEventListener('load', partList(parts_url));
                })
                .catch(console.error)
            return response;
        }

    })
    .then(response => response.json())
    .then(set => {
        console.log(set)
        logo.src = set.set_img_url
    })
    .catch(console.error)

const container = document.createElement('div');
container.setAttribute('class', 'container');

var options = document.createElement('div');
options.setAttribute('class', 'buttons');
var clearStorage = document.createElement('button');
clearStorage.innerHTML = "Clear Storage";
clearStorage.onclick = function () {
    localStorage.clear();
    window.location.reload();
};

app.appendChild(logo);
app.appendChild(options);
options.appendChild(clearStorage);
app.appendChild(container);

function request(url) {
    var request = new Request(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'key 9979ce0e366a5c09a4e8dbb6fd1e28f6',
            'Accept': 'application/json'
        })
    });
    return request;
};

function partList(url) {

    fetch(request(url))
        .then(response => response.json())
        .then(parts => {
            var object = parts.results;
            console.log(object)

            object.forEach(function (object) {
                var partID = object.id
                console.log(partID)

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

                let qtyState = localStorage.getItem(partID) ? localStorage.getItem(partID) : 0;
                var qty = document.createElement('span');
                qty.setAttribute('id', partID);
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
                    localStorage.setItem(partID, qtyState);
                    return qty.innerHTML = qtyState;
                };

                buttonMinus.onclick = function () {
                    qtyState--;
                    localStorage.setItem(partID, qtyState);
                    return qty.innerHTML = qtyState;
                };

                buttonReset.onclick = function () {
                    qtyState = 0;
                    localStorage.setItem(partID, qtyState);
                    return qty.innerHTML = qtyState;
                };

            });
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });

}