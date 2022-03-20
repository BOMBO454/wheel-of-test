import React from "react";

type Props = {
  disabled: boolean
  onClick: (event) => void
}

const SpinButton: React.FC<Props> = ({disabled, onClick}: Props) => {
  return (
    <button className="button-spin" disabled={disabled} onClick={onClick}>
      <i className="icofont-spinner-alt-3 icofont-3x"></i>
    </button>
  )
}

export default SpinButton