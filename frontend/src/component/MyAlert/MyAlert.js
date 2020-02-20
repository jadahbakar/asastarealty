import Swal from 'sweetalert2'

import packageJson from '../../../package.json'

const MyAlert = (type, title, text, timer, func) => {
  Swal.fire({
    type,
    title,
    text,
    timer,
    footer: packageJson.description
  }).then(result => {
    func()
  })
}

export default MyAlert
