const container = document.getElementById("container");
container.style.display = "none";

const create = () => {
  container.style.display = "flex";
  document.body.style.overflow = "hidden";
};

const closeForm = () => {
  container.style.display = "none";
  document.body.style.overflow = "auto";
};

container.addEventListener("click", (e) => {
  if (e.target === container) {
    closeForm();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:3000";
  const chickenPurchasesForm = document.getElementById("chickenPurchases-form");
  const chickenPurchasesData = document.getElementById("chickenPurchases-data");
  const pricePerPiece = document.getElementById("price-per-piece");
  const numberOfPieces = document.getElementById("number-of-pieces");
  const totalPrice = document.getElementById("total-price");

  // Automatically calculate total when price or pieces are updated
  pricePerPiece.addEventListener("input", calculateTotal);
  numberOfPieces.addEventListener("input", calculateTotal);

  function calculateTotal() {
    const price = parseFloat(pricePerPiece.value);
    const pieces = parseInt(numberOfPieces.value);
    if (!isNaN(price) && !isNaN(pieces)) {
      totalPrice.value = price * pieces;
    } else {
      totalPrice.value = 0;
    }
  }

  // Handle form submission when "Save" button is clicked
  chickenPurchasesForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Collect form data
    const supplierId = document.getElementById("supplier-id").value;
    const chickenType = document.getElementById("type-of-chicken").value;
    const price = parseFloat(pricePerPiece.value);
    const pieces = parseInt(numberOfPieces.value);
    const total = parseFloat(totalPrice.value);
    const date = document.getElementById("purchase-date").value;

    const userValues = { supplierId, chickenType, price, pieces, total, date };
    console.log(userValues);

    // Save to the backend (API)
    fetch(`${url}/api/chicken-purchases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userValues),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        const info = document.getElementById("info");
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerHTML = `<p>${data.message}</p>`;
        info.appendChild(toast);
        setTimeout(() => {
          toast.remove();
        }, 2000);

        closeForm();
        displayPurchases();
        chickenPurchasesForm.reset(); // Reset the form fields
      })
      .catch((error) => console.error("Error:", error));
  });

  // Function to display saved purchases from the database
  function displayPurchases() {
    fetch(`${url}/api/chicken-purchases`)
      .then((response) => response.json())
      .then((purchases) => {
        console.log(purchases);
        chickenPurchasesData.innerHTML = `
          <input
        id="search-bar"
        class="fas fa-search"
        placeholder="search"
        type="text"
      />
                    <table>
                        <thead>
                            <tr>
                                <th>Supplier ID</th>
                                <th>Type</th>
                                <th>Price per Piece (Ksh)</th>
                                <th>No. of Pieces</th>
                                <th>Total Price</th>
                                <th>Purchase Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="purchases-table-body"></tbody>
                    </table>
                `;
        //search bar implementation
        searchBar = document.getElementById("search-bar");
        const tableBody = document.getElementById("purchases-table-body");

        const renderTable = (filteredPurchases) => {
          tableBody.innerHTML = "";
          filteredPurchases.forEach((purchase) => {
            const row = document.createElement("tr");

            //logic to remove the actions column when the user is not an admin
            let actions = `
                      <td>
                          <button onclick="enableEditing(${purchase.id})">Edit</button>
                          <button onclick="deletePurchase(${purchase.id})">Delete</button>
                          <button id="save-btn-${purchase.id}" style="display:none;" onclick="savePurchase(${purchase.id})">Save</button>
                      </td>`;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user.role !== "admin" && user.role !== "superadmin") {
              actions = `<td></td>`;
            }

            row.innerHTML = `
                        <td><input type="text" value="${purchase.supplier_id}" disabled></td>
                        <td><input type="text" value="${purchase.chicken_type}" disabled></td>
                        <td><input type="number" value="${purchase.price_per_piece}" disabled></td>
                        <td><input type="number" value="${purchase.no_of_pieces}" disabled></td>
                        <td><input type="number" value="${purchase.total_price}" disabled></td>
                        <td><input type="date" value="${purchase.purchase_date}" disabled></td>
                        ${actions}
                      `;
            tableBody.appendChild(row);
          });
        };
        renderTable(purchases);

        searchBar.addEventListener("keyup", (e) => {
          const searchString = e.target.value.toLowerCase();
          const filteredPurchases = purchases.filter((purchase) => {
            return (
              purchase.supplier_id.toLowerCase().includes(searchString) ||
              purchase.chicken_type.toLowerCase().includes(searchString)
            );
          });
          renderTable(filteredPurchases);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  // Enable editing of a purchase record
  window.enableEditing = function (id) {
    const inputs = document.querySelectorAll(`#purchases-table-body input`);
    inputs.forEach((input) => (input.disabled = false));
    document.getElementById(`save-btn-${id}`).style.display = "inline";
  };

  // Save the edited purchase record
  window.savePurchase = function (id) {
    const supplierId = document.querySelector(
      `#purchases-table-body input:nth-child(1)`
    ).value;
    const chickenType = document.querySelector(
      `#purchases-table-body input:nth-child(2)`
    ).value;
    const price = parseFloat(
      document.querySelector(`#purchases-table-body input:nth-child(3)`).value
    );
    const pieces = parseInt(
      document.querySelector(`#purchases-table-body input:nth-child(4)`).value
    );
    const total = parseFloat(
      document.querySelector(`#purchases-table-body input:nth-child(5)`).value
    );
    const date = document.querySelector(
      `#purchases-table-body input:nth-child(6)`
    ).value;

    fetch(`${url}/api/chicken-purchases/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        supplierId,
        chickenType,
        price,
        pieces,
        total,
        date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated:", data.message);
        displayPurchases(); // Refresh the table
      })
      .catch((error) => console.error("Error:", error));
  };

  // Delete a purchase record
  window.deletePurchase = function (id) {
    const confirmed = confirm("Are you sure you want to delete?");

    if (confirmed) {
      fetch(`${url}/api/chicken-purchases/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Deleted:", data.message);
          displayPurchases(); // Refresh the table
          const info = document.getElementById("info");
          const toast = document.createElement("div");
          toast.classList.add("toast");
          toast.innerHTML = `<p>${data.message}</p>`;
          info.appendChild(toast);
          setTimeout(() => {
            toast.remove();
          }, 2000);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Initial display of saved purchases
  displayPurchases();
});
