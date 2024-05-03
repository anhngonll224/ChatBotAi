import TableCustom from "src/components/Table/CustomTable"
import { Col, Form, Input, Row, Space, Tooltip, DatePicker } from "antd"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import Button from "src/components/MyButton/Button"
import SpinCustom from "src/components/Spin"
import { useEffect, useState } from "react"
import moment from "moment"
import { ChatHistoryStyle } from "./styled"
import FlInput from "src/components/FloatingLabel/InputTag"
import { SearchOutlined } from "@ant-design/icons"
import SvgIcon from "src/components/SvgIcon"
import AiService from "src/services/AiService"
import DetailModal from "./Components/DetailModal"
const { Search } = Input;
const { RangePicker } = DatePicker;


const ChatHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [value, setValue] = useState(null);
  const [listHistory, setListHistory] = useState()
  const [total, setTotal] = useState()
  const [pagination, setPagination] = useState({
    page_size: 10,
    page_number: 1,
    ip: undefined
  })
  const [form] = Form.useForm()
  const DataHistory = async () => {
    setLoading(true)
    try {
      const res = await AiService.GetHistories({
        ...pagination
      });

      if (res && res.isOk) {
        setListHistory(res?.data)
        setTotal(res?.total)
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    DataHistory()
  }, [pagination]);
  // Hàm xử lý sự kiện thay đổi giá trị tìm kiếm
  const handleSearchChange = e => {
    setSearchValue(e.target.value)
  }
  const disabledDate = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, 'days')) >= 7;
    }
    return false;
  };

  const column = [
    {
      title: "STT",
      dataIndex: "id",
      key: `id`,
      width: 60,
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.page_size * (pagination.page_number - 1)}
        </div>
      ),
      align: "center",
    },
    {
      title: `Địa chỉ IP`,
      dataIndex: "ip",
      key: `ip`,
      align: "center",
      width: 100,
    },
    {
      title: `Câu hỏi`,
      dataIndex: "question",
      key: `question`,
      width: 180,
    },
    {
      title: `Thời gian`,
      dataIndex: "createdAt",
      key: `createdAt`,
      width: 80,
      align: "center",
      render: (val, record) => (
        <Tooltip
          title={moment(val).format("DD/MM/YYYY HH:mm:ss")}
          mouseLeaveDelay={0}
        >
          {moment(val).format("DD/MM/YYYY HH:mm:ss")}
        </Tooltip>
      ),
    },
  ]
  return (
    <ChatHistoryStyle>
      <SpinCustom spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={
            {
              // Username: userInfo.Username,
            }
          }
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className="title-type-1 d-flex justify-content-space-between pb-15 mb-20 ">
                Lịch sử Chat
                <div>
                  <Space size={16}>
                    {/* <FlInput
                search
                style={{ width: 350 }}
                label="Tên người dùng"
                onSearch={text =>
                  setPagination({ ...pagination, UserName: text })
                }
              /> */}
                    {/* <FlDatePicker
                                label={["Từ ngày", "Đến ngày"]}
                                ranger
                                onChange={data =>
                                    setPagination(pre => ({
                                        ...pre,
                                        FromDate: data ? data[0]?.format() : undefined,
                                        ToDate: data ? data[1]?.format() : undefined,
                                    }))
                                }
                            />
                            {listData?.ButtonShow?.IsExport && (
                                <Button btnType="primary" onClick={exportList}>
                                    Xuất Excel
                                </Button>
                            )} */}
                  </Space>
                </div>
              </div>
            </Col>
            <div className="boxMain">
              <Row gutter={[16, 16]} >
                <Col span={24} >
                  <Row gutter={[16, 16]} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* <Col span={6}>
                      <RangePicker
                        value={value}
                        disabledDate={disabledDate}
                        onChange={setValue}
                        className="customRangePicker"
                      />
                    </Col> */}
                    <Col span={12}>
                      <Search
                        allowClear
                        placeholder="Search.."
                        id="input"
                        className="input w-100pe"
                        name="text"
                        type="text"
                        onSearch={value => {
                          setPagination({
                            ...pagination,
                            ip: value,
                          })
                        }}
                      />

                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <TableCustom
                    isPrimary
                    columns={column}
                    dataSource={listHistory}
                    sticky={{ offsetHeader: -12 }}
                    pagination={{
                      hideOnSinglePage: total <= 10,
                      page_number: pagination.page_number,
                      page_size: pagination.page_size,
                      responsive: true,
                      total: total,
                      locale: { items_per_page: "" },
                      showSizeChanger: total > 10,
                      onChange: (page_number, page_size) => {
                        setPagination({
                          ...pagination,
                          page_number,
                          page_size,
                        })
                      },
                    }}
                    showPagination
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: event => {
                          console.log('check ', record)
                          setIsModalOpen(record)
                          // setIsModalOpenDetail(record)
                        }, // click row
                      };
                    }}
                    footerLeft={<div className="d-flex mt-20" />}
                    widthScroll={1200}
                    textEmpty="Không có dữ liệu!"
                  />
                </Col>
              </Row>
            </div>
          </Row>
        </Form>
      </SpinCustom>
      {!!isModalOpen &&
        <DetailModal open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} />
      }
    </ChatHistoryStyle>
  )
}

export default ChatHistory
