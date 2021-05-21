import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return { setVisible }
  })

  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={() => setVisible(true)}>{props.showLabel}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={() => setVisible(false)}>{props.hideLabel}</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
