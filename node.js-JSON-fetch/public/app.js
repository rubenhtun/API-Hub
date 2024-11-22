const fetchData = async () => {
  const dataContainer = document.getElementById("data-container");
  const loadingMessage = document.getElementById("loading-message");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch("http://localhost:3000/food", requestOptions);

    if (!response.ok) throw new Error("Failed to fetch data from JSON file!"); // Check if the response is OK

    const data = await response.json(); // ဤအဆင့်၌ response data ကို JSON အဖြစ် ပြန်ပြောင်းပေးလိုက်ပါသည်။
    loadingMessage.style.display = "none";

    data.forEach((item) => {
      const food = document.createElement("div");
      food.className =
        "flex items-center justify-between bg-gray-50 border rounded-lg p-4";
      food.innerHTML = `
              <div>
                  <p class="text-lg font-bold text-gray-700">${item.name}</p>
                  <p class="text-sm text-gray-500">Type: ${item.type}</p>
              </div>
              <span class="text-gray-400 text-sm">ID: ${item.id}</span>
          `;
      dataContainer.appendChild(food);
    });
  } catch (err) {
    loadingMessage.style.display = "block";
    loadingMessage.textContent =
      "Failed to fetch data. Please try again later.";
    console.error("Error while fetching data:", err);
  }
};

fetchData(); // function ကို ပြန်ခေါ်ရပါမည်။
