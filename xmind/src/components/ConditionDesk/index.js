import React, { useRef, useState, useEffect } from 'react'
import './index.css'

import { Select } from 'antd'

const { Option } = Select;


export default function ConditionDesk(props) {
   const { setMonth, setCategory, setYear, bill, categories } = props;
   const year = [];
   const month = {};
   const category_code = [];
   bill.reduce((accumulator, {time, category}) => {
      const date = new Date(+ time);
      const date_year = date.getFullYear();
      const date_month = date.getMonth() + 1;
      if (accumulator[0].indexOf(date_year) === -1) { accumulator[0].push(date_year) }
      if (accumulator[1][date_year] != null && accumulator[1][date_year].indexOf(date_month) === -1) { accumulator[1][date_year].push(date_month) }
      else if (accumulator[1][date_year] == null) { accumulator[1][date_year] = [date_month] }
      if (accumulator[2].indexOf(category) === -1) { accumulator[2].push(category) }
      return accumulator;
   }, [year, month, category_code]); // 在账单列表中统计出账单的年份、月份、分类代码
   const [monthOptions, setMonthOptions] = useState(month[year[0]]);
   const [selectedMonth, setSelectedMonth] = useState(month[year[0]][0]);
   useEffect(() => {
      setYear(year[0])
   }, [])
   const handleYearChange = value => {
      setMonthOptions(month[value]);
      // setSelectedMonth(month[value][0]);
      // setMonth(month[value][0]) // 作用：过滤月份
      setYear(value)
   };
   const handleMonthChange = value => {
      setSelectedMonth(value)
      setMonth(value) // 作用：过滤月份
   }
   const handleCategoryChange = value => {
      setCategory(value)
   }
   return (
      <>
         <form className="condition_desk">
            <div>
               <div className="cond_title">年份</div>
               <Select
                  bordered={false}
                  defaultValue={year[0]}
                  onChange={handleYearChange}
                  style={{ width: 120, border: "1px solid #4b5065", color: "#daede2" }}
               >
                  {year.map(item => (
                     <Option key={item}>{item}</Option>
                  ))}
               </Select>
            </div>
            <div>
               <div className="cond_title">月份</div>
               <Select
                  bordered={false}
                  style={{ width: 120, border: "1px solid #4b5065", color: "#daede2" }}
                  // value={selectedMonth}
                  defaultValue={null}
                  onChange={handleMonthChange}
               >
                  <Option key={"blueway"} value={null}>全部月份</Option>
                  {monthOptions.map(item => (
                     <Option key={item}>{item}</Option>
                  ))}
               </Select>
            </div>
            <div>
               <div className="cond_title">标签</div>
               <Select
                  bordered={false}
                  defaultValue={null}
                  style={{ width: 120, border: "1px solid #4b5065", color: "#daede2" }}
                  onChange={handleCategoryChange}
               >
                  <Option key={"blueway"} value={null}>全部标签</Option>
                  {category_code.map(item => (
                     <Option key={item}>{categories.get(item).name}</Option>
                  ))}
               </Select>
            </div>
         </form>
      </>
   )
}