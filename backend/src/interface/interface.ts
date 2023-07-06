export interface Customer {
  first_name: string;
  user_name: string;
  email: string;
  password: string;
}

export interface ICustomer {
  id: string;
}


export interface Order {
  order_number: string;
  first_name: string; 
  price: string; 
  product_name: string;
  quantity: string;
  total: string;
  email: string;
}

export interface IOrder {
  id: string;
}

export interface Product {
  product_name: string;
  price: string; 
  quantity: string;
  description: string; 
}

export interface IProduct {
  id: string;
}

export interface Admin {
  user_name: string;
  password: string;
}

export interface IAdmin {
  id: string;
}

export interface Adminlogin {
  user_name: string;
  password: string;
}

export interface IAdminlogin {
  id: string;
}
