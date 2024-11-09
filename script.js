const submit= document.querySelector(".input-controls button");
let groceryContainer= document.querySelector(".grocery-container");
let grocery= document.querySelector(".grocery");
let list=document.querySelector(".grocery-list");
let alert=document.querySelector(".alert");
let clearItem =document.querySelector(".clear-items");

let editElement;
let editFlag=false;
let editId="";

clearItem.addEventListener("click",clearlist);
window.addEventListener("DOMContentLoaded",()=>{
    setPage();
})

submit.addEventListener("click",(e)=>{
     e.preventDefault();
    let value=grocery.value;
    let id= new Date().getTime().toString();
    
    
    if(value && !editFlag){
        
        createList(id,value);
        

        groceryContainer.classList.add("show-container");
        
        setToDefault(); 
        displayAlert("item added !","success");
        
        setToLocalStorage(id,value);
       

       
    }
    else if(value && editFlag){
        editElement.innerHTML=grocery.value;
        displayAlert("item Edited !" , "success");
        
        editLocalStorage(editId,value);
        setToDefault();




    }
    else{
        displayAlert("Please enter value !","danger");
    }
   

    
})

function setToDefault(){
    grocery.value="";
    editId="";
    editFlag=false;
    submit.innerHTML="submit";
}



function displayAlert(msg,type){
    alert.innerHTML=msg;
    alert.classList.add(`alert-${type}`);
    
    setTimeout(()=>{
        alert.innerHTML="";
        alert.classList.remove(`alert-${type}`);
    },1000);
}

function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement;
    let id = element.dataset.id;
    list.removeChild(element);

    if(list.children.length === 0){
        groceryContainer.classList.remove("show-container");
    }
    displayAlert("item removed !","danger");
    setToDefault();
    removeFromLocalStorage(id);

}


function editItem(e) {
   editElement = e.currentTarget.parentElement.previousElementSibling;
    let value = editElement.innerHTML;
    editId = editElement.parentElement.dataset.id;
    editFlag=true;

   grocery.value=value;
   submit.innerHTML="edit";
   


}
function clearlist(){
    list.innerHTML="";
    groceryContainer.classList.remove("show-container");
    displayAlert("list cleared !","danger");
    setToDefault();
    clearLocalStorage();
}


function setToLocalStorage(id,value){
    let grocery ={id,value};
    let items=getFromLocalStorage();

    items.push(grocery);

    localStorage.setItem("list",JSON.stringify(items));


}

function getFromLocalStorage(){
    return items=localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}

function clearLocalStorage(){
    // let items=getFromLocalStorage();
    localStorage.removeItem("list");
}
function removeFromLocalStorage(id){

    let items=getFromLocalStorage();
    
    items=items.filter((item)=>{
        if(item.id !== id){
            return item;
        }
    
    
    });
    localStorage.setItem("list",JSON.stringify(items));
    };

function editLocalStorage(id,value){
    let items = getFromLocalStorage();

    items = items.map((item)=>{
        if(item.id === id){
           item.value=value

        }
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));
}

function createList(id,value){

    let element= document.createElement("div");
        let attr= document.createAttribute("data-id");
        attr.value=id;
        element.classList.add("grocery-item");
        element.setAttributeNode(attr)

        element.innerHTML=`<p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fas fa-edit"></i>
                          </button>
                          
                          <button type="button" class="delete-btn">
                            <i class="fas fa-trash"></i>
                          </button>
                    </div>`;
         list.appendChild(element);
         let deleteBtn = element.querySelector(".delete-btn");   
         deleteBtn.addEventListener("click",deleteItem);
         let editBtn = element.querySelector(".edit-btn"); 
         editBtn.addEventListener("click",editItem); 

}

function setPage(){
    let items=getFromLocalStorage(); 
    
    items.forEach((item)=>{
        createList(item.id,item.value);
    })
    if(items.length>0){
     groceryContainer.classList.add("show-container");   
    }
    
}


// localStorage.setItem("gaurav",JSON.stringify(["item1","item2"]));
// console.log(localStorage.getItem("gaurav"));
// let x= JSON.parse(localStorage.getItem("gaurav"))
// console.log(x)
// localStorage.removeItem("gaurav")





