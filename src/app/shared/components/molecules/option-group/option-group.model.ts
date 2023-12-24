export class OptionGroupModel {
  value: string;
  label: string;
  name: string;
  constructor(item?: OptionGroupModel){
    this.value = item?.value ?? '';
    this.label = item?.label ?? '';
    this.name = item?.name ?? '';
  }
}
