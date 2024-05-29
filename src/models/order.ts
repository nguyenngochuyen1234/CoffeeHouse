export interface Toppings {
    Topping_Addition_Name: string,
    Topping_Addition_Price: number
}

export interface orderDetails{
    idProduct:string, 
    Order_Size:string,
    Order_Quantity:number,
    Toppings:Toppings[]
}

export interface orderDetailsProduct{
    idProduct:string, 
    Order_Size:string,
    Order_Quantity:number,
    Toppings:Toppings[],
    Product_Name:string,
    Product_Price:number,
    total:number,
    Order_ID:string,
    Order_Detail_ID:string
}

