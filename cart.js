// cart section 

// shirt value error checkpoint
const cartBtn = document.querySelectorAll('.addToCart');

const merch = [
    {
        name: "BFB T Shirt",
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

      // what i wanna do is loop the sizing thru and if there isn't the same size then push thru the new merch item into array
     /* 
      for (const merchItem of merchInsideCartArray) {
          if (merchItem.sizing === merch.sizing) {
              itemExists = true;
              merchItem.numberInCart += 1;
          } 
      }
      if (itemExists) {
      } else {
          let tempItem = merch;
          console.log(tempItem);
          tempItem.numberInCart = 1;
          merchInsideCartArray.push(tempItem);
      }
      */
      // Check if product exists in array. If it does then we increment the number in cart
      for ( const merchItem of merchInsideCartArray) {
          if (merchItem.tag === merch.tag && merchItem.sizing === merch.sizing) {
              merchItem.numberInCart += 1; 
              itemExists = true;
          } /* else if  (merchItem.sizing === merch.sizing) {
            itemExists = true;
            merchItem.numberInCart += 1;
        } */     
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
       let basketTotal = document.querySelector(".basketTotal");
       let cart = localStorage.getItem('totalCartPrice');
       cart = parseInt(cart);
    
    if ( merchInsideCart && productContainer != null ) {
       productContainer.innerHTML += `
          <div class = "newCartProduct">
         <!--   <ion-icon name="close-circle"></ion-icon> -->
            <img src = "${merchInsideCart.tag}.png">
            <span>${merchInsideCart.name}</span>
          </div>
          <div class = "size">${merchInsideCart.sizing}</div>
          <div class = "price"> $${merchInsideCart.price}</div>
          <div class = "quantity"> 
          <!--    <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>  -->
                    <span>${merchInsideCart.numberInCart}</span>
          <!--     <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>  -->
          </div>
          <div class = "total"> $${merchInsideCart.numberInCart * merchInsideCart.price}</div>
          ` 
   
        
        basketTotal.innerHTML = `$${cart}.00`


        // manageQuantity();
      // deleteButtons();
       
       } else {
        productContainer.innerHTML = 
        `
           <div class = "newCartProduct">
             
           </div>
           <div class = "size"></div>
           <div class = "price"> </div>
           <div class = "quantity"> </div>
           <div class = "total"></div>
        ` 
        basketTotal.innerHTML = `$${cart}.00`
       }
       
   }
}
/*
const manageQuantity = () => {
    let decreaseButtons, increaseButtons, currentQuantity, currentProduct;
    decreaseButtons = document.querySelectorAll(".decrease");
    increaseButtons = document.querySelectorAll(".increase");
    currentQuantity = 0;
    
    let merchInsideCartArray = localStorage.getItem("productsInsideCart");
    merchInsideCartArray = JSON.parse(merchInsideCartArray);
    // console.log(merchInsideCartArray);
  //  console.log(typeof merchInsideCartArray);
  
  
    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
         console.log(currentQuantity)
              currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
               console.log(currentProduct)
            
            for (const x of merchInsideCartArray) {
           // for (let x = 0; x < merchInsideCartArray.length; x++)
            if (x.tag === currentProduct && x.numberInCart > 1) {
                x.numberInCart -= 1;
                getNumberOfItemsInCart(x, "decrease");
                totalCartPrice(x, "decrease");
                localStorage.setItem('productsInsideCart', JSON.stringify(merchInsideCartArray));
                displayCart();
             }
            }
  
            if( merchInsideCartArray.currentProduct.numberInCart > 1 ) {
                merchInsideCartArray.currentProduct.numberInCart -= 1;
                getNumberOfItemsInCart(merchInsideCartArray.currentProduct, "decrease");
                totalCartPrice(merchInsideCartArray.currentProduct, "decrease");
                localStorage.setItem('productsInsideCart', JSON.stringify(merchInsideCartArray));
                displayCart();
            } 
        }
        ); 
  
       increaseButtons[i].addEventListener('click', () => {
            
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                merchInsideCartArray[currentProduct].numberinCart += 1;
                getNumberOfItemsInCart(merchInsideCartArray[currentProduct], "increase");
                totalCartPrice(merchInsideCartArray[currentProduct], "increase");
                localStorage.setItem('productsInsideCart', JSON.stringify(merchInsideCartArray));
                displayCart();
            
        }); 
    }
  }
  
  */
  
  const deleteButtons = () => {
      let deletebutton, cartPrice, amountInCart, merchInsideCartArray, productName, productContainer, basketTotal;  
      productContainer = document.querySelector(".cart-products");
      basketTotal = document.querySelector(".basketTotal");
      deletebutton = document.querySelectorAll(".newCartProduct ion-icon");
      console.log(deletebutton);
      cartPrice = localStorage.getItem("totalCartPrice");
      amountInCart = localStorage.getItem("getNumberOfItemsInCart");
      merchInsideCartArray = localStorage.getItem("productsInsideCart");
      merchInsideCartArray = JSON.parse(merchInsideCartArray);

      for (let i=0; i < deletebutton.length; i++) {
        deletebutton[i].addEventListener('click', () => {
        productName = deletebutton[i].parentElement.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();

        for (const x of merchInsideCartArray) {
            if (x.tag === productName) {

            localStorage.setItem("getNumberOfItemsInCart", amountInCart - x.numberInCart);
            cartPrice = localStorage.setItem("totalCartPrice", cartPrice - (x.price * x.numberInCart));
            
            delete x.name
            delete x.tag
            delete x.price
            delete x.numberInCart
            delete x.sizing
           saveCartItems();
            console.log(x);
            console.log(merchInsideCartArray);

            localStorage.setItem('productsInsideCart', JSON.stringify(merchInsideCartArray));


                productContainer.innerHTML = 
                `
                   <div class = "newCartProduct">
                     
                   </div>
                   <div class = "size"></div>
                   <div class = "price"> </div>
                   <div class = "quantity"> </div>
                   <div class = "total"></div>
                ` 
                basketTotal.innerHTML = `$${cartPrice}.00`
            
            }
        }
        
            
      });
    } 
  }
  
  
  
  saveCartItems();
  displayCart();