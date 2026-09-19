/* =====================================
   GLIMORA PRODUCT DATABASE
===================================== */

const products = [

  {
    id: 1,
    name: "Elegant Gold Ring",
    price: 199,
    category: "girls",
    type: "rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    description: "Elegant everyday fashion ring."
  },

  {
    id: 2,
    name: "Minimal Silver Ring",
    price: 249,
    category: "girls",
    type: "rings",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    description: "Simple and stylish silver fashion ring."
  },

  {
    id: 3,
    name: "Fashion Earrings",
    price: 299,
    category: "girls",
    type: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    description: "Trendy earrings for everyday fashion."
  },

  {
    id: 4,
    name: "Classic Earrings",
    price: 349,
    category: "girls",
    type: "earrings",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80",
    description: "Classic earrings with a beautiful look."
  },

  {
    id: 5,
    name: "Premium Boys Bracelet",
    price: 399,
    category: "boys",
    type: "bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    description: "Stylish bracelet for boys."
  },

  {
    id: 6,
    name: "Black Fashion Bracelet",
    price: 299,
    category: "boys",
    type: "bracelets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80",
    description: "Modern black bracelet."
  },

  {
    id: 7,
    name: "Classic Men's Ring",
    price: 349,
    category: "boys",
    type: "rings",
    image: "https://images.unsplash.com/photo-1603561596112-db1d6f7e0a8c?auto=format&fit=crop&w=600&q=80",
    description: "Classic fashion ring for men."
  },

  {
    id: 8,
    name: "Trendy Chain Bracelet",
    price: 449,
    category: "boys",
    type: "bracelets",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
    description: "Trendy chain style bracelet."
  }

];


/* =====================================
   GLIMORA SETTINGS
===================================== */

const whatsappNumber = "917021223879";

const upiId = "7021223879@fam";

const storeName = "GLIMORA";


/* =====================================
   CART
===================================== */

