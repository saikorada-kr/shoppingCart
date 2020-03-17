let carts = document.getElementsByClassName("add-cart");

//console.log(carts.length);
let condition1 = 0;
let condition2 = "";
let condition3 = 0;
let FinalPrice = 0;
let products = [
  {
    name: "Small-pizza",
    description: '10"pizza for one person',
    price: "269.99",
    inCart: 0
  },
  {
    name: "Medium-pizza",
    description: '12"pizza for two people',
    price: "322.99",
    inCart: 0
  },
  {
    name: "Large-pizza",
    description: '15"pizza for four people',
    price: "394.99",
    inCart: 0
  }
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    displayCart();
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.getElementsByTagName("span")[0].textContent = productNumbers;
  }
}

//////////////////////////////////////////////////CART NUMBER//////////////////////////////////////////////////////

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.getElementsByTagName("span")[0].innerHTML = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.getElementsByTagName("span")[0].innerHTML = 1;
  }

  setItems(product);
  //console.log(product);
}

//////////////////////////////////////////////////SET ITEMS////////////////////////////////////////////////////////

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  //console.log('my product is ',cartItems);

  if (cartItems != null) {
    if (cartItems[product.name] === undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product
      };
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
//////////////////////////////////////////////////////TOTAL COST//////////////////////////////////////////////////////

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    product.price = parseInt(product.price);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  let cartCost = localStorage.getItem("totalCost");

  cartItems = JSON.parse(cartItems);
  Object.values(cartItems).map(item => {
    if (item.name === "Small-pizza") {
      condition1 = item.inCart;
      condition2 = item.name;
      condition3 = parseInt(item.price);
    }

    let store = document.getElementById("store");
    //console.log(store);
    store.addEventListener("click", function() {
      UserName = document.getElementById("username").value;

      //////
      let Fin = document.getElementsByClassName("getTotals");

      Fin[0].addEventListener("click", () => {
        //console.log("listening");
        if (UserName === "infosys") {
          let discount = 0.33;

          let quotient = condition1 / 3;
          let remainder = condition1 % 3;

          if (quotient >= 1) {
            if (remainder === 0) {
              let Totaldiscount = condition1 * condition3 * discount;

              FinalPrice = cartCost - Totaldiscount;

              console.log(FinalPrice);
              document.getElementById("finalTotal").innerHTML = FinalPrice;
            }
          }
        }
      });
    });
  });
}
