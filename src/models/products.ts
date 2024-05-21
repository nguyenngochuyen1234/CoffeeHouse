export interface typeProducts {
  Menu_ID: string,
  Name_Menu: string,
  TypeProduct_Name: string,
  TypeProduct_ID: string,
  TypeProduct_Img: string,
}

export interface typeProductsRows {
  Menu_ID: string,
  Name_Menu: string,
  key: string;
  TypeProduct_ID: string;
  TypeProduct_Name: string;
  TypeProduct_Img: string;
}

export interface products {
  Menu_ID: string,
  Name_Menu: string,
  idProduct: string;
  TypeProduct_Name: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: number;
  TypeProduct_ID: string;
  Product_Description: string;
}

export interface productsRow {
  Menu_ID: string,
  Name_Menu: string,
  key: string;
  idProduct: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: number;
  TypeProduct_ID: string;
  Product_Description: string;
}


export interface optionsProduct {
  name: string
  price: number
  checked: boolean
}