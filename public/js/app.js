//GET Request for product list to display
function renderProducts () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/products");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const products = JSON.parse(xhr.response);
      console.log(products);
      products.forEach(function(product) {
        const productName = product.product_name;
        const productPrice = product.price;
        const productDepartment = product.department_name;
        let icon;
        let color;
        switch (productDepartment) {
          case "books":
            icon = "fas fa-book fa-7x";
            color = "lightseagreen";
            break;
          case "clothing":
            icon = "fas fa-tshirt fa-7x";
            color = "lightsalmon";
            break;
          case "gifts":
            icon = "fas fa-gift fa-7x";
            color = "lightslategray";
            break;
        }
        const productDiv = document.createElement("div");
        productDiv.setAttribute("class", "product");
        productDiv.setAttribute("id", productName);
        const button = `<button type="submit" class="submit" data-product="${productName}">Submit Order</button>`
        productDiv.innerHTML = `<h3>${productName}</h3><h4><i class="${icon}" style="color:${color}"></i></h4><h4>$${productPrice}</h4><label for="quantity">Quantity:</label><input type="text" size="1" id="${productName}quantity" />${button}`;
        document.querySelector("#products").appendChild(productDiv);
      });
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
renderProducts();

$(document).on("click", ".submit", function (event) {
    event.preventDefault;
    const product = this.dataset.product;
    const requestedQuantity = document.getElementById(`${product}quantity`).value;
    console.log(requestedQuantity);
    $.get("/api/products/" + product, function (product) {
        const quantity = product.stock_quantity;
        console.log(quantity);
        if (quantity < requestedQuantity) {
            $("#error").empty();
        $("#error").append(`<p style="color:red">Insufficient quantity, your order was not processed.</p>`);
        }
        else {
            const newQuantity = quantity - requestedQuantity;
            const prodToUpdate = product.product_name;
            const updatedProduct = {
                product_name: prodToUpdate,
                stock_quantity: newQuantity
            }
            $.ajax({
                method: "PUT",
                url: "/api/products",
                data: updatedProduct
              }).then(function () {
                  $("#error").empty();
                  $("#error").append(`<p style="color:green">Thank you, your order has been submitted.`);
              })
        }
    })
} )