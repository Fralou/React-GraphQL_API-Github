import React from 'react';

const Comments = (props) => {
            return(
            <div>
                {props.data.map((item,i) => {
                    return (
                        <div className="comments" key={i}>
                            <p className="commentscreatedat">Дата создания: {item.node.createdAt}</p>
                            <p className="commentsbodytext">Комментарий: {item.node.bodyText}</p>
                        </div>
                    )
                })}
            </div>
        )
}

export default Comments;