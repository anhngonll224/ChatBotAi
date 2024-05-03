
import { Empty } from "antd"
import styled from "styled-components"

const Styles = styled.div`
  .konvajs-content[role="presentation"] {
    height: 330px !important;
  }
`

const ImageEditor = ({ file }) => {
  // const handleImageCompression = async url => {
  //   try {
  //     // Step 1: Download the image from the URL
  //     const options = {
  //       url: url,
  //       dest: "C:\\Users\\ADMIN\\Downloads", // Temporary directory to store the downloaded image
  //     }
  //     const { filename } = await imageDownloader.image(options)
  //     // Step 2: Compress the downloaded image
  //     const compressedImage = await imageCompression.getFilefromURL(filename, {
  //       maxWidthOrHeight: 800, // Adjust this value as per your requirement
  //       maxSizeMB: 1, // Maximum size in MB after compression
  //     })
  //     // You can now use the compressedImage in your application (e.g., upload to a server, display in the UI, etc.)
  //     console.log(compressedImage)
  //   } catch (error) {
  //     console.error("Error:", error)
  //   }
  // }
  return (
    <Styles>
      {file?.FileUrl ? (
        <>

          {/* <Button onClick={() => handleImageCompression(file?.FileUrl)}>
            Nén ảnh
          </Button> */}
        </>
      ) : (
        <Empty description="Không có ảnh!" />
      )}
    </Styles>
  )
}
export default ImageEditor
