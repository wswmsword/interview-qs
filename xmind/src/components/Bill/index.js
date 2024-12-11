import React from 'react';
import './index.css'

import BillCard from './BillCard'

export default function Bill(props)
{
   const { bill, categories, filterMonth, filterCategory, filterYear } = props
   
   return (
      <>
         <ul className="bill-ul">
         {
            bill.filter(item => {
               if (new Date(+ item.time).getMonth() + 1 !== + filterMonth && filterMonth !== null) { return false }
               if (new Date(+ item.time).getFullYear() !== + filterYear && filterYear !== null) { return false }
               if (item.category !== filterCategory && filterCategory !== null) { return false }
               return item;
            }).map(({time, type, category, amount}, idx) => {
               let category_text = categories.get(category).name;
               return (
                  <BillCard key={idx} className="bill-item" idx={idx} time={time} type={type} category_text={category_text} category_code={`c${category}`} amount={amount}/>
               )
            }).reverse()
         }
         </ul>
      </>
   )
}