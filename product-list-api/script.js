// Fetch products from API
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    if (data) {
      displayProducts(data);
    }
  } catch (err) {
    console.log("Error: " + err);
  }
};

// Displaying products after fetching data from server
const displayProducts = (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // additional code line

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "bg-white p-4 rounded-lg shadow-md text-center";

    productItem.innerHTML = `
    <h2 class="text-lg font-semibold">${product.name}</h2>
    <p class="text-gray-700">$${product.price.toFixed(2)}</p>
    <button class="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">Add to Cart</button>
  `;

    productList.appendChild(productItem);
  });
};

window.onload = () => fetchProducts();
