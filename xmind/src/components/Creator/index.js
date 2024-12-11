import React, { useState, useRef } from 'react';
import { Button, Select, Input } from 'antd'

import './index.css'

const { Option } = Select;

export default function Creator(props)
{
   const { onSubmitBill, categories } = props;
   // const { setNewbill } = props;
   const [billType, setType] = useState(null);
   const ipt = useRef(null)
   
   const options = [];
   for (let [key, value] of categories)
   { options.push(<Option key={key} value={key}>{value.name}</Option>) }
   return (
      <>
         <form className="creator" onSubmit={onSubmitBill(ipt, billType)}>
            
            <div>
               <div className="crt_title">标签</div>
               <Select
                  bordered={false}
                  style={{ width: 120, border: "1px solid #4b5065", color: "#daede2" }}
                  placeholder="选择类型"
                  onChange={(value) => { setType(value) }}
               >
                  {options}
               </Select>
            </div>
            <div>
               <div className="crt_title">金额</div>
               <Input
                  bordered={false}
                  style={{ width: 120, border: "1px solid #4b5065", color: "#daede2" }}
                  placeholder="输入金额"
                  ref={ipt}
               />
            </div>
            <div className="rightbtn">
               <Button type="primary" htmlType="submit">新建</Button>
            </div>
         </form>
      </>
   )
   
}