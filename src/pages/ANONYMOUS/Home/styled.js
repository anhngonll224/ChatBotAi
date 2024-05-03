import styled from "styled-components"

export const HomeStyled = styled.div`
overflow: hidden;
.ant-affix{
    top: 60px !important;
}
.enable-divider__gradient-top {
    background: linear-gradient(252.85deg,#f99d1c 8.98%,#f99c1c 9.4%,#f4781f 21.71%,#f16221 31.74%,#f05a22 38.17%,#ee1d62 74.89%,#ce0070 86.39%);
    width: 32px;
    height: 4px;
    line-height: 4px;
    margin-bottom: 12px;
    display: inline-block;
}
img.img-banner {
    width: 100%;
    height: 100%;
}
.back-ground-img{
    width: 100%;
    height: 70vh;
    display: block;
    background-size: contain;
    background-position: 50%;
    box-sizing: inherit;
}
.title-back-ground{
    height: 0px;
    width: 1140px;
    margin: 0px auto;
}
.splunk-white{
    color: white;
    font-weight: 600;
}
.splunk-white-content{
    color: white;
}
.container-back-ground{
    position: relative;
    bottom: 45vh;
    width: 45%;
    left: 14%;
    line-height: 1.1;
}
.hd-title-h2{
    font-size: 35px;
}
.hd-title-h1{
    font-size: 55px;
}
.hd-title-p{
    font-size: 18px;
}
.weight-title{
    font-weight: 600;
}
.title-p-text{
    font-size:18px;
    line-height: 140%;
    margin-bottom: 0px;
}
.title-p-text-ul li{
     font-size: 17px;
    line-height: 190%;
}
.title-p-text-ul{
    margin-left: 45px;
}
.note-back-ground{
    background-color: #F0F3F7;
}
.sp-btn-pink{
    color: #ce0070;
}
.splunk-btn.sp-btn-borderless:not(.multiline) {
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 0% 75%;
    background-repeat: no-repeat;
    background-size: 0% 1px;
    transition: background-size 0.3s;
    cursor: pointer;
    border-radius: 0;
    background-color: transparent !important;
    border-color: transparent !important;
    font-weight: 700 !important;
    white-space: unset;
    line-height: 100%;
    min-width: auto;
    text-align: left;
    padding: 12px 0px 12px 0 !important;
    border: none;
    margin-top: 1px;
    position: relative;
    cursor: pointer;
    margin: 0;
    font-size: 15px;
    letter-spacing: 0.2px;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.splunk-btn.sp-btn-borderless:not(.multiline):hover{
    text-decoration: none !important;
    outline: none;
    background-size: 100% 1px;
}
.title-icon-text{
    font-weight: 600;
    align-items: center;
    display: flex;
    gap: 20px;
}
.promo-band-text{
    color: #0c1724;
    font-weight: 700;
    padding-right: 10px;
    line-height: 120%;
    font-weight: 600;
    margin: 0; 
    text-align: center;
}
.section-back-ground{
    background-color: #D5DCE5;
    padding: 28px 40px;
}
.splunk-btn {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin: 0;
    padding: 12px 22px 13px;
    min-width: 108px;
    font-size: 15px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0.2px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: 24px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-transition: background-color 0.5s;
    transition: background-color 0.5s;
    white-space: nowrap;
    background-image: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.splunk-btn.sp-btn-hollow.sp-btn-darkGray:active, .splunk-btn.sp-btn-hollow.sp-btn-darkGray:hover {
    background-color: #363c44 !important;
    border-color: #363c44;
    color: #fff;
}
.splunk-btn.sp-btn-hollow.sp-btn-darkGray {
    border-color: #0c1724;
    color: #0c1724;
}
.splunk2-eyebrow{
    padding-bottom: 10px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    color: #656c76;
}
/* anchor */
a.ant-anchor-link-title {
    padding: 8px 2px 0px 2px;
}
.ant-anchor-link.ant-anchor-link-active {
    box-shadow: 0px 3px 20px rgba(12,23,36,0.1);
}
.tab-title{
    font-weight: 700;
    font-size: 21px;
    height: fit-content;
}


.splunk-body{
    font-size: 18px;
    line-height: 140%;
    color: #363c44;
}

.anchor-bottom{
    margin-bottom: 60px;
}
.anchor-top{
    margin-top: 60px;
}
.body-small{
    font-size: 15px;
    font-weight: 400;
    line-height: 1.4em;
    color: #363c44;
}
/* end anchor */
.title-what{
    font-size: 40px;
}
.img-size-section{
    width: 100%;
    height: 70vh
}
.splunk2-h6{
    font-size: 16px;
    font-weight: 700;
    line-height: 110%;
    color: #0c1724;
}
.icon-title-text{
    display: flex;
    justify-content: center;
    align-items: end;
}
.splunk2-h3{
    font-size: 30px;
    font-weight: 700;
    line-height: 110%;
    color: #0c1724;
}
@media (max-width: 768px){
    .container-back-ground{
        width: 100%;
        bottom: 32vh;
    }
    .back-ground-img{
        height: 40vh;
    }
    .hd-title-h2{
        font-size: 25px;
    }
    .hd-title-h1{
        font-size: 35px;
    }
    .hd-title-p{
        font-size: 11px;
    }
    .splunk2-h4{
        font-size: 25px;
    }
    .splunk2-h5{
        font-size: 24px;
    }
    .title-icon-text{
        font-size: 30px;
    }
    .title-what{
        font-size: 26px;
    }
    .title-p-text {
        font-size: 14px;
    }
    .img-size-section{
        height: 30vh
    }
    .splunk2-h3{
        font-size: 24px;
    }
    .splunk2-h6{
        font-size: 14px;
    }
    .icon-title-text{
        display: flex;
        justify-content: start;
        align-items: end;
    }
}
@media (min-width: 768px){
    .splunk2-h5 {
        font-size: 18px;
        font-weight: 600;
    }
    .splunk2-h4{
        font-size: 21px;
    }
}

@media (max-width:1366px){
    .promo-band-text{
        font-size: 19px !important;
    }
}
@media (max-width:1920px){
    .promo-band-text{
    font-size: 26px;
    }
}


`
export const ChatStyled = styled.div`
.spinner {
  position   : absolute;
  top        : 50%;
  left       : 50%;
  width      : 45px;
  height     : 9px;
  margin-left: -22px;
  margin-top : -13px;
  text-align : center;
}

.spinner>div {
  width                      : 9px;
  height                     : 9px;
  background-color           : #dcdcdc;
  border-radius              : 100%;
  display                    : inline-block;
  -webkit-animation          : bouncedelay 1.4s infinite ease-in-out;
  animation                  : bouncedelay 1400ms ease-in-out infinite;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode        : both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay        : -0.32s;
}

.loading-comment {
  overflow   : hidden;
  margin-left: 25px;
  width      : 15%;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay        : -0.16s;
}

@-webkit-keyframes bouncedelay {

  0%,
  80%,
  100% {
    transform        : scale(0);
    -webkit-transform: scale(0);
  }

  40% {
    transform        : scale(1);
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {

  0%,
  80%,
  100% {
    transform        : scale(0);
    -webkit-transform: scale(0);
  }

  40% {
    transform        : scale(1);
    -webkit-transform: scale(1);
  }
}

#container {
  position               : absolute;
  top                    : 0px;
  left                   : 0px;
  width                  : 100%;
  height                 : 100%;
  display                : flex;
  display                : -ms-flexbox;
  justify-content        : space-around;
  -webkit-justify-content: space-around;
  align-items            : center;
  -webkit-align-items    : center;
}

#loading-bubble {
  display                    : flex;
  display                    : -ms-flexbox;
  justify-content            : center;
  -webkit-justify-content    : center;
  align-items                : center;
  -webkit-align-items        : center;
  width                      : auto;
  height                     : auto;
  min-width                  : 73px;
  min-height                 : 40px;
  border-radius              : 5px;
  box-sizing                 : border-box;
  position                   : relative;
  background-color           : #2e66bd;
  -webkit-animation          : message-bounce 2.5s infinite ease-in-out;
  animation                  : message-bounce 2.5s ease-in-out infinite;
  -webkit-animation-fill-mode: both;
  animation-fill-mode        : both;
}

#loading-bubble.grey {
  background-color: #a5b0b5;
}

#loading-bubble.grey:before {
  border-color: transparent #a5b0b5 transparent transparent;
}

#loading-bubble:before {
  display     : block;
  content     : " ";
  width       : 0;
  height      : 0;
  border-style: solid;
  border-width: 8px 8px 8px 0;
  border-color: transparent #2e66bd transparent transparent;
  position    : absolute;
  left        : -7px;
  top         : 13px;
}

#loading-bubble .spinner {
  position   : static !important;
  margin-top : -11px;
  margin-left: 0px;
}

#loading-bubble .spinner div {
  background-color: #fff;
}

@-webkit-keyframes message-bounce {
  0% {
    transform        : scale(0.9);
    -webkit-transform: scale(0.9);
  }

  50% {
    transform        : scale(1.1);
    -webkit-transform: scale(1.1);
  }

  100% {
    transform        : scale(0.9);
    -webkit-transform: scale(0.9);
  }
}

@keyframes message-bounce {
  0% {
    transform        : scale(0.9);
    -webkit-transform: scale(0.9);
  }

  50% {
    transform        : scale(1.1);
    -webkit-transform: scale(1.1);
  }

  100% {
    transform        : scale(0.9);
    -webkit-transform: scale(0.9);
  }
}
.chatbox {
  margin-top: 4%;
  /* left: 35%; */
  height: 300px;
  width: 400px;
  /* border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(119, 119, 119, 0.5); */
}

.middle {
  overflow: auto;
  /* background: #f9fbff; */
  width: 100%;
  opacity: 0.85;
  top: 60px;
  height: 80%;
}

.incoming {
  /* position: absolute; */
  width: 50%;
  height: 100%;
  padding-left: 20px;
}
.bubble{
  width: 60%;
}
.incoming .bubble {
  background: #736e6e;
}

.typing {
  position: absolute;
  top: 67%;
  left: 20px;
}
.typing .bubble {
  background: #eaeaea;
  padding: 8px 13px 9px 13px;
}

.ellipsis {
  width: 5px;
  height: 5px;
  display: inline-block;
  background: #b7b7b7;
  border-radius: 50%;
  animation: bounce 1.3s linear infinite;
}
.bubble {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  color: #f9fbff;
  font-size: 18px;
  padding: 10px 10px 10px 12px;
  border-radius: 20px;
}

.lower {
  margin-top: 45px;
}

.outgoing {
  /* position: absolute; */
  padding-right: 20px;
  /* right: 0;
  top: 15%; */
  width: 50%;
  height: 100%;
  margin-bottom: 30px;
}
.outgoing .bubble {
  background: black;
  float: right;
}

.bottom-bar {
  width: 100%;
  height: 55px;
  bottom: 0;
  border-radius: 0 0 10px 10px;
}

.left {
  left: 0px;
}

input {
  padding: 7px;
  background: #f9fbff;
  color: #4FA5D8;
}

input::placeholder {
  color: #4FA5D8;
}

input:focus {
  color: #777777;
  outline: 0;
}

button {
  /* position: absolute; */
  border: 0;
  font-size: 1.5em;
  color: #4FA5D8;
  /* top: 19px; */
  opacity: 0.8;
  right: 17px;
  cursor: pointer;
  outline: 0;
  background-color: white;
}
button:hover {
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
  color: #4FA5D8;
}

@keyframes bounce {
  30% {
    transform: translateY(-2px);
  }
  60% {
    transform: translateY(0px);
  }
  80% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
    opacity: 0.5;
  }
}


`
export const ChatBotStyled = styled.div`
/* button hiển thị icon chat */
button.rcw-picker-btn {
    display: none;
}
.rcw-sender button {
    background-color: unset;
    margin-left: 10px;
}
/* end */
/* design input chat */
.rcw-sender{
  align-items: center;
  width: 100%;
}
.rcw-new-message{
  width: 90%;
  background-color: unset;
}
/* end */
/* css color background */
.rcw-conversation-container > .rcw-header {
  background-color: #334588;
}
/* màu nền chữ Ai */
.rcw-message > .rcw-response {
  /* background-color: black;
  color: white; */
}
/* nền user */
.rcw-client .rcw-message-text{
  background-color: #334588;
  color: white;
}
/* end */
/* nền icon open end close */
.rcw-launcher{
  background-color: #355e81;
}
/* end */
/* header chatbot */
.rcw-conversation-container .rcw-header{
  padding: 0px 0 15px;
}
`