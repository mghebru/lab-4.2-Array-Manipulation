
//Create an empty array called shoppingList
let shoppingList = [];

//addItem function that takes item as parameter and adds to shopping list array
//(Task 2: Modified to prevent duplicates)
function addItem(item) {
    // Check if item already exists in the array (case-insensitive)
    const itemExists = shoppingList.some(
        (existingItem) => existingItem.toLowerCase() === item.toLowerCase()
    );
    //if items exists send message to user and do not add item
    if (itemExists) {
        console.log(`"${item}" is already in the shopping list. Item not added.`);
        return false;
    } else {
        //if new item, add to list
        shoppingList.push(item);
        console.log(`Added "${item}" to the shopping list.`);
        return true;
    }
}

//remove last item from array
function removeLastItem() {
    const removedItem = shoppingList.pop();
    console.log(`"${removedItem}" has been removed from the shopping list.`);
    return removedItem;
}

//display all list items
function displayList() {
    console.log("Shopping List:");
    shoppingList.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
    });
}

//(task 2) function to filter items based on search(case insesitive)
function filterItems(searchTerm) {
    //check for matching item
    const filteredItems = shoppingList.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length == 0) {
        console.log(`No items found containing "${searchTerm}".`);
    } else {
        console.log(`Items containing "${searchTerm}":`);
        filteredItems.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }

    return filteredItems;
}

//(task 3) DOM manipulation functions for browser interface
//function to update list in browser
function updateDisplayedList() {
    //connect to html element
    const listDisplay = document.getElementById("shoppingListDisplay");
    //check if shopping list is empty
    if (shoppingList.length == 0) {
        listDisplay.innerHTML =
            '<div class="empty-message">Your Shopping list is empty. Add some items!</div>';
        return;
    }
    //display list in browser
    const listHTML = "<ul>" + shoppingList.map((item) => `<li>${item}</li>`).join("") + "</ul>";
    listDisplay.innerHTML = listHTML;
}


//function to add item from input field and update display
function addItemToList() {
    //get input field and its value
    const itemInput = document.getElementById("itemInput");
    const item = itemInput.value.trim();
    //check if input is empty
    if (item === "") {
        showMessage("Please enter an item name.", "error");
        return;
    }
    //calls addItem function
    const wasAdded = addItem(item);

    if (wasAdded) {
        //update html to show new item
        updateDisplayedList();
        itemInput.value = ""; // Clear the input field
    } else {
        showMessage(`"${item}" is already in your shopping list.`, "error");
    }
}

//function to remove last item and update list
function removeLastItemFromList() {
    const removedItem = removeLastItem();
    //check list for item and remove if found
    if (removedItem) {
        showMessage(`Removed "${removedItem}" from your shopping list.`, "info");
        updateDisplayedList();  //update list
    }
    //error message if list is emtpy
    showMessage("Your shopping list is empty. Nothing to remove.", "error");
}

//function to search and display filtered results
function searchItems() {
    //get search input element
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim();
    //error message if no input
    if (searchTerm === "") {
        showMessage("Please enter a search term.", "error");
        return;
    }
    //get full list and item to be searched
    const filteredItems = filterItems(searchTerm);
    const listDisplay = document.getElementById("shoppingListDisplay");
    //no match message
    if (filteredItems.length == 0) {
        showMessage(`No items found containing "${searchTerm}".`, "info");
        // Show the full list again
        updateDisplayedList();
    }
    // Display filtered results
    const listHTML =
        "<ul>" +
        filteredItems
            .map((item, index) => `<li>${index + 1}. ${item}</li>`)
            .join("") +
        "</ul>";
    listDisplay.innerHTML =
        `<h3>Search Results for "${searchTerm}":</h3>` + listHTML;
}


// // Example usage:
// addItem("Milk");
// addItem("Bread");
// addItem("Eggs");
// displayList();
// removeLastItem();
// displayList();