import { Avatar } from 'antd';
import { htmlToText } from 'html-to-text';
import React from 'react'

interface InfoMainProps {
    members1?: { userId: number; name: string; avatar: string; }[];
    des?: string[]
}
const InfoMain = ({ members1, des }: InfoMainProps) => {
    const rendermembers = () => {
        return members1?.map((item, i) => {
            return <Avatar style={{ marginRight: "-12px", border: "2px solid #fff" }} key={i} src={item.avatar} alt={item.name} />
        })
    }
    const plainText = htmlToText(String(des));
    return (
        <div className='mb-3'>
            <section className='my-2'>Description: {plainText}</section>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {rendermembers()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </div>
    )
}

export default InfoMain