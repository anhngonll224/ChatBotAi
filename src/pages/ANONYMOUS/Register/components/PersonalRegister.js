import { Checkbox, Col, Form, Input, Select } from "antd"
import { useSelector } from "react-redux"
import captcha from "src/assets/images/register/captcha.png"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import SvgIcon from "src/components/SvgIcon"
import { getRegexMobile, regexIDCard, getRegexPassword, validateEmail } from "src/lib/stringsUtils"

const PersonRegister = ({ form, acceptRules, setAcceptRules, setLoading }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)

  return (
    <>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Tên đăng nhập không được để trống!",
            },
          ]}
          name="username"
        >
          <FlInput label="Tên đăng nhập" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Mật khẩu không được để trống" },
            // {
            //   pattern: getRegexPassword(),
            //   message: "Mật khẩu không đúng định dạng",
            // },
          ]}
        >

          <Input.Password label="Mật khẩu" isRequired />

        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Họ và tên không được để trống!",
            },
          ]}
          name="fullname"
        >
          <FlInput label="Họ và tên" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="phone_number"
          rules={[
            { required: true, message: "Số điện thoại không được để trống" },
            {
              pattern: getRegexMobile(),
              message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
            },
          ]}
        >
          <FlInput label="Số điện thoại" isRequired />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item name="dateofbirth">
          <FlDatePicker label="Ngày sinh" />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item name="sex">
          <FlSelect label="Giới tính" allowClear>
            <Select.Option key={"nam"} value={"nam"}>
              Nam
            </Select.Option>
            <Select.Option key={"nữ"} value={"nữ"}>
              Nữ
            </Select.Option>
          </FlSelect>
        </Form.Item>
      </Col>
      {/* <Col xs={24} md={8}>
        <Form.Item
          name="CitizenID"
          rules={[
            {
              required: true,
              message: "CCCD/CMT/Hộ chiếu không được để trống!",
            },
            {
              pattern: regexIDCard(),
              message: "CCCD/CMT nhập sai định dạng!",
            },
          ]}
        >
          <FlInput label="CCCD/CMT/Hộ chiếu" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssuedBy"
        // rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlInput label="Nơi cấp" />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          name="IssueDate"
        // rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlDatePicker label="Ngày cấp" />
        </Form.Item>
      </Col> */}
      {/* <Col span={24}>
        <SelectOneProvince
          floating={true}
          form={form}
          required
          isGuest
          listFormName={["ProvinceID", "DistrictID", "WardID"]}
          setLoading={setLoading}
        />
      </Col> */}
      <Col md={24}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Email không được để trống",
            },
            {
              pattern: validateEmail(),
              message: "Email nhập sai định dạng!",
            },
          ]}
        >
          <FlInput label="Email" isRequired />
        </Form.Item>
      </Col>
      <Col md={24}>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Địa chỉ chi tiết không được để trống!",
            },
          ]}
        >
          <FlInput label="Địa chỉ chi tiết" isRequired />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item name="acceptRules" valuePropName="checked">
          <Checkbox
            checked={acceptRules}
            value={acceptRules}
            onChange={value => setAcceptRules(value.target.checked)}
          >
            Đồng ý với{" "}
            <span style={{ textDecoration: "underline", color: "#5D5FEF" }}>
              điều khoản & chính sách
            </span>
          </Checkbox>
        </Form.Item>
      </Col>
      {/* <Col md={7}>
        <Form.Item name="CaptCha">
          <FlInput label="Mã Captcha" />
        </Form.Item>
      </Col>
      <Col
        md={4}
        className="d-flex align-items-center justify-content-flex-start"
        style={{ height: "fit-content" }}
      >
        <img src={captcha} alt="captcha" width={120} />
        <SvgIcon name="refresh-black" className="ml-12" />
      </Col> */}
    </>
  )
}

export default PersonRegister
