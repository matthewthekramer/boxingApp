import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  removeCombo,
  startEditing,
} from '../actions'
import {
  CardSection
} from './common';
import PunchImage from './PunchImage';
import Selector from './Selector';
import { TRASH, EDIT } from '../../assets/icons';

//Provides a preview of a combination containing name, first 4 punch numbers
//buttons to edit, delete or select

/*
 * props:
 *  combo - the combo to display the preview for
 *  idx - the index of this combo on the list
 */
class ComboPreview extends Component {
  onEdit() {
    this.props.startEditing(this.props.idx, this.props.combo);
    Actions.comboCreator({ title: this.props.combo.name });
  }
  onRemove() {
    this.props.removeCombo(this.props.idx);
  }
  renderPunches() {
    const { punches } = this.props.combo;
    const punchesView = [];
    //displays the first 5 punches of a combo as images
    if (punches === undefined) {
      return;
    }
    for (let i = 0; i < 5 && i < punches.length; ++i) {
      punchesView.push(
        <View key={i * 10} style={styles.punchContainer}>
          <PunchImage
            subKey={(i * 10) + 1}
            name={punches[i].name}
          />
        </View>
      );
    }
    return punchesView;
  }
  render() {
    const { name } = this.props.combo;
    return (
      <CardSection style={{ flex: 1 }}>
        <View style={styles.comboNameBox}>
          <Text style={styles.comboNameTxt}>
            {name}
          </Text>
          <Selector />
        </View>
        <View style={styles.punchesContainer}>
          {this.renderPunches()}
        </View>
        <View style={styles.removeImgButtonContainer}>
          <TouchableHighlight
            onPress={this.onEdit.bind(this)}
          >
            <View style={styles.removeImgContainer}>
              <Image style={styles.removeImg} source={EDIT} />
            </View>
          </TouchableHighlight >
        </View>
        <View style={styles.removeImgButtonContainer}>
          <TouchableHighlight
            onPress={this.onRemove.bind(this)}
          >
            <View style={styles.removeImgContainer}>
              <Image style={styles.removeImg} source={TRASH} />
            </View>
          </TouchableHighlight >
        </View>

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
    flexDirection: 'column',
    alignItems: 'center',
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
  removeImgButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  removeImgContainer: {
  },
  removeImg: {
    width: 32,
    height: 32,
  },
};
const mapStateToProps = state => {
  return {};
}

export default connect(mapStateToProps, {
  removeCombo,
  startEditing,
})(ComboPreview);
