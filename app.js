//  Storage Controller

//  Item Controller
const ItemCtrl = (function() { //IIFE
    //PRIVATE
    //  Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //  Data Structure / State
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookie', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    //PUBLIC methods return
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(nameInput, caloriesInput) {
            let ID;

            //generate/autoincrement id
            //  Create ID
            if(data.items.length > 0) {
                //grab last item's + 1
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                //create first item id
                ID = 0;
            }

            //  Parse Calories to number
            let calories = parseInt(caloriesInput);

            //  Create new item using Item constructor
            let newItem = new Item(ID, nameInput, calories);

            //  Add to items array
            data.items.push(newItem);
            

            return newItem; // going to use
        },
        getTotalCalories: function() {
            let total = 0;

            //  Loop through items and add cals
            data.items.forEach((item) => {
                total += item.calories;
            });
            
            //  Set total cal in data structure
            data.totalCalories = total;

            return data.totalCalories;
        },
        getItemById: function(id) {
            let found = null;
            //  Loop through items
            data.items.forEach((item) => {
                if(item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function(item) {
            //set data structure prop to item from editbtn
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        updateItem: function(name, calories) {
            //  Calories to number
            calories = parseInt(calories);

            let found = null;

            //  loop items
            data.items.forEach((item) => {
                //  Check id = to item id we clicked editBtn on
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });

            return found;
        },
        logData: function() { //ItemCtrl.logData()
            return data;
        }
    }
})();



//  UI Controller
const UICtrl = (function() { 

    //  UISelectors to replace hard-coded html selectors
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCalorieInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        listItems: '#item-list li'
    }

    //  Public Methods
    return {
        //pass in the getItems() items/data
        populateItemList: function(items) {
            let html = '';

            items.forEach((item) => {
                //  Append lis to html
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `;
            });

            //  Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function() {
            return UISelectors; //return obj var
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCalorieInput).value
            }
        },
        addListItem: function(item) {
            //  Show the List (revert hideList method)
            document.querySelector(UISelectors.itemList).style.display = 'block';

            //  Create li element
            const li = document.createElement('li');
            //  Add class
            li.className = 'collection-item';
            //  Add ID
            li.id = `item-${item.id}`;
            //  Add HTML
            li.innerHTML = `
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            //Insert item
                //beforeend means last item of itemList
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearFormInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCalorieInput).value = '';
            
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UICtrl.clearFormInput();

            //  Hide backBtn, updateBtn, and deleteBtn
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            //  Show addBtn
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        addItemToForm: function() {
            //Adds the current item selected through editbtn into the forms inputs
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalorieInput).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();
        },
        showEditState: function() {
            //  Show backBtn, updateBtn, and deleteBtn
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            //  Hide addBtn
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        updateListItem: function(updatedItem) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //  Convert Node list to arr
            listItems = Array.from(listItems);

            listItems.forEach((listItem) => {
                //  Get id for each item
                const itemId = listItem.getAttribute('id');

                //  Check itemId = id of item passed in
                if(itemId === `item-${updatedItem.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `
                    <strong>${updatedItem.name}:</strong> <em>${updatedItem.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    `;
                }
            });
        }
    }
})();



//  App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) { 
    
    //  Load Intial event isteners function 
    const loadEventListeners = function() {
        //  Get UI Selectors from UICtrl
        const UISelectors = UICtrl.getSelectors(); 

        //  Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //  Disable submit on enter, to prevent submission with enter when in edit state
        document.addEventListener('keypress', function(e) {
            if(e.charCode === 13 || e.keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });


        //  Edit icon click event
        //have to use event delegation, cant add event listener to dynamic edit btn so grab the parent element list
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //  Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    }

    //  Add item submit
    //function expression sets to var
    const itemAddSubmit = function(e) {
        //  Get form input from UICtrl
        const input = UICtrl.getItemInput();

        //  Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            //  Add item to Data Structure
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            //  Add item to UI list
            UICtrl.addListItem(newItem);

            //  Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //  Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //  Clear form input
            UICtrl.clearFormInput();
        }

        e.preventDefault();
    }

    //  Click item editBtn 
    const itemEditClick = function(e) {
        //have to use event delegation, cant add event listener to dynamic edit btn so grab the parent element list
        if(e.target.classList.contains('edit-item')) {
            //  Get list item id ("item-0" etc.)
            //parentNode = atag, parentNode = li, id of li
            const listId = e.target.parentNode.parentNode.id;
            console.log(listId);

            //  Break into an array 
            //split by the -
            const listIdArr = listId.split('-');
            console.log(listIdArr); //['item', '0']

            //  Get the actual id
            const id = parseInt(listIdArr[1]);

            //  Get item with id
            const itemToEdit = ItemCtrl.getItemById(id);
            console.log(itemToEdit); //item obj

            //  Set current item 
            ItemCtrl.setCurrentItem(itemToEdit);

            //  Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault()
    }

    //  Update Item Submit
    const itemUpdateSubmit = function(e) {
        //  Get item input
        const input = UICtrl.getItemInput();

        //  Update item in data Structure
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        //  Update UI
        UICtrl.updateListItem(updatedItem);

        //  Update total calories
        //  Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //  Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();

        e.preventDefault();       
    }

    //  Public methods
    return {
        init: function() {
            console.log('Initializing App...');

            //  Clear edit state / set initial state
            UICtrl.clearEditState();

            //  Fetch items from data structure
            //set returned data to items
            const items = ItemCtrl.getItems();

            //  Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {   
                //  Populate list with items
                UICtrl.populateItemList(items);
            }

            //  Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //  Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //  Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);



//  Intialize App
AppCtrl.init();
