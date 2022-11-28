import { View, Button } from "react-native";
import { connect } from "react-redux";
import { EVENT_CHANGE } from "../../redux/const";
import { useDispatch, useSelector } from "react-redux";

function Btn() {
  const dispatch = useDispatch();
  const change = useSelector((state) => state.eventChangeReducer.change);
  return (
    <View>
      <Button
        title="change"
        onPress={() => {
          dispatch({ type: EVENT_CHANGE, payload: !change });
        }}
      />
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    eventChangeReducer: (change) => dispatch(eventChangeReducer(change)),
  };
};

export default connect(mapDispatchToProps)(Btn);
