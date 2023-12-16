const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;
// document.forms[0].id='new-id';
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
// let out=document.images[0].src;
// console.log(out);

//for opening eavh form in console this feature is used;
// const forms = Array.from(document.forms);
// forms.forEach((form) => console.log(form));

//for getting single element from the DOM with the bhelp of id
// console.log(document.getElementById('item-form').className);
// document.getElementById('item-form').setAttribute('class','new-class'); //changing this old class into new class
// console.log(document.getElementById('item-form').className);  //now u can notice that the class has been changedd now.

//how to change content  of the webpage
// const title = document.getElementById('title-content');
// console.log(title.textContent);
// title.textContent='Hello-everyone';
// title.innerHTML = '<strong> heyy you!</strong>';

//document.query-selector
console.log(document.querySelector('h1'));
console.log(document.querySelector('#item-form'));
console.log(document.querySelector('.new-class'));
//now using these method to change the other elements and various other properties
const list = document.querySelector('ul');
console.log(list);
const firstobj=document.querySelector('li');
console.log(firstobj);
// firstobj.style.color='blue';

//DOM selectors Multiple elements

//first of all QUERYSELECTOR ALL
// const list1 =  document.querySelectorAll('li');
// console.log(list1); //Nodelist
// console.log(list1[0].textContent);
// list1.forEach((item, index) => {
//   item.style.color='red';

//   if(index === 1) 
// {
//   item.remove();
//  }
//  if(index===0)
//  {
//   item.innerHTML=`Banana
//   <button class="remove-item btn-link text-red">
//     <i class="fa-solid fa-xmark"></i>
//   </button>`
//  }
//  } );  

//how to create a child element in DOM
const div=document.createElement('div');
div.className='my-element';
div.id='my-element';

//hot to append a element in the DOM.
const text=document.createTextNode('hello yash');
div.appendChild(text);
document.body.appendChild(div);

//creating element vs using innerHTML
// [dirty method]
// function additemtolist(item)
// {
//   const li=document.createElement('li');
//   li.innerHTML=`${item} 
//   <button class="remove-item btn-link text-red">
//             <i class="fa-solid fa-xmark"></i>
//           </button>`;

//           document.querySelector('.items').appendChild(li);

// }
// additemtolist('eggs');

// [clean and performant method]
// function createclean(item)
// {
//   const li=document.createElement('li');
//   li.appendChild(document.createTextNode(item));
   
//   const button=document.createElement('button');
//   button.className='remove-item btn-link text-red';

//   const icon=document.createElement('i');
//   icon.classname='fa-solid fa-xmark';

//   button.appendChild(icon);
//   li.appendChild(button);

//   document.querySelector('.items').appendChild(li);
// }
// createclean('biscuits');

function createclean(item)
{
  const li=document.createElement('li');
  li.appendChild(document.createTextNode(item));
   
  const button=createButton('remove-item btn-link text-red');
  li.appendChild(button);

  document.querySelector('.items').appendChild(li);
}
function createButton(classes)
{
  const button=document.createElement('button');
  button.className=classes;
  const icon=createicon('fa-solid fa-xmark');
  button.appendChild(icon);

  return button;
}
function createicon(classes1)
{
  const icon=document.createElement('i');
  icon.className=classes1;
  return icon;
}
createclean('biscuits');

//(inserting adjacent html/text/elements)
// function insertelement()
// {
//   const filter=document.querySelector('.filter');
//   const h1=document.createElement('h1');
//   h1.textContent='insertadjacentelements';
//   filter.insertAdjacentElement('afterend',h1);
// }
// insertelement();

// function inserttext()
// {
//   const item = document.querySelector('li:first-child');
//   item.insertAdjacentText('beforebegin','insertadjacenttext');
// }
// inserttext();

// function inserthtml()
// {
//   const clearBtn=document.querySelector('#clear');
//   clearBtn.insertAdjacentElement('afterend','<h2>insertadjacenthtml</h2>');
// }
// inserthtml();  

