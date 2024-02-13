import Footer from "../features/Home/Footer"
import HeaderNav from "../features/Home/HeaderNav"
import BodyHome from "./BodyHome"
import { Outlet } from "react-router-dom"

export interface Home { }


const Home = (props: Home) => {
    return (
        <>
            <HeaderNav />
            <Outlet />
            <Footer />
        </>
    )
}

export default Home