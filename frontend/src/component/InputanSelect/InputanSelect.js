import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

const InputSelect = props => {
  const { icon, name, value, change, placeholder, children, innerRef, error } = props
  const content = (
    <>
      <div style={{ marginBottom: '1em' }}>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input name={name} type='select' value={value} onChange={change} placeholder={placeholder} autoComplete='off' innerRef={innerRef}>
            {children}
          </Input>
        </InputGroup>
        {error}
      </div>
    </>
  )
  return content
}

export default InputSelect
