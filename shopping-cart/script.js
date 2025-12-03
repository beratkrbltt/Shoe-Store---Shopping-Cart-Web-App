const openShopping = document.querySelector(".shopping"),
    closeShopping = document.querySelector(".closeShopping"),
    body = document.querySelector("body"),
    list = document.querySelector(".list"),
    listCard = document.querySelector(".listCard"),
    total = document.querySelector(".total"),
    quantity = document.querySelector(".quantity"),
    removeAll = document.querySelector(".remove-all")

openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
})

removeAll.addEventListener("click", () => {
    listCards = [];
    reloadCard();
})

let products = [
    {
        "id": 1,
        "name": "PRODUCT 1",
        "image": "1.png",
        "price": 2800
    },
    {
        "id": 2,
        "name": "PRODUCT 2",
        "image": "2.png",
        "price": 4200
    },
    {
        "id": 3,
        "name": "PRODUCT 3",
        "image": "3.png",
        "price": 3500
    },
    {
        "id": 4,
        "name": "PRODUCT 4",
        "image": "4.png",
        "price": 4130
    },
    {
        "id": 5,
        "name": "PRODUCT 5",
        "image": "5.png",
        "price": 2999
    },
    {
        "id": 6,
        "name": "PRODUCT ",
        "image": "6.png",
        "price": 3999,
    }
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src = "img/${value.image}">
        <div class = "title">${value.name}</div>
        <div class = "price">${value.price.toLocaleString()}</div>
        <button onclick = "addToCard(${key})">Add To Card </button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()

const addToCard = key => {
    if (!listCards[key]) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
        listCards[key].price = listCards[key].quantity * products[key].price;
    }
    reloadCard();
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value) {
            totalPrice += value.price;
            count += value.quantity;

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
               <div> <img src="img/${value.image}"> </div>
            <div class="cardTitle"> ${value.name} </div>
            <div class="cardPrice"> ${value.price.toLocaleString()} </div>
            <div> 
                <button style="background-color:#560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button style="background-color:#560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerHTML = totalPrice.toLocaleString();
    quantity.innerHTML = count;
}

const changeQuantity = (key, quantity) => {
    if (quantity <= 0) {
        listCards[key] = null;
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
