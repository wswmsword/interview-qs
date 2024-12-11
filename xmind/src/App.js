import React, { useState, useMemo, memo, useCallback } from 'react';
import './App.css';

import { message } from 'antd'

import Bill from './components/Bill';
import Creator from './components/Creator';
import ConditionDesc from './components/ConditionDesk'
import Dashboard from './components/Dashboard'

import bill from './mock/bill.json'
import categories from './mock/categories.json'

// const BillMemo = memo(Bill);
const CreatorMemo = memo(Creator);

function App() {
  const categories = categoriesJson2Map(); // structure: Map
  const [latestBill, setNewbill] = useState(bill);
  const [filterMonth, setMonth] = useState(null);
  const [filterYear, setYear] = useState(null);
  const [filterCategory, setCategory] = useState(null);

  const success = () => {
    message.success('新建成功，更多请查看年份、月份！');
  };
  const onSubmitBillCallback = useCallback((ipt, billType) => (e) => {
    e.preventDefault();
    if (billType == null || ! Number.isInteger(+ ipt.current.state.value) || ! ipt.current.state.value.trim()) { return }
    // setNewbill(ipt.current.value);
    setNewbill(latestBill.concat({
      type: categories.get(billType).type,
      time: new Date().getTime(),
      category: billType,
      amount: ipt.current.state.value
    }));
    ipt.current.state.value = '';
    success();
 }, [latestBill]);

  return (
    <div className="App">
      <CreatorMemo onSubmitBill={onSubmitBillCallback} categories={categories}/>
      <ConditionDesc bill={latestBill} categories={categories} setMonth={setMonth} setCategory={setCategory} setYear={setYear}/>
      <Bill bill={latestBill} categories={categories} filterMonth={filterMonth} filterCategory={filterCategory} filterYear={filterYear}/>
      <Dashboard bill={latestBill} categories={categories} filterMonth={filterMonth} filterYear={filterYear}/>
    </div>
  );
}

const categoriesJson2Map = () => {
  const map = new Map();
  categories.forEach(({id, type, name}) => {
    map.set(id, {type, name});
  });
  return map;
}

export default App;
