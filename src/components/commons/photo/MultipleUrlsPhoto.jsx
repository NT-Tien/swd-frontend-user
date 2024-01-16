import React from 'react'

const MultipleUrlsPhoto = ({imageUrlList}) => {

    // state
    const [imageUrl, setimageUrl] = useState('')


    // func
    const setImageUrlFunc = (index) => {
        if (index < 0) return
        setimageUrl(imageUrlList[index])
    }
  return (
    <>
                <img src={imageUrl} />
    </>
  )
}

export default MultipleUrlsPhoto