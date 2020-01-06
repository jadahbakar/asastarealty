import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

const InputanNumber = props => {
  const { icon, type, name, value, change, placeholder, innerRef, error } = props
  const content = (
    <>
      <div style={{ marginBottom: '1em' }}>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input name={name} type={type} value={value} onChange={change} placeholder={placeholder} autoComplete='off' innerRef={innerRef} />
        </InputGroup>
        {error}
      </div>
    </>
  )

  return content
}

export default InputanNumber
