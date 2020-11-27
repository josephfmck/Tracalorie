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
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
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

            //  Create new Item
            let newItem = new Item(ID, nameInput, calories);

            //  Add to items array
            data.items.push(newItem);
            

            return newItem; // going to use
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
        itemCalorieInput: '#item-calories'
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
    }

    //  Add item submit
    //function expression sets to var
    const itemAddSubmit = function(e) {
        //  Get form input from UICtrl
        const input = UICtrl.getItemInput();

        //  Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            //  Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
        }

        e.preventDefault();
    }

    //  Public methods
    return {
        init: function() {
            console.log('Initializing App...');

            //  Fetch items from data structure
            //set returned data to items
            const items = ItemCtrl.getItems();
            console.log(items);

            //  Populate list with items
            UICtrl.populateItemList(items);

            //  Load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);



//  Intialize App
AppCtrl.init();
