import React from 'react';

import './index.css'

export default function Dashboard(props)
{
   const { bill, categories, filterMonth, filterYear } = props;
   const yearBill = bill.filter(item => {
      if (new Date(+ item.time).getFullYear() !== + filterYear && filterYear !== null) { return false }
      return item;
   })
   const monthBill = yearBill.filter(item => {
      if (new Date(+ item.time).getMonth() + 1 !== + filterMonth && filterMonth !== null) { return false }
      return item;
   });
   let income_year = 0;
   let expense_year = 0;
   let income = 0;
   let expense = 0;
   const category_month = [];
   const expense_expense = new Map();
   yearBill.forEach(item => {
      income_year += + item.type === 1 ? + item.amount : 0;
      expense_year += + item.type === 0 ? + item.amount : 0;
   })
   monthBill.forEach((item) => {
      income += + item.type === 1 ? + item.amount : 0;
      expense += + item.type === 0 ? + item.amount : 0;
      // 标签，数据结构：数组
      // 数组元素，数据结构：对象
      // console.log(item)
      if (+ item.type === 0)
      {
         if (expense_expense.get(item.category) == null)
         { expense_expense.set(item.category, + item.amount) }
         else { expense_expense.set(item.category, + item.amount + expense_expense.get(item.category)) }
      }
   })
   for (let [category, value] of expense_expense)
   { category_month.push({category: categories.get(category).name, value, category_code: category}) }
   category_month.sort((a, b) => (b.value - a.value))
   // console.log(monthBill)
   // 年份：收入、支出
   // 月份：收入、支出
   //    // 标签：支出
   return (
      <div className="dashboard">
         { filterYear &&
            <div className="dash_item">
               <div className="dash_title">这一年（{filterYear}）</div>
               <div className="dash_year">
                  <div className="year_income">
                     <div className="ycard_title">收入</div>
                     <div className="ycard_amount">{income_year}</div>
                  </div>
                  <div className="year_expense">
                     <div className="ycard_title">支出</div>
                     <div className="ycard_amount">{expense_year}</div>
                  </div>
               </div>
            </div>
         }
         { filterMonth &&
            <div className="dash_item">
               <div className="dash_title">这一月（{filterMonth}）</div>
               <div className="dash_month">
                  <div className="month_income">
                     <div className="mcard_title">收入</div>
                     <div className="mcard_amount">{income}</div>
                  </div>
                  <div className="month_expense">
                     <div className="mcard_title">支出</div>
                     <div className="mcard_amount">{expense}</div>
                  </div>
               </div>
            </div>
         }
         { filterMonth &&
            <div className="dash_item">
               <div className="dash_title">这一月的消费标签</div>
               <div className="dash_cate">
                  {
                     category_month.map(item => {
                        return (
                           <div className={`cate_item c${item.category_code}`}>
                              <div className="cate_title">{item.category}</div>
                              <div className="cate_amount">{item.value}</div>
                           </div>
                        )
                     })
                  }
               </div>
            </div>
         }
      </div>
   )
}