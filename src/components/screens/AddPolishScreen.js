import React from 'react';
import { Text, StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { deleteList } from '../../actions';
import { CardSection, Button, Input } from '../common';

class AddPolishScreen extends React.Component {
  state = {
    polish: {}
  }

  onpnameChange(text) {
    this.setState({ polish: { pName: text } });
  }

  onpbrandChange(text) {
    this.setState({ polish: { pBrand: text } });
  }

  onpcollectionChange(text) {
    this.setState({ polish: { pCollection: text } });
  }

  onpnumberChange(text) {
    this.setState({ polish: { pNumber: text } });
  }

  onpfinishChange(text) {
    this.setState({ polish: { pFinish: text } });
  }

  onpseasonChange(text) {
    this.setState({ polish: { pSeason: text } });
  }

  onpyearChange(text) {
    this.setState({ polish: { pYear: text } });
  }

  onpsiteChange(text) {
    this.setState({ polish: { pSite: text } });
  }

  addPolish() {
    console.log(this.state.polish);
  }

  renderForm() {
    const {
      titleStyle,
      sectionStyle
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
            onChangeText={this.onpnameChange.bind(this)}
            value={this.state.polish.pName}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Brand *'
            placeholder='China Glaze'
            onChangeText={this.onpbrandChange.bind(this)}
            value={this.state.polish.pBrand}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Collection'
            placeholder='Glass Slipper'
            onChangeText={this.onpcollectionChange.bind(this)}
            value={this.state.polish.pCollection}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Number'
            placeholder='CGT425'
            onChangeText={this.onpnumberChange.bind(this)}
            value={this.state.polish.pNumber}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Finish'
            placeholder='Glass-Fleck'
            onChangeText={this.onpfinishChange.bind(this)}
            value={this.state.polish.pFinish}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Release Season'
            placeholder='Summer'
            onChangeText={this.onpseasonChange.bind(this)}
            value={this.state.polish.pSeason}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Release Year'
            placeholder='2004'
            onChangeText={this.onpyearChange.bind(this)}
            value={this.state.polish.pYear}
          />
        </CardSection>

        <CardSection style={sectionStyle}>
          <Input
            label='Website'
            placeholder='chinaglaze.com'
            onChangeText={this.onpsiteChange.bind(this)}
            value={this.state.polish.pSite}
          />
        </CardSection>

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
  dangerStyle: {
    borderColor: 'red'
  },
  dangerTextStyle: {
    color: 'red'
  }
});

const mapStateToProps = state => {
  const { uid } = state.auth;
  return { uid };
};

export default connect(mapStateToProps, {
  deleteList
})(AddPolishScreen);
