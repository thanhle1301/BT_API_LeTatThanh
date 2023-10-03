// 2.2 dom lên html
function showDataForm(product) {
  console.log("🚀 - showDataForm - showDataForm:", showDataForm);
  document.getElementById("TenSP").value = product.name;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("HinhSP").value = product.img;
  document.getElementById("MoTaSP").value = product.desc;
}
