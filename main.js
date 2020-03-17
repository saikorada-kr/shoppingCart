let carts = document.getElementsByClassName("add-cart");
let largeName = 0;
let largeCount = 0;
let largePrice = 0;

let mediumName = 0;
let mediumCount = 0;
let mediumPrice = 0;

let condition1 = 0;
let condition2 = 0;
let condition3 = 0;

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
    if (item.name === "Medium-pizza") {
      mediumName = item.name;
      mediumCount = item.inCart;
      mediumPrice = parseInt(item.price);
    }
    if (item.name === "Large-pizza") {
      largeName = item.name;
      largeCount = item.inCart;
      largePrice = parseInt(item.price);
    }
    if (item.name === "Small-pizza") {
      condition1 = item.inCart; ///////////
      condition2 = item.name; /////////////
      condition3 = parseInt(item.price); //
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

          let quotient = Math.floor(condition1 / 3);
          let remainder = condition1 % 3;

          if (quotient >= 1) {
            if (remainder === 0) {
              let Totaldiscount = condition1 * condition3 * discount;

              let totalMedium = mediumCount * mediumPrice;

              let totalLarge = largeCount * largePrice;

              let totalSmall = condition1 * condition3;

              let buffer = totalMedium + totalLarge;

              console.log(totalMedium);

              FinalPrice = totalSmall - Totaldiscount + buffer;

              console.log(FinalPrice);
              document.getElementById("finalTotal").innerHTML = FinalPrice;
            } else if (remainder !== 0) {
              let Totaldiscount = condition3 * discount * quotient * 3;

              console.log(quotient);

              console.log(Totaldiscount);

              let totalMedium = mediumCount * mediumPrice;

              let totalLarge = largeCount * largePrice;

              let totalSmall = condition1 * condition3;

              console.log(totalMedium);

              FinalPrice =
                totalSmall - Totaldiscount + totalMedium + totalLarge;

              console.log(FinalPrice);
              document.getElementById("finalTotal").innerHTML = FinalPrice;
            }
          } else {
            document.getElementById("finalTotal").innerHTML = cartCost;
          }
        } else if (UserName === "amazon") {
          mediumPrice = 299.99;

          let totalMedium = mediumCount * mediumPrice;

          let totalLarge = largeCount * largePrice;

          let totalSmall = condition1 * condition3;

          FinalPrice = totalSmall + totalMedium + totalLarge;

          console.log(FinalPrice);
          document.getElementById("finalTotal").innerHTML = FinalPrice;
        } else if (UserName === "facebook") {
          let discount = 0.2;
          let largePrice = 389.99;

          let quotient = Math.floor(mediumCount / 5);
          let remainder = mediumCount % 5;

          if (quotient >= 1) {
            if (remainder === 0) {
              let Totaldiscount = mediumCount * mediumPrice * discount;

              let totalLarge = largeCount * largePrice;

              let totalSmall = condition1 * condition3;

              let totalMedium = mediumCount * mediumPrice;

              //console.log(totalMedium);

              FinalPrice =
                totalMedium - Totaldiscount + totalSmall + totalLarge;

              console.log(FinalPrice);
              document.getElementById("finalTotal").innerHTML = FinalPrice;
            } else if (remainder !== 0) {
              let Totaldiscount = mediumPrice * discount * quotient * 5;

              let totalMedium = mediumCount * mediumPrice;

              let totalLarge = largeCount * largePrice;

              let totalSmall = condition1 * condition3;

              FinalPrice =
                totalSmall - Totaldiscount + totalMedium + totalLarge;

              console.log(FinalPrice);
              document.getElementById("finalTotal").innerHTML = FinalPrice;
            }
          } else {
            document.getElementById("finalTotal").innerHTML = cartCost;
          }
        } else {
          document.getElementById("finalTotal").innerHTML = cartCost;
        }
      });
    });
  });
}

let Allclear = document.getElementsByClassName("EMPTY CART");

Allclear[0].addEventListener("click", () => {
  localStorage.clear(function() {
    console.log("clear");
  });
});
