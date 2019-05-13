import React from 'react';
import {
  Text,
  StyleSheet,
  Modal,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions
 // Keyboard
  } from 'react-native';
import { connect } from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import { ImagePicker } from 'expo';
import { deleteList, addSinglePolish } from '../../actions';
import { CardSection, Button, Input, Spinner } from '../common';

class AddPolishScreen extends React.Component {
  state = {
    hideResults: false,
    query: '',
    error: false,
    pCollection: '',
    pNumber: '',
    pFinish: '',
    pSeason: '',
    pYear: '',
    pSite: '',
    pSwatch: null,
    uid: this.props.uid,
    filename: '',
    pBrand: ''
  };

  ontextChange(field, value) {
    this.setState({ [field]: value });
  }

  addPolish() {
    this.setState({ error: false });
    if ((!this.state.pName || this.state.pName.trim() === '')
        || (!this.state.pBrand || this.state.pBrand.trim() === '')) {
      this.setState({ error: true, errorMsg: 'Polish Name and Brand are required!' });
    } else {
      this.props.addSinglePolish(this.state, this.props.token, 'Home');
    }
  }

  findBrand(query) {
    if (query === '') {
      return [];
    }

    const { brands } = this.props;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return brands.filter(brand => brand.search(regex) >= 0);
  }

  async pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: 'Images',
      base64: true
    });

    if (!result.cancelled) {
      const fileuri = result.uri;
      const filename = fileuri.substring(fileuri.indexOf('ImagePicker') + 12);
      this.setState({ pSwatch: result.base64, filename, fileuri });
    }
  }

  renderItem(brand) {
    return (
      <TouchableOpacity
        style={{ width: '100%', height: 25 }}
        onPress={() => {
          this.setState({ pBrand: brand.trim(), query: brand.trim() });
         // Keyboard.dismiss();
        }}
      >
        <Text style={styles.listItemStyle}>{brand}</Text>
      </TouchableOpacity>
    );
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
      imageStyle,
      acContainerStyle,
      labelStyle,
      acListStyle,
      acSectionStyle,
      acTextStyle,
      acTextContainerStyle
    } = styles;
    const { navigation } = this.props;
    const { query } = this.state;
    const brands = this.findBrand(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
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

        <CardSection style={acSectionStyle}>
          <Text style={labelStyle}>Brand *</Text>
            <View style={acContainerStyle}>
            <Autocomplete
              autoCorrect={false}
              listStyle={acListStyle}
              //listContainerStyle={{ flex: 1, zIndex: 3 }}
              // Text input container
              inputContainerStyle={acTextContainerStyle}
              style={acTextStyle}
              placeholder='China Glaze'
              data={brands.length === 1 && comp(query, brands[0]) ? [] : brands}
              defaultValue={query}
              onChangeText={text => this.setState({ query: text })}
              renderItem={this.renderItem.bind(this)}
              hideResults={this.state.hideResults ? this.state.hideResults : undefined}
              onBlur={() => this.setState({ hideResults: true })}
              onFocus={() => this.setState({ hideResults: false })}
            />
          </View>
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
            <Image source={{ uri: this.state.fileuri }} style={imageStyle} />}
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
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    zIndex: 1
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
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  acSectionStyle: {
    justifyContent: 'center',
    zIndex: 10,
    height: 40
  },
  acContainerStyle: {
    right: 0,
    width: '75%',
    flex: 1,
    position: 'absolute',
    zIndex: 2
  },
  acListStyle: {
    minHeight: 25,
    maxHeight: 100,
    width: '95%',
    zIndex: 5
  },
  acTextStyle: {
    width: '95%',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 6,
    fontSize: 18,
    lineHeight: 23,
    flex: 3,
    zIndex: 5
  },
  acTextContainerStyle: {
    borderWidth: 0,
    justifyContent: 'center',
    height: 40
  },
  listItemStyle: {
    fontSize: 16,
    paddingLeft: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start'
  }
});

const mapStateToProps = state => {
  const { uid, token } = state.auth;
  const { loadingCreate, loadingImage, uploadError } = state.polish;
  const { brands } = state.polishes;
  return { uid, token, loadingCreate, loadingImage, uploadError, brands };
};

export default connect(mapStateToProps, {
  deleteList, addSinglePolish
})(AddPolishScreen);