let cart = [];


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts(list = products) {

  const container =
    document.getElementById("productContainer");

  container.innerHTML = "";


  if (list.length === 0) {

    container.innerHTML = `
      <p style="text-align:center;">
        No products found 😔
      </p>
    `;

    return;
  }


  list.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="product-info">

          <h3>
            ${product.name}
          </h3>

          <div class="price">
            ₹${product.price}
          </div>

          <div class="product-buttons">

            <button
              class="add-btn"
              onclick="addToCart(${product.id})"
            >
              🛒 Add
            </button>

            <button
              class="buy-btn"
              onclick="buyNow(${product.id})"
            >
              ⚡ Buy Now
            </button>

          </div>

        </div>

      </div>

    `;

  });

}


/* =====================================
   CATEGORY
===================================== */

function showCategory(category) {

  if (category === "all") {

    displayProducts(products);

    return;
  }


  const filtered =
    products.filter(product => {

      return (
        product.category === category ||
        product.type === category
      );

    });


  displayProducts(filtered);
}


/* =====================================
   SEARCH
===================================== */

function searchProducts() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();


  const filtered =
    products.filter(product => {

      return (
        product.name
          .toLowerCase()
          .includes(search) ||

        product.category
          .toLowerCase()
          .includes(search) ||

        product.type
          .toLowerCase()
          .includes(search)
      );

    });


  displayProducts(filtered);
}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(productId) {

  const existing =
    cart.find(item => item.id === productId);


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: productId,
      quantity: 1
    });

  }


  updateCart();

  alert("Product added to cart 🛒");
}


/* =====================================
   BUY NOW
===================================== */

function buyNow(productId) {

  /*
    Buy Now means:
    only this product
    quantity = 1
  */

  cart = [

    {
      id: productId,
      quantity: 1
    }

  ];


  updateCart();

  openCheckout();

}


/* =====================================
   CART UPDATE
===================================== */

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartCount =
    document.getElementById("cartCount");

  const cartTotal =
    document.getElementById("cartTotal");


  cartItems.innerHTML = "";


  let total = 0;

  let count = 0;


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );


    if (!product) return;


    const itemTotal =
      product.price * item.quantity;


    total += itemTotal;

    count += item.quantity;


    cartItems.innerHTML += `

      <div class="cart-item">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <div class="cart-item-info">

          <strong>
            ${product.name}
          </strong>

          <p>
            ₹${product.price}
          </p>


          <div class="quantity-controls">

            <button
              onclick="changeQuantity(${product.id}, -1)"
            >
              -
            </button>

            <span>
              ${item.quantity}
            </span>

            <button
              onclick="changeQuantity(${product.id}, 1)"
            >
              +
            </button>

            <button
              class="remove-btn"
              onclick="removeFromCart(${product.id})"
            >
              🗑️
            </button>

          </div>

        </div>

      </div>

    `;

  });


  cartTotal.innerText = total;

  cartCount.innerText = count;


  updateCheckoutAmount();

}


/* =====================================
   CHANGE QUANTITY
===================================== */

function changeQuantity(productId, change) {

  const item =
    cart.find(
      item => item.id === productId
    );


  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        item => item.id !== productId
      );

  }


  updateCart();

}


/* =====================================
   REMOVE
===================================== */

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.id !== productId
    );


  updateCart();

}


/* =====================================
   OPEN CART
===================================== */

function openCart() {

  updateCart();

  document
    .getElementById("cartModal")
    .style.display = "block";

}


function closeCart() {

  document
    .getElementById("cartModal")
    .style.display = "none";

}


/* =====================================
   PRODUCT DETAILS
===================================== */

function openProduct(productId) {

  const product =
    products.find(
      p => p.id === productId
    );


  if (!product) return;


  document.getElementById("modalImage").src =
    product.image;

  document.getElementById("modalName").innerText =
    product.name;

  document.getElementById("modalPrice").innerText =
    `₹${product.price}`;

  document.getElementById("modalDescription").innerText =
    product.description;


  document.getElementById("modalBuyBtn").onclick =
    function () {

      buyNow(product.id);

      closeProduct();

    };


  document.getElementById("modalCartBtn").onclick =
    function () {

      addToCart(product.id);

      closeProduct();

    };


  document
    .getElementById("productModal")
    .style.display = "block";

}


function closeProduct() {

  document
    .getElementById("productModal")
    .style.display = "none";

}


/* =====================================
   CHECKOUT
===================================== */

function openCheckout() {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;

  }


  closeCart();


  updateCheckoutAmount();


  document
    .getElementById("checkoutModal")
    .style.display = "block";

}


function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .style.display = "none";

}


/* =====================================
   GET TOTAL
===================================== */

function getCartTotal() {

  let total = 0;


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );


    if (product) {

      total +=
        product.price *
        item.quantity;

    }

  });


  return total;

}


/* =====================================
   CHECKOUT AMOUNT
===================================== */

function updateCheckoutAmount() {

  const total =
    getCartTotal();


  const totalElement =
    document.getElementById(
      "checkoutTotal"
    );


  const upiButton =
    document.getElementById(
      "upiPayBtn"
    );


  if (totalElement) {

    totalElement.innerText =
      `₹${total}`;

  }


  if (upiButton) {

    upiButton.innerText =
      `Pay ₹${total} with UPI`;

  }

}


/* =====================================
   PAYMENT METHOD
===================================== */

function paymentChanged() {

  const method =
    document.getElementById(
      "paymentMethod"
    ).value;


  const upiBox =
    document.getElementById(
      "upiBox"
    );


  if (method === "upi") {

    upiBox.style.display = "block";

  } else {

    upiBox.style.display = "none";

  }

}


/* =====================================
   UPI PAYMENT
===================================== */

function payWithUPI() {

  const total =
    getCartTotal();


  if (total <= 0) {

    alert("Your cart is empty!");

    return;

  }


  if (
    upiId === "YOURUPI@upi"
  ) {

    alert(
      "Please add your real UPI ID in script.js first."
    );

    return;

  }


  const upiURL =

    `upi://pay?` +

    `pa=${encodeURIComponent(upiId)}` +

    `&pn=${encodeURIComponent(storeName)}` +

    `&am=${total.toFixed(2)}` +

    `&cu=INR` +

    `&tn=${encodeURIComponent("GLIMORA Order")}`;


  window.location.href =
    upiURL;

}


/* =====================================
   WHATSAPP ORDER
===================================== */

function placeOrder() {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;

  }


  const name =
    document
      .getElementById("customerName")
      .value
      .trim();


  const phone =
    document
      .getElementById("customerPhone")
      .value
      .trim();


  const address =
    document
      .getElementById("customerAddress")
      .value
      .trim();


  const payment =
    document
      .getElementById("paymentMethod")
      .value;


  if (
    !name ||
    !phone ||
    !address
  ) {

    alert(
      "Please fill all customer details."
    );

    return;

  }


  let message =
    `*${storeName} ORDER*%0A%0A`;


  message +=
    `Name: ${encodeURIComponent(name)}%0A`;

  message +=
    `Phone: ${encodeURIComponent(phone)}%0A`;

  message +=
    `Address: ${encodeURIComponent(address)}%0A%0A`;


  message +=
    `*Products:*%0A`;


  cart.forEach(item => {

    const product =
      products.find(
        p => p.id === item.id
      );


    if (!product) return;


    message +=
      `• ${encodeURIComponent(product.name)}` +
      ` × ${item.quantity}` +
      ` = ₹${product.price * item.quantity}` +
      `%0A`;

  });


  const total =
    getCartTotal();


  message +=
    `%0A*Total: ₹${total}*%0A`;


  message +=
    `Payment: ${payment.toUpperCase()}%0A`;


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${message}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}


/* =====================================
   INITIAL LOAD
===================================== */

displayProducts();

paymentChanged();

updateCart();
