import styled from "styled-components"
import { Modal } from "antd"

export const ModalWrapper = styled(Modal)`
  .ant-modal .ant-modal-header {
    background-color: ${props => (props.isError ? "red" : "#d3f7ff")};
  }

  .ant-modal-body {
    flex: auto;
    overflow: ${props => (props.hiddenScroll ? "hidden" : "hidden auto")};
    padding: 10px;
  }
  .ant-image.css-dev-only-do-not-override-1mqg3i0 {
    width: 100%;
  }
  .ant-modal-header::after {
  content: "";
  margin-left: 0px;
  background-image: -ms-linear-gradient(0deg, #154398 0, #ee1d23 100%);
  /* background-image: linear-gradient(89.98deg, #6E5CFF 0,39% ,#e3135e 99.99%); */
  display: block;
  height: 5px;
  width: 100%;
  position: absolute;
  bottom: -3px;
  left: 0px;
  width: 100px;
  transition: 0.3s;
  /* background-image: linear-gradient(90deg, #154398 0%, #e4353a 100%); */
  z-index: 10;
}
`
