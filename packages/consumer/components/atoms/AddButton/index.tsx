import React from "react"
import { PlusCircleFilled } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
interface AddButtonProps {
  text?: string
  icon?: "download" | "add" | "none"
}

const AddButton: React.FC<AddButtonProps> = (props) => {
  const { text, icon } = props
  const { t } = useTranslation()
  const getIcon = () => {
    if (icon === "add")
      return <PlusCircleFilled style={{ marginRight: "10px" }} />
    else if (icon === "download")
      return (
        <span className={"icon_svg"}>
          <img src={"/assets/icons/download.svg"} alt={"download"} />
        </span>
      )
  }
  return (
    <div
      style={{
        color: "#65B798",
        fontSize: "12px",
        lineHeight: "22px",
      }}
    >
      {getIcon()}
      {t(text)}
    </div>
  )
}

export { AddButton }
