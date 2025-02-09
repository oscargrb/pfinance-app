import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const CalendarIcon = (props) => (
  <AntDesign name="calendar" size={24} color="black" {...props} />
);

export const TableIcon = (props) => (
  <AntDesign name="table" size={24} color="black" {...props} />
);

export const CalculatorIcon = (props) => (
  <MaterialIcons name="calculate" size={24} color="black" {...props} />
);

export const ChartIcon = (props) => (
  <AntDesign name="piechart" size={24} color="black" {...props} />
);

export const InvoiceIcon = (props) => (
  <FontAwesome5 name="file-invoice-dollar" size={24} color="black" {...props} />
);
