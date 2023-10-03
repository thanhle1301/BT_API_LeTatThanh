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
                    </tr>`;
    contentHTML = contentHTML + trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
// 1. Lấy dữ liệu từ sever về
axios({
  url: "https://65118c9a829fa0248e4052bf.mockapi.io/product",
  method: "GET",
})
  .then(function (res) {
    console.log("Lấy dữ liệu từ sever thành công :", res);

    renderProductList(res.data); // 1.1 tao function chứa mỗi data của sever
    console.log("🚀 - renderProductList:", renderProductList);
  })
  .catch(function (err) {
    console.log("Lấy dữ liệu từ sever thất bại :", err);
  });
