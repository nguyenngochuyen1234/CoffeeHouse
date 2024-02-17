export interface typeNews {
    TypeNews_Name: string,
    TypeNews_ID: number
}
export interface typeNewsRows {
    key: number;
    TypeNews_ID: string;
    TypeNews_Name: string;
}

export interface news {
    News_ID: string;
    News_Title: string;
    News_Image: string;
    News_Content: string;
    TypeNews_ID: number;
    News_Description: string;
}

export interface newsRow {
    key: string;
    News_ID: string;
    News_Title: string;
    News_Image: string;
    News_Content: string;
    TypeNews_Name: string;
    TypeNews_ID: string;
    News_Description: string;
    time: string;
}

export interface blogsData {
    blogTitle: string;
    blogList: Array<newsRow>
}