//replace items there are three ways to replace refer to the notes here we will learn just one method is to replace all through outerhtml
// function replaceallitems()
// {
//   const lis=document.querySelectorAll('li');

//   lis.forEach((item,index)=>
//   {
//     item.outerHTML = '<li>Replced items</li>';
//   });
// }
// replaceallitems();


// //REMOVE ELEMENT
// function removeclearbutton()
// {
//   const clearBTN=document.querySelector('#clear');
//   clearBTN.remove();
// }
// removeclearbutton();

// //remove first element 
// function removefirst()
// {
//   const ul=document.querySelector('ul');
//   const li=document.querySelector('li:first-child');

//   ul.removeChild(li);
// }
// removefirst();

// function removeaskednumber(itemnumber)
// {
//   const ul=document.querySelector('ul');
//   const li=document.querySelector(`li:nth-child(${itemnumber})`);
//   ul.removeChild(li);
// }
// removeaskednumber(2);

function onAddItemSubmit(e) {
  e.preventDefault();

  // trim the input value to remove whitespace - disallowing duplicate items due to white space in the process
  const newItem = itemInput.value.trim();

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert(`The item "${newItem}" already exists!`);
      return;
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.closest('li')) {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (
    confirm(`Are you sure you want to remove the item "${item.textContent}"?`)
  ) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from localStorage
  localStorage.removeItem('items');

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();

//inline event listeners
// const clearBTN=document.querySelector('#clear');
// function onclear()
// {
//     alert('are you sure');
// }

//Javascript Event Listeners
// const clearBTN=document.querySelector('#clear');
// clearBTN.onclick=function()
// {
//     alert('Clearing All Items');
// }

//Add Event listeners
// clearBtn.addEventListener('click',function(){
//   alert('Are you sure!!');
// });
//(adding event listener with help of predefined function)
// clearBtn.addEventListener('click',onclear);

//setting timer
// setTimeout(() => clearBtn.removeEventListener('click',onclear),5000);
// setTimeout(() => clearBtn.click(),5000);

//(MOUSE EVENT FUNCTION)
const logo=document.querySelector('img');
const onclick=() => console.log('image is senstive');
const onDoubleclick=() => console.log('Double Click');
const onrightclick=() => console.log('right Click');
const onmouseup=() => console.log('Moving Mouse Up');
const onmouseover=() => console.log('Mouse over event');
const onmouseout=() => console.log('Mouse out event');



// logo.addEventListener('click',onclick);
// logo.addEventListener('dblclick',onDoubleclick);
// logo.addEventListener('contextmenu',onrightclick);
// logo.addEventListener('mouseover',onmouseover);
// logo.addEventListener('mouseout',onmouseout);

//(EVENT OBJECTS) there are many types pressent but we will be focusing onn some of those only
// function onevent(e)
{
  // console.log(e.target);
  // e.target.style.backgroundColor='black';
  // console.log(e.type);
}
// logo.addEventListener('click',onevent);

//Benefits of using event objects
// function ondrag(e)
// {
//   document.querySelector('h1').textContent=`X${e.clientX} and Y${e.clientY}`;
// }
// logo.addEventListener('drag',ondrag);

//(KEYBOARD EVENTS AND KEY PROPERTIES)
// const iteminput= document.getElementById('item-input');
// const onkeypress1=(e)=>{
//   console.log('key-press');
// }
// iteminput.addEventListener('keypress',onkeypress1);

// //form submission
// const form = document.getElementById('item-form');
// function onsubmit(e)
// {
//   e.preventDefault();
// const item=document.getElementById('item-input').value;
// // const priority = document.getElementById('priority-input').value;

// if(item === '' )
// {
//   alert('please enter the valid item');
//   return ;
// }
// console.log(item);
// }

// form.addEventListener('submit',onsubmit);