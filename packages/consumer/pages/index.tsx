/* eslint-disable react/jsx-curly-brace-presence */
import Head from "next/head"
import { Button, TableComponent } from "@project/shared"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import PencilIcon from "../public/assets/icons/pencil.svg"

const Container = styled.section`
  padding: 1em 2em;

  .table {
    background-color: black;
  }
`

const Home = () => {
  const { t } = useTranslation()

  const columns = [
    {
      title: `${t("Date&time")}`,
      dataIndex: "date",
      key: "date",
    },
    {
      title: `${t("Inquiry type")}`,
      dataIndex: "inquiry_type",
      key: "inquiry_type",
    },
    {
      title: `${t("Hope for phone")}`,
      dataIndex: "hope_for_phone",
      key: "hope_for_phone",
    },
    {
      title: `${t("Member")}`,
      dataIndex: "name",
      key: "name",
      render: () => {
        return "id"
      },
    },
    {
      title: `${t("Email address")}`,
      dataIndex: "email",
      key: "email",
    },

    {
      title: `${t("Action")}`,
      dataIndex: "action",
      key: "id",
      render: () => {
        return "edit"
      },
    },
  ]

  const dataSource = [
    {
      key: 1,
      id: 11,
      date: "2022",
      inquiry_type: "yes",
      userId: "idd",
      name: "Hero",
      email: "Hero@g.com",
      hope_for_phone: "909",
    },
  ]

  return (
    <>
      <Head>
        <title>{"HomePage | Consumer "}</title>
      </Head>
      <Container>
        <h1>{"This is the Home Page"}</h1>
        <Button>{t("Hello")}</Button>
        <PencilIcon />
        <TableComponent
          columns={columns}
          dataSource={dataSource}
          className="table"
        />
      </Container>
    </>
  )
}

export default Home
