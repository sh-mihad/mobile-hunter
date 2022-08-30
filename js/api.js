const loadData =async(search,dataLimt)=>{
  
    const url =` https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data,dataLimt)
}

const  displayData =(data,dataLimt)=>{
   
    // data display limitation
    const viewAllBtn = document.getElementById("view-all-btn");
   if(dataLimt && data.length > 9){
       
    data = data.slice(0,9)
    viewAllBtn.classList.remove('d-none')
   }else{
       viewAllBtn.classList.add("d-none")
   }

    // chekc error
    const wranigMsg =document.getElementById("warnign-masg");
    if(data.length === 0){
    //    console.log("error")
    wranigMsg.classList.remove("d-none")
    }else{
        
       wranigMsg.classList.add("d-none")
    }


    //get HTML elements
    const containerPhones = document.getElementById("container-phone");
    containerPhones.textContent ="";
    // console.log(data)
    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add("col")
        div.innerHTML =`
        <div class="card">
        <img src="${element.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
         <button onclick="phoneDetails('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show details</button>

        </div>
      </div>
        `;
        containerPhones.appendChild(div)
       
    });
    spinner(false);
}
const process = productQty=>{
    
    spinner(true)
    const searFild = document.getElementById("search-fild");
   const searchValue = searFild.value;
   loadData(searchValue,productQty)
}

document.getElementById("search-btn").addEventListener('click',function(){

    process(10)
    
})
document.getElementById("search-fild").addEventListener("keypress", function(event){
    if(event.key == "Enter"){
    process(10)} 
})

document.getElementById("search-fild").addEventListener('focusin', function(){
    document.getElementById('search-fild').value ="";
})

// toggle spinner
const spinner =isTrue=>{
    const snipperElement = document.getElementById("snipper");
    if(isTrue){
        snipperElement.classList.remove("d-none")
    }else{
        snipperElement.classList.add("d-none")
    }
}

// vew all button handler

document.getElementById("vewall-btn").addEventListener('click',function(){
    console.log("viw all btn clicked")
    process()
})

// phone details functoin
const phoneDetails =async (id)=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPhoneDetails(data.data)
}

const showPhoneDetails =pDetails =>{
    console.log(pDetails)
    const modalTilte = document.getElementById("phoneDetailsModalLabel");
    modalTilte.innerText=pDetails.name;
    const modalBody =document.getElementById('modal-body');
    modalBody.innerHTML =`
   <div>
   <img src="${pDetails.image}">
   <h5>Realise Date : ${pDetails.releaseDate}</h5>
   <div>
  
   
    
    `

}

// Default call
spinner (true)
loadData('apple')



