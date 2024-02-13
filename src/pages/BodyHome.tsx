import React from 'react'
import Blog from "../features/Home/Blog"
import HeaderSlider from "../features/Home/HeaderSlider"
import Introduce from "../features/Home/Introduce"
import MenuList from "../features/Home/MenuList"
const BodyHome = () => {
    return (
        <>
            <HeaderSlider />
            <MenuList />
            <Introduce />
            <Blog />
        </>
    )
}

export default BodyHome