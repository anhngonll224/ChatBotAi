import styled from "styled-components"

export const StyleMyAccount = styled.div`
  background: #fff;
  padding-top: 24px;
  .money-now {
    font-size: 18px;
    font-weight: bold;
    color: #ff4d4f;
  }
  .btn-save {
    height: 56px !important;
    border-radius: 4px !important;

    padding: 18px 50px;
  }
  .btn-changepass {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: red;
    font-weight: 600;
    font-size: 12px;
  }
  .pass-info {
    display: flex;
    gap: 18px;
  }
  .my-account-title {
    display: flex;
    align-items: center;
    gap: 20px;
    .title-info {
      font-weight: 600;
      font-size: 24px;
      color: #154398;
    }
    .ant-btn {
      height: 42px !important;
      width: 127px !important;
      background: #ffffff;
      border: 1px solid #154398;
      border-radius: 4px !important;
      font-weight: 600;
      font-size: 16px;
      color: #154398;
    }
  }
  .field-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    color: #212529;
  }
  .div-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-left: 1px solid #dddddd;
    height: 100%;
  }
  .wrap-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.4);
    margin-bottom: 12px;
  }
  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .ant-upload-list {
    display: none;
  }
  .upload-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    gap: 18px;

    .sign-button-upload {
      border-radius: 4px;
      height: 39px !important;
      padding: 2px;
      border: 1px dashed #e1e1e1;

      .sign-text-upload {
        font-weight: 600;
        font-size: 12px;
        color: #154398;
      }
      .sign-background-upload {
        background: #f7f7f7;
        border-radius: 4px;
        height: 32px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 14px;
      }
      :hover {
        border: 1px solid #154398;
        background-color: #154398;
        svg {
          fill: #fff;
        }
        .sign-background-upload {
          background-color: transparent;
          border: 1px dashed transparent;
        }
        .sign-text-upload {
          color: #fff;
        }
      }
    }
  }
  .sign-text {
    font-size: 12px;
    margin-top: 16px;
    line-height: 120%;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
  }
  .boxAccount{
    /* height: 100%; */
    justify-content: center;
  }
  
  .btn_avatar{
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  .field-title {
  font-weight: bold;
}


.color-red {
  color: red;
  font-weight: bold;
}
.custom-pointer{
  cursor: pointer;
}

.password-description {
  /* Thêm kiểu dáng cho phần mô tả mật khẩu */
  color: #333; /* Màu chữ */
  justify-content: center;
  align-items: center;
}

 
`
export const StyleModalAccount = styled.div`
/* .avatarEdit .ant-form-item-label > label::after {
  display: none !important;
} */
.ant-modal-header:after {
    background-image: -ms-linear-gradient(0deg,#154398 0,#ee1d23 100%);
    background-image: linear-gradient(90deg,#154398,#e4353a);
    bottom: -3px;
    content: "";
    display: block;
    height: 5px;
    left: 0;
    position: absolute;
    transition: .3s;
    width: 100%;
    width: 100px;
    z-index: 10;
}
.ant-form-vertical .ant-form-item-label{
  width: 100% !important;
    justify-content: center !important;
    display: flex !important;
}
.avatarEdit{
display: flex;
justify-content: center;

}
 /* .avatarEdit >label::after{
display: none !important;
} */
.ant-modal .ant-modal-footer {
  padding-bottom: 15px;
}
.ant-modal .ant-modal-close{
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.ant-upload-hint{
  color: blue !important;
}

`
export const StyleModalEditPassWordFirst = styled.div`

.ant-modal .ant-modal-footer {
  padding-bottom: 15px;
}
.ant-modal .ant-modal-close{
  background-color: rgba(0, 0, 0, 0.3) !important;
}

`
