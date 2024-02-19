export interface typeProducts {
  TypeProduct_Name: string,
  TypeProduct_ID: number,
  TypeProduct_Img: string,
}

export interface typeProductsRows {
  key: number;
  TypeProduct_ID: string;
  TypeProduct_Name: string;
  TypeProduct_Img: string;
}

export interface products {
  idProduct: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: string; 
  TypeProduct_ID: number;
  Product_Description: string;
}

export interface productsRow {
  key: number;
  idProduct: string;
  Product_Name: string;
  Product_Image: string;
  Product_Price: string;
  TypeProduct_ID: number;
  Product_Description: string;
}
