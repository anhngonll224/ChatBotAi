import { Col, Form, Radio, Row, Space, Spin } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import OrganizationRegister from "./components/OrganizationRegister"
import PersonRegister from "./components/PersonalRegister"
import { RegisterStyle } from "./styled"
import { useRef } from "react"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const captchaRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [acceptRules, setAcceptRules] = useState(true)
  const [Type, setType] = useState(2)
  const handleSubmit = async () => {
    try {
      // const token = captchaRef.current.getValue()
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService[
        Type === 1 ? "registerAccount" : "register"
      ]({
        ...values,
        dateofbirth: values.dateofbirth ? values.dateofbirth.format() : undefined,
        IssueDate: values.IssueDate ? values.IssueDate.format() : undefined,
        IssueDateRepresent: values.IssueDateRepresent
          ? values.IssueDateRepresent.format()
          : undefined,
      })
      if (res?.isError) return
      Notice({
        msg: "Đăng ký tài khoản thành công!",
      })
      navigate(ROUTER.DANG_NHAP)
    } finally {
      setLoading(false)
    }
  }

  const handleRecaptchaChange = value => {
    // Xử lý khi reCAPTCHA được xác minh thành công (value chứa giá trị mã xác minh).
  }

  return (
    <RegisterStyle>
      <Spin spinning={loading}>
        <div className="content-wrap">
          <div className="text-center mb-16">
            <div className="fs-22 fw-600 title-form">Đăng Ký</div>
          </div>
          <div className="text-center mb-24">

          </div>
          <Form form={form} layout="vertical" initialValues={{ Type }}>
            <Row gutter={16}>
              {Type === 1 ? (
                <OrganizationRegister
                  form={form}
                  setLoading={setLoading}
                  setAcceptRules={setAcceptRules}
                  acceptRules={acceptRules}
                />
              ) : (
                <PersonRegister
                  form={form}
                  setLoading={setLoading}
                  setAcceptRules={setAcceptRules}
                  acceptRules={acceptRules}
                />
              )}
              <Col span={12} className="d-flex justify-content-flex-end">

              </Col>
              <Col span={24} className="mt-12">
                <Space size={16} className="w-100 justify-content-flex-end">
                  <Button
                    loading={loading}
                    btnType="gray-style"
                    className="btn-register"
                    onClick={() => window.history.back()}
                  >
                    Quay lại
                  </Button>
                  <Button
                    loading={loading}
                    btnType="primary"
                    className="btn-register"
                    onClick={handleSubmit}
                    disabled={!acceptRules}
                  >
                    Đăng ký
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
      </Spin>
    </RegisterStyle>
  )
}

export default RegisterPage
