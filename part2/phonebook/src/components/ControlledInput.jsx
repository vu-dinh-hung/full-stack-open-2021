import React from 'react';

const ControlledInput = ({ text, value, onChange }) => (
  <div>
    {text}<input value={value} onChange={onChange} />
  </div>
)

export default ControlledInput;
