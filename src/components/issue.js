import React from 'react';

const Issue = (props) =>{
        return(
            <div>
                {props.data.map((item,i) => {
                    return (
                        <div className="issue" key={i} onClick={() => props.comm(item.node.comments.edges)}>
                            <p className="issuetitle">Заголовок: {item.node.title}</p>
                            <p className="issuestate">Статус: {item.node.state}</p>
                            <p className="issuebodytext">Описание: {item.node.bodyText}</p>
                        </div>
                    )
                })}
            </div>
        )
}

export default Issue;