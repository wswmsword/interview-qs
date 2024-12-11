import React from 'react'

import classNames from 'classnames'

export default function BillCard({ className, idx, time, type, category_text, category_code, amount })
{

   const classes = classNames(className, {
      'bill-expense': + type === 0,
      'bill-income': + type === 1,
   })
   const amountFormt = (amount) => { // 格式化金额，如：3657999 => 3,657,999
      const amountArr = amount.split('');
      const formatArr = amountArr.reduce((accumulator, currentValue, index) => {
         const revidx = amountArr.length - index;
         if (revidx % 3 === 0 && index !== 0) { accumulator.push(',', currentValue); return accumulator; }
         else { accumulator.push(currentValue); return accumulator; }
     }, []);
     return formatArr.join('');
   }
   const memotime = new Date(+ time);
   return (
      <li className={classes} key={idx}>
         <div className={`tmp1 ${category_code}`}>
            <span className="avator"></span>
         </div>
         <div className="tmp2">
            <span className="category">{category_text}</span>
            {/* <span className="time">{ new Date(+ time).toISOString() }</span> */}
            <span className="time">{ memotime.getMonth() + 1 }{" / "}{memotime.getDate()}{" / "}{memotime.getFullYear()}{" , "}{memotime.getHours()}{" : "}{memotime.getMinutes()}{" : "}{memotime.getSeconds()}</span>
         </div>
         <div className="tmp3">
            <span className="amount">{"¥ "}{amountFormt(amount)}</span>
         </div>
      </li>
   )
}