import { CaretRightFilled, HomeFilled } from "@ant-design/icons"
import { Breadcrumb } from "antd"
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem"
import React from "react"

const BreadCrumb = () => {
  return (
    <Breadcrumb separator={<CaretRightFilled />}>
      <BreadcrumbItem>
        <HomeFilled />
        {"Home"}
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export { BreadCrumb }
