import { useFormik } from "formik"
import * as yup from "yup"
import React from "react"
import { message } from "antd"
import { useTranslation } from "react-i18next"
import Head from "next/head"
import { TextField, Button, auth, theme } from "@project/shared"
import styled from "styled-components"
import * as Sentry from "@sentry/node"
import { CloseCircleFilled } from "@ant-design/icons"
import { signInWithEmailAndPassword } from "firebase/auth"
import RestrictedRoute from "../../withRestrictedRoute"

interface LoginType {
  email: string
  password: string
}

const Container = styled.div`
  background: ${theme.bgColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LoginWrapper = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${theme.darkGrey};
  background: ${theme.base};
  padding: 1rem 2rem;
  border-radius: 2px;
  & .text-field {
    & label {
      font-size: 14px;
      line-height: 22px;
      padding-bottom: 8px;
    }
  }
`

const TextFieldWrapper = styled.div`
  margin-top: 35px;
`

const StyledButton = styled(Button)`
  margin: auto;
  height: 40px;
  margin-bottom: 30px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  border-radius: 5px;
  display: flex;
  width: 96px;
  align-items: center;
  justify-content: center;
`

const InputFieldWrapper = styled.div`
  margin-bottom: 25px;
`

const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = React.useState(false)

  const handleLoginFormSubmit = () => {
    handleLogin()
  }

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("Please enter your e-mail address"))
      .required(t("Please enter")),
    password: yup.string().required(t("Please enter")),
  })

  const formik = useFormik<LoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLoginFormSubmit,
  })

  const handleLogin = async () => {
    setLoading(true)
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )

      if (!data || !data.user || !auth.currentUser) {
        return
      }
    } catch (error) {
      const errorCode = error.code
      if (errorCode === "auth/user-not-found") {
        message.error({
          content: t("Email address or password does not match."),
          key: "1",
          icon: <CloseCircleFilled onClick={() => message.destroy("1")} />,
        })
      } else if (errorCode === "auth/wrong-password") {
        message.error({
          content: t("Email address or password does not match."),
          key: "2",
          icon: <CloseCircleFilled onClick={() => message.destroy("2")} />,
        })
      } else if (errorCode === "auth/user-disabled") {
        message.error({
          content: t(
            "We could not login you at this moment. Please contact your administration for inquiry"
          ),
          key: "3",
          icon: <CloseCircleFilled onClick={() => message.destroy("3")} />,
        })
      } else {
        message.error({
          key: "4",
          icon: <CloseCircleFilled onClick={() => message.destroy("4")} />,
          content: t("An error has occurred. Please try again later."),
        })
      }
      Sentry.captureException(error)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>{"Login"}</title>
      </Head>
      <Container>
        <LoginWrapper>
          <TextFieldWrapper>
            <form onSubmit={formik.handleSubmit}>
              <InputFieldWrapper>
                <TextField
                  name={"email"}
                  error={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={t("Email")}
                  placeholder={t("Email")}
                  className={"text-field"}
                  height={"40px"}
                  width={"340px"}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <TextField
                  name={"password"}
                  type={"password"}
                  error={formik.touched.password && formik.errors.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label={t("Password")}
                  placeholder={t("Password")}
                  className={"text-field"}
                  height={"40px"}
                  width={"340px"}
                />
              </InputFieldWrapper>
              <StyledButton htmlType={"submit"} loading={loading}>
                {t("Login")}
              </StyledButton>
            </form>
          </TextFieldWrapper>
        </LoginWrapper>
      </Container>
    </>
  )
}

export default RestrictedRoute(LoginPage)
