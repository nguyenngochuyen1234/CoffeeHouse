import { newsFakeApi } from "@/api/newsFakeApi";
import { newsRow } from "@/models";

export const navigatePageBlog = (blog: newsRow ) => {
    let indexBlog = newsFakeApi.findIndex(item => item.key == blog.key)
    let indexPrevBlog = indexBlog - 1 >= 0 ? indexBlog - 1 : null
    let indexNextBlog = indexBlog + 1 < newsFakeApi.length ? indexBlog + 1 : null
    let prevBlog = indexPrevBlog ? newsFakeApi[indexPrevBlog] : null
    let nextBlog = indexNextBlog ? newsFakeApi[indexNextBlog] : null
    return {
        prevBlog: prevBlog ? {
            idNews: prevBlog.News_ID,
            typeNews: prevBlog.TypeNews_Name
        } : null,
        nextBlog: nextBlog ? {
            idNews: nextBlog.News_ID,
            typeNews: nextBlog.TypeNews_Name
        } : null,
    }
}