window.onload = function() {
  var totalAmount = "0.00"

  function addAndRemoveCart(){
      const cartBasket = document.getElementById("cart-icon");
      const cart = document.querySelector(".cart");
      const cartRemove = document.getElementById("icon-remove");

      cartBasket.addEventListener("click", function() {
        cart.style.display = (cart.style.display === "block") ? "none" : "block";
      });

      cartRemove.addEventListener("click", function(){
        cart.style.display = (cart.style.display === "none") ? "block" : "none";
      })
  }
  addAndRemoveCart();

  function removeProducts(){
    const removeProductButtons = document.getElementsByClassName("bi-trash");
  
    for(var i = 0; i < removeProductButtons.length; i++){
      removeProductButtons[i].addEventListener("click", function(event){
        event.target.parentElement.parentElement.remove();
        updateTotal();
      })
    }
  
    const quantityInputs = document.getElementsByClassName("productQtdInput")
    for(var i = 0; i < quantityInputs.length; i++){
      quantityInputs[i].addEventListener("change", updateTotal)
    }
  
    const addToCartButtons = document.getElementsByClassName("add-cart")
    for(var i = 0; i < addToCartButtons.length; i++){
      addToCartButtons[i].addEventListener("click", addToCartClicked)
    }
    inputType();
  
  }
  removeProducts();

  function addToCartClicked(event) {
    const button = event.target
    const productInfo = button.parentElement
    const productImg = productInfo.getElementsByClassName("product-img")[0].src
    const productTitle = productInfo.getElementsByClassName("title-out")[0].innerText
    const productPrice = productInfo.getElementsByClassName("product-price")[0].innerText
  
    // Check if the product is already in the cart
    const cartProducts = document.getElementsByClassName("cart-box-out")
    let productAlreadyInCart = false
    for (var i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].getElementsByClassName("cart-product-title")[0].innerText === productTitle) {
        productAlreadyInCart = true
        break
      }
    }
  
    if (!productAlreadyInCart) {
      const newCartProduct = document.createElement("div");
      newCartProduct.classList.add("cart-box");
  
      newCartProduct.innerHTML = `
        <div class="cart-box-out">
          <img src="${productImg}" alt="${productTitle}">
          <div class="content">
            <div class="cart-product-title">${productTitle}</div>
            <div class="cart-price">${productPrice}</div>
            <input class="productQtdInput" type="number" value=1>
          </div>
          <i class="bi bi-trash"></i>
        </div>
      `;
  
      const cartContent = document.querySelector(".cart-content");
      cartContent.appendChild(newCartProduct);
  
      updateTotal();
      removeProducts(); // Call removeProducts after adding the new cart product
    }
  }


  // ...

  function updateTotal(){
    let total = 0
    const cartProducts = document.getElementsByClassName("cart-box-out")
    for(var i = 0; i < cartProducts.length; i++){
      const productPrice = cartProducts[i].getElementsByClassName("cart-price")[0].innerText.replace("R$", "").replace(",", ".")
      const productQuantity = cartProducts[i].getElementsByClassName("productQtdInput")[0].value
      total += productPrice * productQuantity
    }
    totalAmount = "R$" + total.toFixed(2).replace(".", ",")
    document.querySelector(".total span").innerText = totalAmount
  }

  // ...

  function makePurchase() {
    if (totalAmount === "0.00") {
      alert("Seu carrinho está vazio!");
    } else {
      alert("Obrigado Pela Sua Compra!\n\nValor do pedido: " + totalAmount + "\nVolte sempre :)");
    }
  }

  const uppcaseButton = document.getElementsByClassName("uppcase-button")[0];
  uppcaseButton.addEventListener("click", makePurchase);




/*
  function updateTotal(){
      let totalAmount = 0
      const cartProducts = document.getElementsByClassName("cart-box-out")
      for(var i = 0; i < cartProducts.length; i++){
    
        const productPrice = cartProducts[i].getElementsByClassName("cart-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("productQtdInput")[0].value
        
        totalAmount += productPrice * productQuantity
      }
      totalAmount = "R$" + totalAmount.toFixed(2).replace(".", ",")
      document.querySelector(".total span").innerText = totalAmount
  }
  updateTotal();
*/


  // Seleciona todos os botões "Adicionar ao carrinho"
      const addToCartButtons = document.getElementsByClassName("add-cart");

    // Adiciona um evento de click a cada botão
      for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", function() {
        // Abre o carrinho quando o botão é clicado
          openCart();
      });
    }

    // Função para abrir o carrinho
      function openCart() {
        const cart = document.querySelector(".cart");
        cart.style.display = "block";
    }


    function inputType(){
      
      const quantityInputs = document.getElementsByClassName("productQtdInput");

    for (var i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("input", function() {
        if (this.value < 1) {
          this.value = 1; // Set the value to 1 if it's less than 1
        }
      });
    }
    }
    inputType();



}
