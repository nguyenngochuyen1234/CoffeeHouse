import { newsRow } from "@/models";

export const navigatePageBlog = (blog: newsRow, data: newsRow[]) => {
    let indexBlog = data.findIndex(item => item.News_ID == blog.News_ID)
    let indexPrevBlog = indexBlog - 1 >= 0 ? indexBlog - 1 : null
    let indexNextBlog = indexBlog + 1 < data.length ? indexBlog + 1 : null
    let prevBlog = indexPrevBlog ? data[indexPrevBlog] : null
    let nextBlog = indexNextBlog ? data[indexNextBlog] : null
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