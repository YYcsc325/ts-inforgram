import React, { FC, useCallback, useMemo } from "react";
import { Form } from "antd";
import { processingObj } from "@/util/utils";

import config from "./config";

export interface IFormProps {
  form: any;
  className?: string;
  config?: any;
  formProps?: any;
  stateProps?: any;
  onChange?: (val: any) => void;
}

const FormView: FC<IFormProps> = ({
  form,
  className,
  config = [],
  formProps = {},
  stateProps = {},
  onChange = () => {},
}) => {
  return (
    <Form {...formProps} className={className} form={form}>
      {config
        .map(
          ({
            type,
            isShow,
            formItemProps = {},
            itemProps = {},
            connect,
            component,
          }: any = {}) => {
            let Element: any = config[type] || component;
            if (typeof isShow === "function") {
              isShow = isShow({ form, ...stateProps });
            }
            if (!Element || !isShow) return;
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
                  const args1 = args.concat([{ ...stateProps }, { ...props }]);
                  if (props.onChange) props.onChange(...args1); // 配置层组件的onChange
                  if (onChange) onChange(form.getFieldsValue()); // 最外层组件的onChange
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

// console.log(Form, 'form');
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
