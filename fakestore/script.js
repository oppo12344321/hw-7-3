const cart_wrap = document.querySelector('.cart_wrap')

const cart_ids = []
localStorage.setItem('cart_ids', JSON.stringify(cart_ids))

function deleteProduct(id) {
    fetch('https://fakestoreapi.com/products/' + id, {
        method: "DELETE"
    })
    .then(res => console.log(res))
}

// const limitInpVal = document.querySelector('.limit').value

function addCart(event) {
    const id = event.target.parentElement.getAttribute('data-id')
    const cart_ids_text = localStorage.getItem('cart_ids')
    consycart_ids = JSON.parse(cart_ids_text)
    cart_ids.push(id)
    console.log(cart_ids);
}

fetch('https://fakestoreapi.com/products').then((response) => {
    return response.json()
}).then((data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        document.querySelector('.all_products').innerHTML += `
    <div class="all_products_item" data-id="${data[i].id}">
        <img src="${data[i].image}">
        <h2>Name:${data[i].title}</h2>
        <h2>Price:${data[i].price}</h2>
        <button class="addCart" onclick="addCart(event)">Добавить в корзину</button>
        <button class="deleteBtn" style="border-color:red;color:red;margin-top:10px">Удалить</button>
    </div>
    `
    }
    const deleteBtns = document.querySelectorAll('.deleteBtn')

    for (let i = 0; i < deleteBtns.length; i++) {
        const id = deleteBtns[i].parentElement.getAttribute('data-id')

        deleteBtns[i].addEventListener('click', () => {

            deleteBtns[i].parentElement.remove()
            deleteProduct(id)
        })
    }

})

function sort(target) {
    fetch(`https://fakestoreapi.com/products?sort=${target.value}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('.all_products').innerHTML = ''
            for (let i = 0; i < data.length; i++) {
                document.querySelector('.all_products').innerHTML += `
            <div class="all_products_item" data-id="${data[i].id}">
                <img src="${data[i].image}">
                <h2>Name:${data[i].title}</h2>
                <h2>Price:${data[i].price}</h2>
                <button class="addCart">Добавить в корзину</button>
                <button class="deleteBtn" style="border-color:red;color:red;margin-top:10px">Удалить</button>
            </div>
            `
            }
        })
}

document.querySelector('select').addEventListener('change', (event) => {
    sort(event.target)
})

function openCart() {
    cart_wrap.style.display = 'block'
    const cart_ids = JSON.parse

}

document.getElementById('cart').addEventListener('click', openCart)

document.querySelector('#close').addEventListener('click', () => {
    cart_wrap.style.display = 'none'
})

document.querySelector('.limit').oninput = (event)=>{
    fetch(`https://fakestoreapi.com/products?limit=${event.target.value}`)
    .then(res => res.json())    
    .then(data => {
        document.querySelector('.all_products').innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            document.querySelector('.all_products').innerHTML += `
        <div class="all_products_item" data-id="${data[i].id}">
            <img src="${data[i].image}">
            <h2>Name:${data[i].title}</h2>
            <h2>Price:${data[i].price}</h2>
            <button>Добавить в корзину</button>
            <button class="deleteBtn" style="border-color:red;color:red;margin-top:10px">Удалить</button>
        </div>
        `
        }
})
}
