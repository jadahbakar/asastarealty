import Swal from 'sweetalert2'

const SweetAlert = props => {
  const { type, title, text, timer, func } = props
  const content = Swal.fire({
    type: { type },
    title: { title },
    text: { text },
    timer: { timer },
    footer: '@asastarealty'
  }).then(result => {
    func()
  })

  return content
}

export default SweetAlert
