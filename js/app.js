const add_product_form = document.getElementById('add_product_form');
const product_item = document.getElementById('product_item');
const product_edit_form = document.getElementById('product_edit_form');
const msg = document.querySelector('.msg');
const product_view_content = document.querySelector('.product_view_content');


/**
 * Data Show
 */
const allDataShow = () => {
    let data = readLSData('product');
    let list = '';
    let total_amount = 0;

    
    if( !data || data.length == 0 ){
        list += `
            <tr>
                <td colspan="7" class="text-center"><img src="images/no-product.png" class="img-fluid"></td>
            </tr>
        `;
    }

    if( data && data.length > 0 ){
        data.map((item, index) => {
            total_amount += (item.price * item.quantity);
            list += `
            <tr>
                <td>${ index + 1 }</td>
                <td><img src="${ item.photo }" alt="product-photo" class="shadow img-style"></td>
                <td>${ item.name }</td>
                <td>${ item.price }</td>
                <td>${ item.quantity }</td>
                <td>${ item.price * item.quantity }</td>
                <td>
                    <a class="btn view-btn btn-sm" product_index="${ index }" data-bs-toggle="modal" href="#view_modal"><i
                            class="fa-solid fa-eye"></i></a>
                    <a class="btn edit-btn btn-sm" product_index="${ index }" data-bs-toggle="modal" href="#edit_modal"><i
                            class="fa-solid fa-pen-to-square"></i></a>
                    <a class="btn delete-btn btn-sm" product_index="${ index }" href="#"><i
                            class="fa-solid fa-trash-can"></i></a>
                </td>
            </tr>
        
        `;
        })
        list += `
            <tr>
                <td colspan="6" class="text-end">Total Amount is: <strong> ${ total_amount } Taka</strong></td>
                <td></td>
            </tr>
        `;

    }

    product_item.innerHTML = list;
}

allDataShow();

/**
 * Add Product & Data Send To Localstorage
 */
add_product_form.onsubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let { name, price, quantity, photo } = Object.fromEntries(form_data.entries());

    if( !name || !price || !quantity || !photo ){
        msg.innerHTML = setAlert('All fields are required!');
    }else{


        createLSData('product', productData);

        msg.innerHTML = setAlert('Data Stable', 'success');
        add_product_form.reset();
        allDataShow();
    }
}

/**
 * Product View, Edit & Delete
 */
product_item.onclick = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('view-btn')){
        let index = e.target.getAttribute('product_index');

        let data = readLSData('product');

        let { name, price, photo } = data[index];

        product_view_content.innerHTML = `
            <img src="${ photo }" alt="" class="img-fluid shadow mb-3">
            <h2>${ name }</h2>
            <p><b>Price:</b> ${ price } Taka</p>
        `;
    }
    if(e.target.classList.contains('edit-btn')){
        let index = e.target.getAttribute('product_index');

        let data = readLSData('product');
        let { name, price, quantity, photo } = data[index];
         
        product_edit_form.innerHTML = `
            <div class="my-3">
            <label for="">Product Name</label>
            <input type="text" class="form-control" value="${ name }" name="name">
            </div>
            <div class="my-3">
                <label for="">Product Price</label>
                <input type="text" class="form-control" value="${ price }" name="price">
            </div>
            <div class="my-3">
                <label for="">Product Quantity</label>
                <input type="text" class="form-control" value="${ quantity }" name="quantity">
            </div>
            <div class="my-3">
                <input type="hidden" class="form-control" value="${ index }" name="index">
            </div>
            <div class="my-3">
                <img src="${ photo }" alt="" class="w-100">
            </div>
            <div class="my-3">
                <label for="">Product photo</label>
                <input type="text" class="form-control" value="${ photo }" name="photo">
            </div>
            <div class="my-3">
                <input type="submit" class="btn btn-primary w-100" value="Update Product Now">
            </div>
        `;
    }
    if(e.target.classList.contains('delete-btn')){
        let index = e.target.getAttribute('product_index');

        let conf = confirm("You want to delete?");
        if(conf){
            let data = readLSData('product');

            data.splice(index, 1);

            updateLSData('product', data);
            allDataShow();
        }
    }
}

/**
 * Submit Edit Form
 */
 product_edit_form.onsubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData(e.target);
    let { name, price, quantity, photo, index } = Object.fromEntries(form_data.entries());


    let all_data = readLSData('product')
    all_data[index] = { name, price, quantity, photo };


    updateLSData('product', all_data);
    allDataShow();

 }