import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ImageBackground } from 'react-native';
import Selection from './Selection.js';
import {
  removeCombo,
  selectCombo,
} from '../actions'
import {
  CardSection
} from './common';
import punchNameToImg from '../util/PunchNameToImg';

//Provides a preview of a combination containing name, first 4 punch numbers
//buttons to edit, delete or select

/*
 * props:
 *  combo - the combo to display the preview for
 *  idx - the index of this combo on the list
 */
class ComboPreview extends Component {
  onRemove() {
    console.log('idx', this.props.idx);
    this.props.removeCombo(this.props.idx);
  }
  renderPunches() {
    console.log(this.props.combo);
    const { punches } = this.props.combo;
    const punchesView = [];
    //displays the first 5 punches of a combo as images
    for (let i = 0; i < 5 && i < punches.length; ++i) {
      console.log('punch ' + i, punches[i]);
      punchesView.push(
        <View key={i * 10} style={styles.punchContainer}>
          <ImageBackground
            key={(i * 10) + 1}
            source={punchNameToImg(punches[i].name)}
            style={styles.punchImgBg}
            imageStyle={styles.punchImg}
          >
            <View key={(i * 10) + 2} style={styles.imgOverlay}>
              <View key={(i * 10) + 3} style={styles.punchTxtContainer} >
                <Text key={(i * 10) + 4} style={styles.punchTxt}>
                  {punches[i].name}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
    return punchesView;
  }
  render() {
    const { name } = this.props.combo;
    return (
      <CardSection >
        <View style={styles.comboNameBox}>
          <Text style={styles.comboNameTxt}>
            {name}
          </Text>
        </View>
        <View style={styles.punchesContainer}>
          {this.renderPunches()}
        </View>
        <Button
          title={'-'}
          onPress={this.onRemove.bind(this)}
        />
      </CardSection>
    );
  }
}


const styles = {
  container: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  comboNameBox: {
    width: 50,
  },
  comboNameTxt: {
    fontWeight: 'bold',
  },
  punch: {
  },
  punchesContainer: {
    flexDirection: 'row',
  },
  punchContainer: {
    paddingLeft: 10,
  },
  punchImgBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#a8a8a8',
  },
  punchImg: {
    resizeMode: 'stretch',
    backgroundColor: '#a8a8a8',
  },
  //container on top of image
  imgOverlay: {

    alignItems: 'center',
    height: 50,
    justifyContent: 'flex-end',
  },
  punchTxt: {
    fontWeight: 'bold',
  },
  punchTxtContainer: {
  },
};
const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps, {
  removeCombo,
})(ComboPreview);
