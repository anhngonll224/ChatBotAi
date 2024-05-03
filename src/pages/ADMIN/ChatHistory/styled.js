import styled from "styled-components"

export const ChatHistoryStyle = styled.div`
.ant-input-affix-wrapper{
  padding: 4px 11px;
}
.InputContainer {
  width: 210px;
  height: 50px;
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, rgb(179, 163, 212),  rgb(119 195 232));
  /* linear-gradient(rgb(179, 163, 212), rgb(119 195 232)) */
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.075);
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);

}

.input {
  width: 160px; /* Giảm chiều rộng của input để tạo không gian cho icon */
  height: 40px;
  border: none;
  outline: none;
  caret-color:black;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  padding-left: 15px;
  letter-spacing: 0.8px;
  color: rgb(19, 19, 19);
  font-size: 13.4px;
  margin: 0px 5px;
}
/* .input:active {
  transform: scale(0.95);

} */
.InputContainer:active{
  transform: scale(0.95);

}

.searchIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6600;
  color: #fff;
  width: 50px; /* Kích thước của icon */
  height: 40px;
  border-radius: 0 30px 30px 0; /* Định dạng đường viền của icon */
  cursor: pointer;
}
 
.customIcon {
    font-size: 24px;
    color: rgb(18 101 198);
}

.custom-range-picker {
  width: 100%; /* Đặt chiều rộng cho RangePicker */
}

.custom-range-picker .ant-picker-input {
  border-radius: 20px; /* Đặt đường viền cong cho input */
}

.custom-range-picker .ant-picker-range-separator {
  color: #1890ff; /* Màu của dấu phân cách giữa ngày bắt đầu và kết thúc */
}

.custom-range-picker .ant-picker-panel {
  border-radius: 20px; /* Đặt đường viền cong cho panel chọn ngày */
}

.custom-range-picker .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-disabled) {
  background: #f0f0f0; /* Màu nền khi hover vào một ngày */
}

`

