import Swal from 'sweetalert2'

import packageJson from '../../../package.json'

const MyAlert = (icon, title, html, timer, func) => {
  Swal.fire({
    icon,
    title,
    // text,
    html,
    timer,
    footer: packageJson.description
  }).then(result => {
    func()
  })
}

export default MyAlert
