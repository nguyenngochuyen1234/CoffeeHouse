import Blog from "../features/Home/Blog"
import Footer from "../features/Home/Footer"
import HeaderNav from "../features/Home/HeaderNav"
import HeaderSlider from "../features/Home/HeaderSlider"
import Introduce from "../features/Home/Introduce"
import MenuList from "../features/Home/MenuList"

export interface Home { }
const Home = (props: Home) => {
    return (
        <>
            <HeaderNav />
            <HeaderSlider />
            <MenuList />
            <Introduce />
            <Blog />
            <Footer />
        </>
    )
}

export default Home