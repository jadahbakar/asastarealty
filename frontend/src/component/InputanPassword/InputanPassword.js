import React, { useState } from 'react'
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap'

const styles = {
  buttonStyle: {
    position: 'absolute', left: '1em', top: '0.7em'
  }
}

const InputanPassword = props => {
  const { icon, name, value, change, placeholder, innerRef } = props
  const [hiddenPassword, setHiddenPassword] = useState(true)

  // --------------------------------------- TOGGLE PASSWORD
  const toggleShow = () => {
    setHiddenPassword(!hiddenPassword)
  }
  // --------------------------------------- Content
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
            <Button outline color='info' onClick={toggleShow}>
              <i className='fa fa-eye' style={styles.buttonStyle} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  )
  return content
}

export default InputanPassword
