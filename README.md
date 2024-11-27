# Playwright Test Report

[View the Report Here](https://lucasa01m.github.io/individual-project/)

---

## Plan of Test Implementation

### **Environment Preparation**
- **GitHub Connection**: ✅ *Done*
- **Divide Tests into Types**: ✅ *Done*
- **Define Gherkin Statements for Each Scenario**: ✅ *Done*
- **Define Fixtures for Each Type**: ✅ *Done*

### **Implementation**
- Write Fixtures
- Write Tests

---

## Scenario Types

### **Logging In**: ✅ *Completed*

#### **Scenario #1**
**Description**: User should be able to log in with standard user given the correct credentials.  
- **Given**: User is on the starting page ([https://www.saucedemo.com/](https://www.saucedemo.com/))  
- **When**: User enters the credentials for a standard user and attempts to log in  
- **Then**: User should be redirected to the inventory/products page ([https://www.saucedemo.com/inventory.html](https://www.saucedemo.com/inventory.html))

#### **Scenario #2**
**Description**: User should not be able to access the e-shop without logging in.  
- **Given**: User is on the starting page ([https://www.saucedemo.com/](https://www.saucedemo.com/))  
- **When**: User clicks the log in button without entering a username or password  
- **Then**: An error message should appear:  
  - *"Epic sadface: Username is required"* or  
  - *"Epic sadface: Password is required"*

#### **Scenario #2.1**
**Description**: User should not be able to access the e-shop without logging in.  
- **Given**: User tries to access the inventory page directly via URL ([https://www.saucedemo.com/inventory.html](https://www.saucedemo.com/inventory.html))  
- **When**: User visits that page  
- **Then**: User should be redirected to the main page, and an error message should appear:  
  - *"Epic sadface: You can only access '/inventory.html' when you are logged in."*

#### **Scenario #3**
**Description**: Users whose access is denied should not be able to log in.  
- **Given**: User is on the starting page ([https://www.saucedemo.com/](https://www.saucedemo.com/))  
- **When**: User enters incorrect credentials and attempts to log in  
- **Then**: An error message should appear:  
  - *"Epic sadface: Username and password do not match any user in this service"*

#### **Scenario #4**
**Description**: User should be logged out once the logout button is pressed.  
- **Given**: User is logged in on any page  
- **When**: User clicks the logout button in the side menu  
- **Then**: User is redirected to the starting page  

**Fixtures**: None  

---

### **Inventory Page (Main Page, Products Page)**: ✅ *Completed*

#### **Scenario #5**
**Description**: User should be able to filter the inventory according to the selected option.  
- **Given**: User is on the inventory page ([https://www.saucedemo.com/inventory.html](https://www.saucedemo.com/inventory.html))  
- **When**: User selects a filtering option  
- **Then**: Products are displayed accordingly  

#### **Scenario #6**
**Description**: Users should see correct product details such as image, product name, description, and price.  
- **Given**: User is on the inventory page  
- **When**: Products are displayed  
- **Then**: All details should be visible and correct  

**Fixtures**:  
- Correct login and redirection to the inventory page: ✅ *Done*  

---

### **Cart Management**: ✅ *Completed*

#### **Scenario #7**
**Description**: User should see the added product in their cart.  
- **Given**: A product is added to the cart  
- **When**: User clicks the cart button to view the cart  
- **Then**: The product should be visible in the cart  

#### **Scenario #8**
**Description**: The cart icon should update correctly when a product is added.  
- **Given**: User is on a page where a product can be added to the cart  
- **When**: User adds a product  
- **Then**: The cart icon updates accordingly and is visible across all pages  

... *(and so on for scenarios #9 to #12)*  

**Fixtures**:  
- Correct login and redirection to the inventory page  
- Adding a product to the cart *(Not necessary)*  

---

### **Checkout**: ✅ *Completed*

#### **Scenario #13**
**Description**: User should see checkout overview details, including payment, shipping info, and total price.  
- **Given**: Products are in the cart and user is on the "Checkout Overview" page  
- **When**: Checkout information is displayed  
- **Then**: Payment info, shipping info, and total price should be visible  

#### **Scenario #14**
**Description**: Users should be notified when checkout information is missing.  
- **Given**: Products are in the cart and user is on the "Checkout Your Information" page  
- **When**: User submits incomplete shipping info  
- **Then**: An error message is displayed, and there is no redirection

### **Scenario #15**

**Description**: User should be notified after placing a successful order.
- **Given**: Products are in the cart, and the user is on the "Checkout Overview" page
- **When**: User clicks the "Finish" button
- **Then**: User should be redirected to the confirmation page for order placement

---

### **Extra Scenarios**

#### **Scenario #16**  
**Description**: User should be able to return to the Inventory page using the side menu button.  
- **Given**: User is on any page of the website  
- **When**: User clicks the "All Items" button in the side menu  
- **Then**: User should be redirected to the Inventory page  

#### **Scenario #17**  
**Description**: User should be able to access the product page by clicking the product image.  
- **Given**: User is on the Inventory page  
- **When**: User clicks on a product image  
- **Then**: User is redirected to the corresponding product page  

---

## Fixtures Summary
- **Correct Login**: ✅ Done  
- **Correct Redirection to Inventory Page**: ✅ Done  
- **Adding a Product to the Cart**: ✅ Done  

