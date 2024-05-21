import {typeProducts, products} from '@/models/products'
export interface menu {
    Name_Menu: string,
    Menu_ID: string,
  }
  
export interface menuRow {
    Name_Menu: string,
    Menu_ID: string,
    key: string,
  }
  
export interface fullMenu {
    Name_Menu: string,
    Menu_ID: string,
    active:boolean,
    typeProducts:typeProducts[]
  }
export interface blockMenuItem {
  title:string,
  products: products[]
}