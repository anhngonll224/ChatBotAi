import styled from "styled-components"

export const StyleLoginPage = styled.div`
  min-height: calc(100vh - 155px);
  display: flex;
  justify-content: center;
  .content-wrap {
    margin-top: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.1);
    padding: 24px;
    width: 1000px;
    height: fit-content;
  }
  .btn-login {
    width: 100%;
  }
  .title-form {
    text-transform: uppercase;
    color: ${({ theme }) => theme["primary-color"]};
  }
  .border-right-form {
    border-right: 2px solid ${({ theme }) => theme["primary-color"]};
  }
  .forget-pass{
    justify-content: end;
    align-items: center;
    display: flex;
    cursor: pointer;
    color:  rgb(36, 118, 226);;
  }
`

export const StyleModalForgePass = styled.div`
  .boxMainLogin {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .ant-form-item {
    /* Các quy tắc cho ant-form-item */
  }

  .colorRead {
    color: red;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
}
`
export const StyleModalConFirmationCode = styled.div`
 .ant-form-item {
    margin-bottom: 0px !important;
}

`
