import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { TextMask, InputAdapter } from 'react-text-mask-hoc'

const InputMask = props => {
  const { icon, name, value, change, mask, placeholder } = props
  const content = (
    <>
      <InputGroup className='mb-3'>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>
            <i className={icon} />
          </InputGroupText>
        </InputGroupAddon>
        {/* <TextMask mask={[/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]} */}
        <TextMask mask={mask} Component={InputAdapter} placeholder={placeholder} name={name} value={value} onChange={change} className='form-control' />
      </InputGroup>
    </>
  )
  return content
}

export default InputMask
