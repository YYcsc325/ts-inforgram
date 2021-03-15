import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import FormSwitch from '@/components/FormSwitch';
import FormDatePicker from '@/components/FormDatePicker';
import FormInputNumber from '@/components/FormInputNumber';
import FromRadio from '@/components/FormRadio';
import FormHideMode from '@/components/FormHideMore';
import FormCheckbox from '@/components/FormCheckBox';
import FormTree from '@/components/FormTree';

const mapUi = {
  Radio: FromRadio,
  Input: FormInput,
  Select: FormSelect,
  Switch: FormSwitch,
  DatePicker: FormDatePicker,
  InputNumber: FormInputNumber,
  HideMore: FormHideMode,
  Checkbox: FormCheckbox,
  Tree: FormTree,
}

export default mapUi;
