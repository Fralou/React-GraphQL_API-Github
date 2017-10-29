import React from 'react';

const Dropdown = (props) => {
        return(
            <div className="repositorydiv" onClick={props.clr}>
                {props.data.map((item, i) => {
                        return <p className="repository" key={i} onClick={() => props.iss(item.node.issues.edges)}>{item.node.name}</p>
                    })
                }
            </div>
        )
}

export default Dropdown;