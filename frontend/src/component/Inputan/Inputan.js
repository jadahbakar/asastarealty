import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

const Inputan = props => {
  const { icon, type, name, value, change, placeholder, focus, innerRef, error } = props
  const content = (
    <>
      <div style={{ marginBottom: '1em' }}>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>
          <Input name={name} type={type} value={value} onChange={change} placeholder={placeholder} autoComplete='off' autoFocus={focus} innerRef={innerRef} />
        </InputGroup>
        {error}
      </div>
    </>
  )

  return content
}

export default Inputan
