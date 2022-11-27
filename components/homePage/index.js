import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import changeEvent from "../../redux/actions/index.js";
const mapStateToProps = (state) => {
  return {
    change: state.change,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeEvent: (event) => dispatch(changeEvent(event)),
  };
};
function HomePage() {
  return (
    <View>
      <Text>
        {
          // this.props.change
          mapStateToProps.change ? 1 : 0
        }
      </Text>
      <Button
        title="change"
        onPress={() => {
          // this.props.changeEvent(true);
          changeEvent(true);
        }}
      />
    </View>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
