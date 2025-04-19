document.addEventListener('DOMContentLoaded', function() {
    let data = [];
    let currentId = 1;
    let updateIndex = -1; // To track the index of the item being updated

    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const taxesInput = document.getElementById('taxes');
    const adsInput = document.getElementById('ads');
    const discountInput = document.getElementById('discount');
    const totalInput = document.getElementById('total');
    const countInput = document.getElementById('count');
    const categoryInput = document.getElementById('category');
    const createBtn = document.getElementById('create-btn');
    const searchTitleInput = document.getElementById('search-title');
    const searchCategoryInput = document.getElementById('search-category');
    const searchByTitleBtn = document.getElementById('search-by-title-btn');
    const searchByCategoryBtn = document.getElementById('search-by-category-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const itemCountSpan = document.getElementById('item-count');
    const dataTableBody = document.getElementById('data-table');

    function calculateTotal() {
        const price = parseFloat(priceInput.value) || 0;
        const taxes = parseFloat(taxesInput.value) || 0;
        const ads = parseFloat(adsInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;
        totalInput.value = (price + taxes + ads - discount).toFixed(2);
    }

    priceInput.addEventListener('input', calculateTotal);
    taxesInput.addEventListener('input', calculateTotal);
    adsInput.addEventListener('input', calculateTotal);
    discountInput.addEventListener('input', calculateTotal);

    function addItem() {
        const title = titleInput.value.trim();
        const price = parseFloat(priceInput.value);
        const taxes = parseFloat(taxesInput.value);
        const ads = parseFloat(adsInput.value);
        const discount = parseFloat(discountInput.value);
        const total = parseFloat(totalInput.value);
        const count = parseInt(countInput.value);
        const category = categoryInput.value.trim();

        if (title && !isNaN(price) && !isNaN(taxes) && !isNaN(ads) && !isNaN(discount) && !isNaN(count) && category) {
            if (updateIndex === -1) {
                for (let i = 0; i < count; i++) {
                    data.push({ id: currentId++, title, price, taxes, ads, discount, total, category });
                }
            } else {
                data[updateIndex] = { ...data[updateIndex], title, price, taxes, ads, discount, total, category };
                updateIndex = -1;
                createBtn.textContent = 'Create';
            }
            clearInputs();
            renderTable(data);
        } else {
            alert('Please fill in all fields correctly.');
        }
    }

    function clearInputs() {
        titleInput.value = '';
        priceInput.value = '';
        taxesInput.value = '';
        adsInput.value = '';
        discountInput.value = '';
        totalInput.value = '0';
        countInput.value = '1';
        categoryInput.value = '';
    }

    function renderTable(items) {
        dataTableBody.innerHTML = '';
        items.forEach(item => {
            const row = dataTableBody.insertRow();
            row.insertCell().textContent = item.id;
            row.insertCell().textContent = item.title;
            row.insertCell().textContent = item.price;
            row.insertCell().textContent = item.taxes;
            row.insertCell().textContent = item.ads;
            row.insertCell().textContent = item.discount;
            row.insertCell().textContent = item.total;
            row.insertCell().textContent = item.category;

            const updateCell = row.insertCell();
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('action-buttons');
            updateButton.addEventListener('click', () => populateForUpdate(item.id));
            updateCell.appendChild(updateButton);

            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('action-buttons');
            deleteButton.addEventListener('click', () => deleteItem(item.id));
            deleteCell.appendChild(deleteButton);
        });
        itemCountSpan.textContent = data.length;
    }

    function populateForUpdate(id) {
        const itemToUpdate = data.find(item => item.id === id);
        if (itemToUpdate) {
            titleInput.value = itemToUpdate.title;
            priceInput.value = itemToUpdate.price;
            taxesInput.value = itemToUpdate.taxes;
            adsInput.value = itemToUpdate.ads;
            discountInput.value = itemToUpdate.discount;
            totalInput.value = itemToUpdate.total;
            categoryInput.value = itemToUpdate.category;
            countInput.value = 1; // Reset count for update
            updateIndex = data.findIndex(item => item.id === id);
            createBtn.textContent = 'Update Item';
        }
    }

    function deleteItem(id) {
        data = data.filter(item => item.id !== id);
        renderTable(data);
    }

    function searchByTitle() {
        const searchTerm = searchTitleInput.value.trim().toLowerCase();
        const searchResults = data.filter(item => item.title.toLowerCase().includes(searchTerm));
        renderTable(searchResults);
    }

    function searchByCategory() {
        const searchTerm = searchCategoryInput.value.trim().toLowerCase();
        const searchResults = data.filter(item => item.category.toLowerCase().includes(searchTerm));
        renderTable(searchResults);
    }

    function deleteAllItems() {
        if (confirm('Are you sure you want to delete all items?')) {
            data = [];
            renderTable(data);
        }
    }

    createBtn.addEventListener('click', addItem);
    searchByTitleBtn.addEventListener('click', searchByTitle);
    searchByCategoryBtn.addEventListener('click', searchByCategory);
    deleteAllBtn.addEventListener('click', deleteAllItems);

    // Initial render
    renderTable(data);
});