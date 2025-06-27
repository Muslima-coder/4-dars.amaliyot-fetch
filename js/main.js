let elProductList = document.querySelector(".product-list")
let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")
let elSearchInput = document.querySelector(".search-input")
let url = "https://api.escuelajs.co/api/v1/products"



//get all product
const getProducts = () => axios(url).then(data =>  renderProducts(data.data, elProductList))
getProducts()




//reRender
function reRender(){
    getProducts()
    modalWrapper.classList.add("scale-0")
}

//RerenderProducts
function renderProducts(arr, list) {
    list.innerHTML = ""
    arr.forEach(item => {
        let elItem = document.createElement("li")
            elItem.className = "w-[250px] py-2 px-5 rounded-md bg-slate-600"
            elItem.innerHTML = `
            <img class="w-full h-[200px] mb-2" src="${item.images[0]}" alt="img" />
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-white font-semibold text-[18px] ">${item.title}</h2>
                <p class="text-white font-semibold text-[18px] ">${item.price}</p>
            </div>
            <p class="text-white font-semibold text-[18px] ">${item.description}</p>
            <div class="flex justify-between mt-5">
                <button onclick="handleEdit(${item.id})" class="cursor-pointer bg-blue-500 p-2 rounded-md text-white text-[18px]"> Edit</button>
                 <button onclick="handleDelete(${item.id})" class="cursor-pointer bg-red-500 p-2 rounded-md text-white text-[18px]"> Delete</button>
            </div>
            
            `
            list.append(elItem)
    })
}

//Delete part
const handleDelete = (id) => axios.delete(url + `/${id}`).then(() => getProducts())



//Create part
function handleCreate() {
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <form autocomplete="off" class="w-[400px] add-form space-y-[10px] ">
    <input class="p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter title" name="title"  />
    <input type="number" class="p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter price" name="price"  />
    <input class="p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter description" name="description"  />
    <input class="p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter img" name="img"/>
    <button type="submit" class="cursor-pointer bg-green-600 text-white font-bold text-[20px] rounded-md w-full py-1" >Create</button>
    </form>
    `
    

    let elAddForm = document.querySelector(".add-form")
    elAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const data = {
            title: e.target.title.value,
            price: e.target.price.value,
            description: e.target.description.value,
            categoryId: 1,
            images: [e.target.img.value] 
        
        }
        
        axios.post(url, data).then(() => reRender())
    })
}

//Update part
function handleEdit(id) {
    axios.get(url + `/${id}`).then(res => {
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <form autocomplete="off" class="w-[400px] edit-form space-y-[10px] ">
    <label class="flex flex-col gap-2">
    <span class="text-[18px] pl-2 text-green-500">Enter new title</span>
    <input value=${res.data.title} class="focus:shadow-md focus:shadow-green-800 focus:border-transparent p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter title" name="title"  />
    </label>
    <label class="flex flex-col gap-2">
    <span class="text-[18px] pl-2 text-green-500">Enter new price</span>
     <input value=${res.data.price} type="number" class="focus:shadow-md focus:shadow-green-800 focus:border-transparent p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter price" name="price"  />
    </label>
    <label class="flex flex-col gap-2">
    <span class="text-[18px] pl-2 text-green-500">Enter new description</span>
    <input value=${res.data.description} class="focus:shadow-md focus:shadow-green-800 focus:border-transparent p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter title" name="description"  />
    </label>
    <label class="flex flex-col gap-2">
    <span class="text-[18px] pl-2 text-green-500">Enter new link image</span>
    <input value=${res?.data?.images[0]} class="focus:shadow-md focus:shadow-green-800 focus:border-transparent p-2 border-[2px] w-full rounded-md outline-none" placeholder="Enter img" name="img"  />
    </label>
    <button type="submit" class="bg-green-600 text-white font-bold text-[20px] rounded-md w-full py-1 ">Edit</button>
    </form>
    `

    let elForm = document.querySelector(".edit-form")
    elForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const data = {
            id: id,
            title: e.target.title.value,
            price: e.target.price.value,
            description: e.target.description.value,
            categoryId: 1,
            images: [e.target.img.value]
        }
        axios.put(url + `/${id}`, data).then(() => reRender())

    })
})
}

//Search
elSearchInput.addEventListener("input", (e) => {
  let searchValue = e.target.value.trim();

  if (searchValue === "") {
    renderProducts( elProductList);
    return;
  }

  let filtered = allProducts.filter(item =>
    item.price.toString().includes(searchValue)
  );

  renderProducts(filtered, elProductList);
});


