import { DatePicker } from "antd";
import React, { forwardRef, ForwardRefRenderFunction } from "react";

const mapUi = {
  datePicker: DatePicker,
  weekPicker: DatePicker.WeekPicker,
  rangePicker: DatePicker.RangePicker,
  monthPicker: DatePicker.MonthPicker,
};

type DatePickerConst = typeof DatePicker;

interface DataPickerProps extends DatePickerConst {
  type: "datePicker" | "weekPicker" | "rangePicker" | "monthPicker";
}

const FormDatePicker: ForwardRefRenderFunction<
  HTMLDivElement,
  DataPickerProps
> = (props: DataPickerProps, ref: any) => {
  const Element = mapUi[props?.type];
  if (!Element) console.warn(`type: ${props?.type}传入有误`);
  return Element && <Element {...props} ref={ref} />;
};
export default forwardRef(FormDatePicker);
