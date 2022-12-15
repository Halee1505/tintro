import BillDetailAll from "../../all/billDetail";
const BillDetail = ({ route, navigation }) => {
  return (
    <BillDetailAll
      editable={true}
      roomId={route.params.id}
      navigation={navigation}
    />
  );
};
export default BillDetail;
