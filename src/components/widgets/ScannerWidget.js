import React from 'react';
import { Text, StyleSheet, View, Button, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Permissions, BarCodeScanner } from 'expo';
// TODO: Continue working once I get access to a database of UPC's
class ScannerWidget extends React.Component {

  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  // TODO: Get type barcode from nail polishes
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          zIndex: 999
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          //barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }


}

/*const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  }
});*/

const mapStateToProps = state => {
  const { username, error, loading, uid, token } = state.auth;
  return { username, error, loading, uid, token };
};

export default connect(mapStateToProps, {})(ScannerWidget);
