import React from "react"

export interface ButtonProductProps {
    name: string
    price: number
    type: string
    clickOption: (type:string, name:string) => void
    checked: boolean
}
export const ButtonProduct: React.FC<ButtonProductProps> = ({ name, price, type, checked, clickOption }) => {

    return (
        <div className='border-[#c9c9c9] cursor-pointer text-[17px] inline-block border-[1px] rounded-[5px] h-[46px] px-5' style={{ backgroundColor: `${checked ? '#e57905' : '#fff'}`, color: `${checked ? '#fff' : '#666'}` }} onClick={()=>clickOption(type, name)}>
            <div className='h-10 flex justify-center items-center'>
                {name == "Nhỏ" && <img className='h-5 w-5' src="https://vectorified.com/images/boba-tea-icon-1.png" alt="" />}
                {name == "Vừa" && <img className='h-6 w-6' src="https://vectorified.com/images/boba-tea-icon-1.png" alt="" />}
                {name == "Lớn" && <img className='h-7 w-7' src="https://vectorified.com/images/boba-tea-icon-1.png" alt="" />}
                {name} + {price} đ
            </div>
        </div>)
}
