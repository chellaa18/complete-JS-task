
const headers = [
    "S.No",
    "Product Name",
    "Product Quantity",
    "Product Mrp",
    "Product SP",
    "Date",
    "Actions",
  ];
  const products = JSON.parse(localStorage.getItem("products"));
  
  let tableContainer = document.getElementById("table-container");
  let table = document.createElement("table");
  
  let headRow = document.createElement("tr");
  let tableHead = document.createElement("thead");
  
  headers.forEach((header) => {
    let headCell = document.createElement("th");
    headCell.textContent = header;
    headRow.appendChild(headCell);
  });
  tableHead.appendChild(headRow);
  table.appendChild(tableHead);
  tableContainer.appendChild(table);
  
  let tableBody = document.createElement("tbody");
  
  products.forEach((product) => {
    let bodyRow = document.createElement("tr");
    Object.values(product).forEach((product) => {
      let bodyCell = document.createElement("td");
      bodyCell.textContent = product;
  
      bodyRow.appendChild(bodyCell);
    });
    let actionCell = document.createElement("td");
  
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class","nav-button");
    deleteButton.addEventListener("click", () => {
      deleteRow(product);
    });
  
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute("class","nav-button");
    editButton.addEventListener("click", () => {

      editRow(product);
    });
  
    actionCell.appendChild(deleteButton);
    actionCell.appendChild(editButton);
  
    bodyRow.appendChild(actionCell)
  
    tableBody.appendChild(bodyRow);
  });
  
  table.appendChild(tableBody);
  
  function deleteRow(data) {
    let index = products.findIndex((product) => product === data);
  
    const isOk = confirm("Are you sure you want to delete this product?");

    if (isOk) {
      products.splice(index, 1);

      products.forEach((product, id) => {
        product.productId = id + 1;
      });

      localStorage.setItem("products", JSON.stringify(products));
      
      renderTable(); 
    }
  };
 
  
  function editRow(data) {
    let index = products.findIndex((product) => product === data);
     console.log(data.productId);
    if (index !== -1) {
      
      const editProduct = [{
        productId: data.productId,
        productName : data.productName,
        productQty: data.productQty,
        productMrp : data.productMrp,
        productSp : data.productSp
      }];
      localStorage.setItem("edit", JSON.stringify(editProduct));
      window.location.href = "/edit.html";
    }
   
  }
  
  function renderTable() {
    tableBody.innerHTML = ""; 
  
    products.forEach((product) => {
      let bodyRow = document.createElement("tr");
      Object.values(product).forEach((value) => {
        let bodyCell = document.createElement("td");
        bodyCell.textContent = value;
        bodyRow.appendChild(bodyCell);
      });
      let actionCell = document.createElement("td");
  
      let deleteButton = document.createElement("button");
     
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteRow(product);
      });
  
      let editButton = document.createElement("button");
      editButton.setAttribute('id', 'del')
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {

        editRow(product);
      });
  
      actionCell.appendChild(deleteButton);
      actionCell.appendChild(editButton);
  
      bodyRow.appendChild(actionCell)
  
      tableBody.appendChild(bodyRow);
    });
  }


 document.getElementById('sort-button').addEventListener("click",()=>{
    products.sort((a, b) => a.productMrp - b.productMrp);
    renderTable();
  });
  document.getElementById('des-button').addEventListener("click",()=>{
     products.sort((a, b) => b.productMrp - a.productMrp);
    renderTable();
  });