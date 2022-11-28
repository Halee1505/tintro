import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import changeEvent from "../../redux/actions/index.js";
import reducers from "../../redux/reducers/index.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();
  const change = useSelector((state) => state.change);
  return (
    <View>
      <Text>
        {
          // this.props.change
          change ? 1 : 0
        }
      </Text>
      <Button
        title="change"
        onPress={() => {
          dispatch(reducers.change(!change));
        }}
      />
    </View>
  );
}

export default HomePage;
