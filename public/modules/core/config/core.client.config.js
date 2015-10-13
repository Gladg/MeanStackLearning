'use strict';
// Configuring the Core module
angular.module('core').run(['Menus',
	function(Menus) {
		// Set top bar menu items
    
      Menus.addMenuItem('topbar', 'List Of Values', 'listofvalues', 'dropdown');
      Menus.addSubMenuItem('topbar', 'listofvalues', 'Customers', 'customers');
      Menus.addSubMenuItem('topbar', 'listofvalues', 'Suppliers', 'suppliers');
      Menus.addSubMenuItem('topbar', 'listofvalues', 'Products', 'products');
      Menus.addSubMenuItem('topbar', 'listofvalues', 'Categories', 'categories');
      Menus.addSubMenuItem('topbar', 'listofvalues', 'Expense Types', 'expense-types');
      Menus.addSubMenuItem('topbar', 'listofvalues', 'General Ledgers', 'general-ledgers');
      
      Menus.addMenuItem('topbar', 'Transactions', 'transactions', 'dropdown');
      Menus.addSubMenuItem('topbar', 'transactions', 'Purchases', 'purchases');
      Menus.addSubMenuItem('topbar', 'transactions', 'Sales', 'sales');
      Menus.addSubMenuItem('topbar', 'transactions', 'Expenses', 'expenses');
      Menus.addSubMenuItem('topbar', 'transactions', 'Inventories', 'inventories');
      Menus.addSubMenuItem('topbar', 'transactions', 'Price Lists', 'price-lists');
      Menus.addSubMenuItem('topbar', 'transactions', 'Journal Vouchers', 'journal-vouchers');
      
	}
]);