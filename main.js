const url = "https://fakestoreapi.com/products";
const cart = []
const barang = [];

const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  barang.push(data);

  let totalkeranjang= document.getElementsByClassName("cart_count")[0]
  const divProduk = document.getElementsByClassName("div-produk");

  data.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="bg-gray-800 p-3 text-white">
        <img src="${item.image}" class="w-full h-56 object-cover"/>
        <span class="block font-bold text-xl title">${item.title}</span>
        <span class="block category">${item.category}</span>
        <span class="block description">${item.description}</span>
        <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
      </div>
    `;
  });

  const btnAddCart = document.getElementsByTagName("button");
  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
      // ambil title,category, dan description terdekat dari tombol yang diklik
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol.closest("div").querySelector(".description").innerText;

      //untuk menambah jumlah keranjang
      cart.push({"title": title, "category":category, "description": description})
            
      //update total keranjang
      totalkeranjang.innerHTML = cart.length
    });
  });
};
ambilData();

const modalkeranjang = document.getElementsByClassName('modal')[0]
const btnTutup = document.getElementsByClassName("btn-tutup")[0]
const btntampilkeranjang = document.getElementsByClassName("tampil-keranjang")[0]
const keranjanganda = document.getElementsByClassName("keranjang-anda")[0]


btnTutup.addEventListener("click", () => {
  modalkeranjang.classList.add("hidden")
})

btntampilkeranjang.addEventListener("click", () => {
  modalkeranjang.classList.remove("hidden")
  keranjanganda.innerHTML= ''

  //untuk memanggil produk yang diklik dan ditampilkan di modal
  cart.forEach((item,index) => {
    keranjanganda.innerHTML += `
    <div class="bg-white flex justify-around rounded my-3 p-3"
      <span class=" font-bold text-xl" style="font-weight:bold;">${item.title}</span>
      <span class=" font-semibold text-sm">${item.category}</span>
      
    </div>
    
    `
  })
})

const searchbar = document.querySelector(".searchbar");
searchbar.addEventListener("keyup", (e) => {
    let namaBarang = e.target.value.toLowerCase();
    const hasilcari = barang[0].filter((item) => {
        return item.title.toLowerCase().includes(namaBarang);
    });
    const divProduk = document.getElementsByClassName("div-produk");
divProduk[0].innerHTML= "";
hasilcari.forEach((item) => {
  divProduk[0].innerHTML += `
    <div class="bg-gray-800 p-3 text-white">
      <img src="${item.image}" class="w-full h-56 object-cover"/>
      <span class="block font-bold text-xl title">${item.title}</span>
      <span class="block category">${item.category}</span>
      <span class="block description">${item.description}</span>
      <button class="bg-sky-500 px-3 py-1 rounded text-black">Tambah ke keranjang</button>
    </div>
  `;
});
})
