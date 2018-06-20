import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalExampleShorthand = (props) => (
  <Modal
    open={props.open}
    header='You can change event...'
    content={<Redactor handleChangeEvent={props.handleChangeEvent} currentEvent={props.currentEvent}/>}
    actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
    onClose={props.close}
  />
)
const Redactor = (props) => {
  return (
    <div className='modal-redactor'>
      <textarea
        rows="20"
        cols="50"
        value={props.currentEvent.value}
        onChange={props.handleChangeEvent}>
      </textarea>
    </div>
    )
}
export default ModalExampleShorthand
