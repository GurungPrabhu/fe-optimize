import { ConfigProvider, Table } from "antd"
import React from "react"
import styled from "styled-components"
import jaJP from "antd/lib/locale/ja_JP"
import { i18next } from "../../../i18n"

interface iTable {
  className?: string
  columns: object[]
  dataSource: object[]
  scrollable?: boolean
  scrollX?: number
  loading?: boolean
}

const StyledTable = styled(Table)``
const Wrapper = styled.div`
  display: contents;
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const TableComponent: React.FC<iTable> = ({
  className,
  dataSource,
  loading,
  columns,
  scrollX = 0,
  scrollable,
}) => {
  return (
    <Wrapper className={className}>
      <ConfigProvider locale={i18next.language === "ja" && jaJP}>
        <StyledTable
          dataSource={dataSource}
          loading={loading}
          scroll={scrollable && { x: scrollX }}
          columns={columns}
          pagination={false}
        />
      </ConfigProvider>
    </Wrapper>
  )
}

export { TableComponent }
