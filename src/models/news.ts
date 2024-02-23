export interface typeNews {
    TypeNews_Name: string,
    TypeNews_ID: number
}
export interface typeNewsRows {
    key: string;
    TypeNews_ID: string;
    TypeNews_Name: string;
}

export interface news {
    News_ID: string;
    News_Title: string;
    News_Image: string;
    News_Content: string;
    TypeNews_ID: number;
    TypeNews_Name: string;
    News_Description: string;
    time:string
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