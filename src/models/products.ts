export interface typeProducts {
  TypeProduct_Name: string,
  TypeProduct_ID: string,
  TypeProduct_Img: string,
}

export interface typeProductsRows {
  key: string;
  TypeProduct_ID: string;
  TypeProduct_Name: string;
  TypeProduct_Img: string;
}

export interface products {
  idProduct: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: number; 
  TypeProduct_ID: string;
  Product_Description: string;
}

export interface productsRow {
  key: string;
  idProduct: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: number;
  TypeProduct_ID: string;
  Product_Description: string;
}
