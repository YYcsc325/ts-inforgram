import React, { useCallback } from "react";
import { FormInstance } from "antd/lib/form/Form";
import { Form } from "antd";
import { processingObj } from "@/util/utils";

import mapConfig, { IMapUi } from "./config";

type Items = { name: string; label?: React.ReactNode; [x: string]: any };

export interface IConfigItem<T = any, P = any> {
  type?: IMapUi;
  isShow?: (form: FormInstance, stateProps?: T) => boolean;
  formItemProps: Items;
  itemProps?: any;
  connect?: any;
  component?: React.FC<T & P>;
}
export interface IFormProps<T = any, P = any> {
  form: FormInstance;
  className?: string;
  config?: Array<IConfigItem<T, P>>;
  formProps?: any;
  stateProps?: T;
  onChange?: (val: any) => void;
}

/** 泛型动态传入state跟connectProps的类型， 返回给当前callBack的事件入参中 */

const FormView = <T, P>({
  form,
  className,
  config,
  formProps,
  stateProps,
  onChange,
}: React.PropsWithChildren<IFormProps<T, P>>) => {
  return (
    <Form {...formProps} className={className} form={form}>
      {(config || [])
        .map(
          ({ type, isShow, formItemProps, itemProps, connect, component }) => {
            let Element = type ? mapConfig[type] : component;

            if (!Element) {
              console.warn(
                `未匹配到对应的type: ${type}类型的组件，且也未找到自定义渲染的component，请检查`
              );
              return;
            }
            /** 配置是否展示 */
            if (typeof isShow === "function" && !isShow?.(form, stateProps)) {
              return;
            }

            /** 切记勿修改这段 */
            let RenderElement = Element;

            let FormItem = function ({
              children,
              formItemProp,
              ...connectProps
            }: any) {
              return (
                <Form.Item
                  {...processingObj(formItemProp, "calling", {
                    ...connectProps,
                  })}
                >
                  {children}
                </Form.Item>
              );
            };

            const ItemCom = (props: any) => {
              const handleChange = useCallback(
                (...args) => {
                  const args1 = args.concat([{ ...props }, { ...stateProps }]);
                  // 配置层组件的onChange
                  props.onChange?.(...args1);
                  // 最外层组件的FormView的onChange
                  onChange?.(form.getFieldsValue());
                },
                [props]
              );
              return <Element {...props} onChange={handleChange} />;
            };

            if (connect && RenderElement) {
              FormItem = connect(FormItem);
              RenderElement = connect(ItemCom);
            } else {
              RenderElement = ItemCom;
            }

            return (
              <FormItem formItemProp={formItemProps}>
                <RenderElement
                  form={form}
                  {...{ ...stateProps, ...formItemProps, ...itemProps }}
                />
              </FormItem>
            );
          }
        )
        .filter(Boolean)}
    </Form>
  );
};

// function FormViewCom({ form, ...restProps }) {
//   const WithPropsFormView = useMemo(
//     () =>
//       Form.create({
//         onValuesChange: ({ onChange }, _, allValues) => {
//           onChange && onChange(allValues);
//         },
//       })(FormView),
//     [],
//   );

//   if (form) return <FormView form={form} {...restProps} />;
//   return <WithPropsFormView {...restProps} />;
// }

export default FormView;
