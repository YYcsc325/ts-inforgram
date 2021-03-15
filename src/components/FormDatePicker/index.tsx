import { DatePicker } from 'antd';
import React, { forwardRef } from 'react';

const mapUi = {
  datePicker: DatePicker,
  weekPicker: DatePicker.WeekPicker,
  rangePicker: DatePicker.RangePicker,
  monthPicker: DatePicker.MonthPicker,
}

interface DataPickerProps {
    type: string
}

const FormDatePicker = (props: DataPickerProps, ref: any) => {
  const { type, ...reset } = props;
  const Element = mapUi[type];
  if(!Element) console.warn(`type: ${ type }传入有误`)
  return (
    Element && <Element {...reset}/>
  )
}
export default forwardRef(FormDatePicker);
