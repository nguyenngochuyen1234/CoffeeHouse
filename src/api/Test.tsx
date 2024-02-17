import React from 'react'
import { newsFakeApi } from './newsFakeApi'

const Test = () => {
  let data = newsFakeApi.map(item => {
    return `INSERT INTO news (News_ID, News_Title, News_Time, News_Image, News_Description, TypeNews_ID, News_Content) VALUES ('${item.News_ID}', '${item.News_Title}','${item.time}','${item.News_Image}', '${item.News_Description}', ${item.TypeNews_ID}, '${item.News_Content}')`
  })
  console.log(data.join(''))
  return (
    <div>Test</div>
  )
}

export default Test