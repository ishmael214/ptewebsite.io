// cart section 
const cartBtn = document.querySelectorAll('.addToCart');

const merch = [
    {
        name: "BFB T-Shirt",
        tag: "bfbtshirt",
        price: 24.00,
        numberInCart: 0,
        sizing: ['xs', 'S', 'M', 'L', 'XL', 'XXL']

    },
   
    {
        name: "BFB Longsleeve",
        tag: "bfblongsleeve",
        price: 31.00,
        numberInCart: 0,
        sizing: ['xs', 'S', 'M', 'L', 'XL', 'XXL']

    },

    {
        name: "BFB Hoodie",
        tag: "bfbhoodie",
        price: 40.00,
        numberInCart: 0,
        sizing: ['xs', 'S', 'M', 'L', 'XL', 'XXL']

    },
];
/*
const products = [
    {
        name: "Toronto Show Ticket",
        tag: "toronto-ticket",
        price: 20.00,
        numberInCart: 0
    },

    {
        name: "New York Show Ticket",
        tag: "ny-ticket",
        price: 20.00,
        numberInCart: 0
    },

    {
        name: "LA Show Ticket",
        tag: "la-ticket",
        price: 20.00,
        numberInCart: 0
    },

    {
        name: "Dallas Show Ticket",
        tag: "dallas-ticket",
        price: 20.00,
        numberInCart: 0
    },

    {
        name: "Houston Show Ticket",
        tag: "houston-ticket",
        price: 20.00,
        numberInCart: 0
    },

    {
        name: "Atlanta Show Ticket",
        tag: "atlanta-ticket",
        price: 20.00,
        numberInCart: 0
    },

];
*/
if (cartBtn.length != 0) {
	let productId = parseInt(cartBtn[0].id);

    cartBtn[0].addEventListener('click', () => {
        getNumberOfItemsInCart(merch[productId]);
        totalCartPrice(merch[productId]);
    })    
}

// this function is what keeps or saves the amount of items in cart even after refresh
function saveCartItems () {
    let AmountOfItemsInCart = localStorage.getItem('getNumberOfItemsInCart');
    if (AmountOfItemsInCart) {
        document.querySelector('.javashit span').textContent = AmountOfItemsInCart;
    } 

    
}

function getNumberOfItemsInCart(merch) {
    
    let AmountOfItemsInCart = localStorage.getItem('getNumberOfItemsInCart');
    AmountOfItemsInCart = parseInt(AmountOfItemsInCart);


    if (AmountOfItemsInCart) {
        localStorage.setItem('getNumberOfItemsInCart', AmountOfItemsInCart + 1);
        document.querySelector('.javashit span').textContent = AmountOfItemsInCart + 1;
    } else {
        localStorage.setItem('getNumberOfItemsInCart', 1);
        document.querySelector('.javashit span').textContent = 1;
    }

    merchInfo(merch);
}



// this function gives you the information of WHAT you're putting into the cart
function merchInfo(merch) {
    let merchInsideCartArray = localStorage.getItem("productsInsideCart");
    merchInsideCartArray = JSON.parse(merchInsideCartArray);
    let shirtSize = document.getElementById("shirtSize").value;
    merch.sizing = shirtSize

    let newCart =  merchInsideCartArray;
       

    if (merchInsideCartArray != null) { 
      	
      let itemExists = false;
      
      // Check if product exists in array. If it does then we increment the number in cart
      for ( const merchItem of merchInsideCartArray) {
          if (merchItem.tag === merch.tag ) {
              merchItem.numberInCart += 1; 
              itemExists = true;
          }       
      }
   
      // If it does NOT, then we just add it to the cart. Push to the array. Don't update the object in the array
      if (itemExists){
       	/// if item exists 
        
      }
      else {
        // if item doesn't exist
        let tempItem = merch;
        tempItem.numberInCart = 1;
        merchInsideCartArray.push(tempItem);
      }
        
     
      
        
	
     	// if hoodie not in cart
		      
      
      
      
        /*newMerchVariable = [...merchInsideCart[merch.tag]]; 
        let sizingFlag = true

        for (let i=0; i <newMerchVariable.length; i++) {

          if (newMerchVariable[i].sizing == merch.sizing) {

            merchInsideCart[merch.tag][i].numberInCart += 1

            sizingFlag = false
            break;
          } 
        }

        if (sizingFlag) {
          newCart = {
            ...merchInsideCart,                  
            [merch.tag]: [...merchInsideCart[merch.tag],merch],
          }
          console.log(newCart);
        } */     
    } 
    
    else {
            
        merch.numberInCart = 1;
        newCart = [merch];
       
    }
    localStorage.setItem("productsInsideCart", JSON.stringify(newCart));
}
// need to add in a local storage that saves the numberInCart 


function totalCartPrice(merch) {
    
      let cartPrice = localStorage.getItem('totalCartPrice');
      

      if(cartPrice != null) {
          cartPrice = parseInt(cartPrice);
          localStorage.setItem("totalCartPrice", cartPrice + merch.price);

      } else {
        localStorage.setItem("totalCartPrice", merch.price);

      }


}

// this function finne show everything in the cart on the cart page 
function displayCart() {
    let merchInsideCartArray = localStorage.getItem("productsInsideCart");
    merchInsideCartArray = JSON.parse(merchInsideCartArray);
     
     for (const merchInsideCart of merchInsideCartArray){
       let productContainer = document.querySelector(".cart-products");
       let cart = localStorage.getItem('totalCartPrice');
       cart = parseInt(cart);
    
    if ( merchInsideCart && productContainer != null ) {
       productContainer.innerHTML += `
          <div class = "product">
            <img src = "${merchInsideCart.tag}.png">
            <span>${merchInsideCart.name}</span>
          </div>
          <div class = "cartSize">${merchInsideCart.sizing}</div>
          <div class = "price"> $${merchInsideCart.price}</div>
          <div class = "cartQuantity"> ${merchInsideCart.numberInCart}</div>
          <div class = "cartTotal"> $${merchInsideCart.numberInCart * merchInsideCart.price}</div>
          `
       productContainer.innerHTML += `
      <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">Subtotal</h4>
          <h4 class="basketTotal">$${cart}.00</h4>
      </div>`
       
       
       }
   }
}


saveCartItems();
displayCart();