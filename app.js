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
        addBtn: '.add-btn'
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
        console.log('Add');

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
