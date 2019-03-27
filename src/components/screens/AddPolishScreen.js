import React from 'react';
import { Text, StyleSheet, Modal, View, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import { deleteList, addSinglePolish } from '../../actions';
import { CardSection, Button, Input, Spinner } from '../common';

class AddPolishScreen extends React.Component {
  state = {
      error: false,
      pCollection: '',
      pNumber: '',
      pFinish: '',
      pSeason: '',
      pYear: '',
      pSite: '',
      pSwatch: null,
      uid: this.props.uid };

  ontextChange(field, value) {
    this.setState({ [field]: value });
  }

  addPolish() {
    this.setState({ error: false });
    if ((!this.state.pName || this.state.pName.trim() === '')
        || (!this.state.pBrand || this.state.pBrand.trim() === '')) {
      this.setState({ error: true, errorMsg: 'Polish Name and Brand are required!' });
    } else {
      this.props.addSinglePolish(this.state, this.props.token);
    }
  }

  async pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    console.log(result);
    if (!result.cancelled) {
      this.setState({ pSwatch: result.uri });
    }
  }

  renderError() {
    if (this.props.uploadError) {
      return (
        <View style={{ backgroundColor: 'white' }}>
            <Text style={styles.errorTextStyle}>
              {this.props.uploadError}
            </Text>
        </View>
      );
    }

    if (this.state.error) {
      return (
          <View style={{ backgroundColor: 'white' }}>
              <Text style={styles.errorTextStyle}>
                {this.state.errorMsg}
              </Text>
          </View>
      );
    }
  }

  renderForm() {
    if (this.props.loadingCreate) {
      return (
        <CardSection>
          <Text>Creating polish, please wait.</Text>
          <Spinner />
        </CardSection>
      );
    }

    const {
      titleStyle,
      sectionStyle,
      uploadBtnStyle,
      imageStyle
    } = styles;
    const { navigation } = this.props;
    return (
      <View>
        <CardSection style={sectionStyle}>
          <Text style={titleStyle}>Add A Polish</Text>
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Name *'
            placeholder='Happily Ever After'
            onChangeText={this.ontextChange.bind(this, 'pName')}
            value={this.state.pName}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Brand *'
            placeholder='China Glaze'
            onChangeText={this.ontextChange.bind(this, 'pBrand')}
            value={this.state.pBrand}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Collection'
            placeholder='Glass Slipper'
            onChangeText={this.ontextChange.bind(this, 'pCollection')}
            value={this.state.pCollection}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Number'
            placeholder='CGT425'
            onChangeText={this.ontextChange.bind(this, 'pNumber')}
            value={this.state.pNumber}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Finish'
            placeholder='Glass-Fleck'
            onChangeText={this.ontextChange.bind(this, 'pFinish')}
            value={this.state.pFinish}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Release Season'
            placeholder='Summer'
            onChangeText={this.ontextChange.bind(this, 'pSeason')}
            value={this.state.pSeason}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Release Year'
            placeholder='2004'
            onChangeText={this.ontextChange.bind(this, 'pYear')}
            value={this.state.pYear}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Website'
            placeholder='chinaglaze.com'
            onChangeText={this.ontextChange.bind(this, 'pSite')}
            value={this.state.pSite}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          {this.state.pSwatch &&
            <Image source={{ uri: this.state.pSwatch }} style={imageStyle} />}
          <Button
            style={uploadBtnStyle}
            onPress={() => this.pickImage()}
          >
            Upload a swatch
          </Button>
        </CardSection>

        {this.renderError()}

        <CardSection>
          <Button onPress={() => this.addPolish()}>
            Submit
          </Button>
          <Button onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </CardSection>
      </View>
    );
  }

  render() {
    const {
      containerStyle,
    } = styles;
    const { navigation } = this.props;
    return (
      <Modal
      transparent
      animationType='slide'
      onRequestClose={() => {}}
      >
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={containerStyle}>
      <TouchableWithoutFeedback>
        {this.renderForm()}
      </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
    );
  }
}

const styles = StyleSheet.create({
  sectionStyle: {
    justifyContent: 'center'
  },
  titleStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  uploadBtnStyle: {
    flex: 1
  },
  imageStyle: {
    width: 75,
    height: 75
  }
});

const mapStateToProps = state => {
  const { uid, token } = state.auth;
  const { loadingCreate, loadingImage, uploadError } = state.polish;
  return { uid, token, loadingCreate, loadingImage, uploadError };
};

export default connect(mapStateToProps, {
  deleteList, addSinglePolish
})(AddPolishScreen);
