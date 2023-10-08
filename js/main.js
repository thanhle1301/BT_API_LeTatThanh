var selectorId = null;
// 2. cho hiển thị lên layout
function renderProductList(productArr) {
  var contentHTML = "";
  // 2.1 tạo vòng lặp để hiện từng product + ...
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    var trString = `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.img}</td>
                        <td>${product.desc}</td>
                        <td>
                          <button onclick='editProduct(${product.id})' class="btn btn-warning">Edit</button>
                          <button onclick='deleteProduct(${product.id})' class="btn btn-danger">Delete</button>
                        </td>
                    </tr>`;
    // 3.1 gắn onclick vào để xử lý
    contentHTML = contentHTML + trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
// 3.2 tạo function ngoài để refesh lại khi xóa, ...
function fetchProductList() {
turnOnLoading();

  // 1. Lấy dữ liệu từ sever về
  axios({
    url: "https://65118c9a829fa0248e4052bf.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      turnOffLoading();
      console.log("Lấy dữ liệu từ sever thành công :", res);

      renderProductList(res.data.reverse()); // 1.1 tao function chứa mỗi data của sever
    })
    .catch(function (err) {
      turnOffLoading();

      console.log("Lấy dữ liệu từ sever thất bại :", err);
    });
}
fetchProductList();
// 3. thêm chức năng xóa
function deleteProduct(id) {
  // console.log("🚀 - deleteProduct - id:", id);
  axios({
    url: `https://65118c9a829fa0248e4052bf.mockapi.io/product/${id}`,

    method: "DELETE",
  })
    .then(function (res) {
      fetchProductList();
    })
    .catch(function (res) {
      console.log("🚀 - delete xóa thất bại: ", res);
    });
}
// 4. chức năng thêm
function addProduct() {
  var newProduct = getDataForm();
  axios({
    url: "https://65118c9a829fa0248e4052bf.mockapi.io/product",
    method: "POST",
    data: newProduct, // gọi api và đưa new Product lên sever
  })
    .then(function (res) {
      console.log("add product", res);
      alert("thêm ok");
      fetchProductList(); // render lại data layout
    })
    .catch(function (res) {
      // console.log("🚀 - addProduct - res:", res);
    });
}
// 5. add Edit product
function editProduct(id) {
  selectorId = id;
  axios({
    url: `https://65118c9a829fa0248e4052bf.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log( res);
      $("#myModal").modal("show");
      showDataForm(res.data);
    })
    .catch(function (err) {
      console.log("🚀 - editProduct - err:", err);
    });
}
// 6. update lại khi edit ..
function updateProduct() {
  var product = getDataForm();
  console.log(product);
  axios({
    url: `https://65118c9a829fa0248e4052bf.mockapi.io/product/${selectorId}`,
    method: "PUT",
    data: product,
  }).then(function(res){
    $("#myModal").modal("hide");
    fetchProductList()
  })
  .catch(function(err){});

}
