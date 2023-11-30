import React from "react"
import { action } from "@storybook/addon-actions"
import { Uploader as UploaderComponent } from "./index"

export default {
  title: "Components/Molecules",
  component: UploaderComponent,
  args: {
    placeholder: "",
    className: "",
    color: "#000000",
  },
}
const Template = (args) => (
  <UploaderComponent onDrop={action("onClickAction")} {...args} />
)
export const Uploader = Template.bind({})
