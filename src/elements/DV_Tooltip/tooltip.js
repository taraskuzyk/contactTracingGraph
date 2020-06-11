import React, {Fragment, useState} from 'react'

import {Tooltip as Tip} from "shards-react";


const Tooltip = (props) => {

  const [state, setState] = useState()

  const toggleHandler = () => {
    setState(!state)
  }

  return (
    <Fragment>
      {/* <FontAwesomeIcon icon = {faQuestionCircle} id={'#' + props.element["Field name"]} /> */}
      <i class="ml-2 fa fa-question-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Tooltip on top" id={'#' + props.element["Field name"]}></i>
      {/* <Button id="TooltipExample">Hover Me!</Button> */}
        <Tip
          open={state}
          target={props.element["Field name"]}
          toggle={toggleHandler}
        >
          Woo! I am a tooltip!
        </Tip>
    </Fragment>
  )

}

export default Tooltip
