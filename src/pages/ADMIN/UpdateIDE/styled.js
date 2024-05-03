import styled from "styled-components"

export const StyleUpdateIDE = styled.div`
.ant-form-item{
    margin-bottom: 0px !important;
} 
.text-title{
    color: rgb(21, 67, 152);
    font-weight: 600;
    font-size: 24px;
    margin-top: 20px;
}
@keyframes shrinkAndExpand {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.copy-icon-clicked {
  animation: shrinkAndExpand 0.5s ease-in-out forwards;
  opacity: 0.7;
}

.copy-icon-clicked:hover {
  cursor: pointer;
}
   
`
