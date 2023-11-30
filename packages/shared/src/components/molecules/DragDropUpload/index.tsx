import React from "react"
import styled from "styled-components"
import { useDropzone } from "react-dropzone"

interface Props {
  onDrop: any
  placeholder?: string
  className?: string
  color?: string
}

const Wrapper = styled.section`
  .input-wrapper {
    border: ${(props) =>
      props.color ? `2px dashed ${props.color}` : "2px dashed black"};
    text-align: center;
    padding: 50px 0px;
    margin-bottom: 15px;
  }
`

const Uploader: React.FC<Props> = ({
  onDrop,
  placeholder,
  className,
  color,
}) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop })

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} {"-"} {file.size} {"bytes"}
    </li>
  ))

  return (
    <Wrapper className={className} color={color}>
      <div {...getRootProps()} className={"input-wrapper"}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{"Drop the files here ..."}</p>
        ) : (
          <p>
            {placeholder
              ? placeholder
              : "Drag 'n' drop some files here, or click to select files"}
          </p>
        )}
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </Wrapper>
  )
}

export { Uploader }
