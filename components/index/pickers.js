import { Picker } from "@react-native-picker/picker";

export const MonthPicker = (props) => {
  return (
    <Picker
      selectedValue={props.value}
      onValueChange={(value) => {
        props.set(value);
      }}
    >
      <Picker.Item label="Ene" value={1} />
      <Picker.Item label="Feb" value={2} />
      <Picker.Item label="Mar" value={3} />
      <Picker.Item label="Abr" value={4} />
      <Picker.Item label="May" value={5} />
      <Picker.Item label="Jun" value={6} />
      <Picker.Item label="Jul" value={7} />
      <Picker.Item label="Ago" value={8} />
      <Picker.Item label="Sep" value={9} />
      <Picker.Item label="Oct" value={10} />
      <Picker.Item label="Nov" value={11} />
      <Picker.Item label="Dic" value={12} />
    </Picker>
  );
};

export const YearPicker = (props) => {
  return (
    <Picker
      selectedValue={props.value}
      onValueChange={(value) => {
        props.set(value);
      }}
    >
      <Picker.Item label="2025" value={2025} />
      <Picker.Item label="2026" value={2026} />
      <Picker.Item label="2027" value={2027} />
    </Picker>
  );
};
