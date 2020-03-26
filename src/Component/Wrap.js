import React from 'react'

export default function Wrap(props) {
    //
    let wrapper = React.useRef();
    return (
        <div ref={wrapper}>
            {props.children}
        </div>
    )
}
