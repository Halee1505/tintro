import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
function HomePage() {
  const change = useSelector((state) => state.eventChangeReducer.change);
  return (
    <View>
      <Text>
        {
          // this.props.change
          change ? "true" : "false"
        }
      </Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    change: state.eventChangeReducer.change,
  };
};

export default connect(mapStateToProps)(HomePage);
