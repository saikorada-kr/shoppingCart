let carts = document.getElementsByClassName("add-cart");

//console.log(carts.length);

let products = [
    {
        name: 'Small pizza',
        description: '10"pizza for one person',
        price: '$269.99',
        inCart: 0
    },
    {
        name: 'Medium pizza',
        description: '12"pizza for two people',
        price: '$322.99',
        inCart: 0
    },   {
        name: 'Large pizza',
        description: '15"pizza for four people',
        price: '$394.99',
        inCart: 0
    }
];



for(let i=0; i<carts.length; i++){
    
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
    });

};
//console.log(products[i])

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.getElementsByTagName('span')[0].textContent = productNumbers;
    }
}

function cartNumbers(product){

    //console.log('The product is clicked', product);

    let productNumbers = localStorage.getItem('cartNumbers');
    //console.log(productNumbers);
    productNumbers = parseInt(productNumbers);
    //console.log(typeof productNumbers);
     if(productNumbers){
         localStorage.setItem('cartNumbers',productNumbers + 1);
         document.getElementsByTagName('span')[0].innerHTML = productNumbers+1;
     }else{
        localStorage.setItem('cartNumbers',1);
        document.getElementsByTagName('span')[0].innerHTML = 1;
     }
     
    setItems(product)  

}

function setItems(product){

    console.log('my product is ',product);
    let cartItems = {
        [product.name]:product
    }
    product.inCart = 1;
    localStorage.setItem('productsInCart',JSON.stringify(cartItems))

}

onLoadCartNumbers()

