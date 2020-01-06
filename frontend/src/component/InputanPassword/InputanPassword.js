import React, { useState } from 'react'
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

const InputanPassword = props => {
  const { icon, name, value, change, placeholder, innerRef } = props
  const [hiddenPassword, setHiddenPassword] = useState(true)

  // --------------------------------------- TOGGLE PASSWORD
  const toggleShow = () => {
    setHiddenPassword(!hiddenPassword)
  }
  const content = (
    <>
      <div style={{ marginBottom: '1em' }}>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <i className={icon} />
            </InputGroupText>
          </InputGroupAddon>

          <Input
            name={name}
            type={hiddenPassword ? 'password' : 'text'}
            value={value}
            onChange={change}
            placeholder={placeholder}
            autoComplete='off'
            innerRef={innerRef}
          />
          <InputGroupAddon addonType='append'>
            <Button block outline color='info' onClick={toggleShow}>
              <i className='fa fa-eye' />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  )
  return content
}

export default InputanPassword
