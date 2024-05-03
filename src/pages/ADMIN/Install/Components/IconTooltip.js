import React from 'react';
import { IconTooltipStyle } from '../styled';
import { RobotOutlined, LikeOutlined, DislikeOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import Button from 'src/components/MyButton/Button';

const IconTooltip = () => {
    return (
        <IconTooltipStyle>
            <section className="flex  items-center">
                <Row gutter={[16, 16]}>
                    <Col>
                        <Button btnType="btn-circleCustom" className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] relative">
                            <RobotOutlined />
                            <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                                Discord
                            </span>
                        </Button>
                    </Col>
                    <Col>
                        <Button btnType="btn-circleCustom" className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] relative">
                            <LikeOutlined />
                            <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                                Like
                            </span>
                        </Button>
                    </Col>
                    <Col>
                        <Button btnType="btn-circleCustom" className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] relative">
                            <DislikeOutlined />
                            <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                                Dislike
                            </span>
                        </Button>
                    </Col>
                    <Col>
                        <Button btnType="btn-circleCustom" className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] relative">
                            <MessageOutlined />
                            <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                                Message
                            </span>
                        </Button>
                    </Col>
                    <Col>
                        <Button btnType="btn-circleCustom" className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#7289da] from-gray-800 to-black text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] relative">
                            <SettingOutlined />
                            <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                                Settings
                            </span>
                        </Button>
                    </Col>
                </Row>
            </section>
        </IconTooltipStyle>
    );
}

export default IconTooltip;
