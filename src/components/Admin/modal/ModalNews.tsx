import React, { useState, useEffect } from 'react';
import { Select, Modal, Form, Input, Upload, Button, message, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import typeNewsApi from '@/api/typeNewsApi';
import ReactQuill from "react-quill";
import { newsRow, typeNews } from '@/models';
import { AnyObject } from 'antd/es/_util/type';
import newsApi from '@/api/newsApi';


const modules = () => ({
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image', 'video']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
});
export interface ModalNewsProps {
    isModalOpen: boolean
    setIsModalOpen: (newValue: boolean) => void
    setDataSource: React.Dispatch<React.SetStateAction<newsRow[]>>
    dataRow: AnyObject | null
}
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 25 },
};

const ModalNews: React.FC<ModalNewsProps> = ({ isModalOpen, setIsModalOpen, setDataSource, dataRow }) => {
    const [NewsImage, setNewsImage] = useState('')
    const props = {

        action: 'http://localhost:8800/api/upload',
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setNewsImage(info.file.response.filename)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [dataNews, setDataNews] = useState("")
    const [typeNews, setTypeNews] = useState<typeNews[]>([])
    const onChangeValue = (value: string) => {
        setDataNews(value)

    };
    const formats = [
        'header', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'color', 'background', 'align',
        'link', 'image', 'video'
    ];

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    useEffect(() => {
        if (dataRow) {
            setDataNews(dataRow.News_Content)
            setNewsImage(dataRow.News_Image)
            form.setFieldsValue({
                TypeNews_Name: dataRow.TypeNews_Name || '',
            });
        }
    }, [dataRow, form]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await typeNewsApi.getAllTypeNews()
                if (response?.data) {
                    setTypeNews(response.data)
                }
                console.log({ response })
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, [])

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            let data = {
                ...values,
                News_Image: NewsImage,
            }
            if(dataRow?.News_ID){
                console.log({data})
            }else{
                await newsApi.AddNews(data)
            }

            setIsModalOpen(false)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title={!dataRow?.News_ID ? "Thêm tin tức" : "Sửa tin tức"}
                open={isModalOpen}
                onOk={onCheck}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={800}
            >
                <Form form={form} initialValues={{ News_Title: dataRow?.News_Title || '', TypeNews_Name:1, News_Description: dataRow?.News_Description || '', News_Content: dataRow?.News_Content || '', }} name="dynamic_rule" style={{ maxWidth: 800 }}>


                    <Form.Item
                        {...formItemLayout}
                        label="Chủ đề"
                        name="TypeNews_Name"
                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Select>
                            {typeNews?.map(item => <Select.Option key={item.TypeNews_ID} value={item.TypeNews_ID}>{item.TypeNews_Name}</Select.Option>)}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="News_Title"
                        label="Tên tiêu đề"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập tên tiêu đề" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="News_Description"
                        label="Mô tả"

                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>



                    <Form.Item
                        {...formItemLayout}
                        name="News_Image"
                        label="Ảnh tiêu đề"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <Upload listType="picture" name='image' defaultFileList={[{
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: dataRow?.News_Image || '',
                        }]} maxCount={1} {...props}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>





                    <Form.Item
                        {...{
                            labelCol: { span: 3 },
                            wrapperCol: { span: 25 }
                        }}
                        className='w-[100%]'
                        name="News_Content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập' }]}
                    >
                        <ReactQuill
                            theme={"snow"}
                            onChange={onChangeValue}
                            value={dataNews}
                            modules={modules()}
                            formats={formats}
                            bounds={".post"}
                        />
                    </Form.Item>

                </Form>
            </Modal >
        </>
    );
};

export default ModalNews;