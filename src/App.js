import React, { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {cloneDeep} from 'lodash'

import { ITEMS, ROOMMATES } from './custom/data';
import { shuffle, move, sum } from './custom/utils';

import Header from './components/Header';
import Dropzone from './components/Dropzone';
import Footer from './components/Footer';
import $ from 'jquery'

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of items
  searchString: '',
  // bench: shuffle(ITEMS),
  bench: [],
  [ROOMMATES.JOANNA]: [],
  [ROOMMATES.LI]: [],
  [ROOMMATES.KAIZEN]: [],
  balance: {
    // bench: sum(ITEMS),
    bench: 0,
    [ROOMMATES.LI]: 0,
    [ROOMMATES.JOANNA]: 0, 
    [ROOMMATES.KAIZEN]: 0,
  }
};

class App extends React.Component {
  state = initialState;
  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  query = () => {
    console.log("TODO");
    // parse the input
    var json = JSON.parse(this.state.searchString); 

    var itemsArr = json.data.order_items; 

    var benchClone = this.state.bench
    var balanceClone = this.state.balance
    console.log(balanceClone);
    itemsArr.map((item) => {
      var imageUrl = item.item.image_url; 
      var name = item.item.display_name;
      var cost = +(item.item.cost); 
      balanceClone['bench'] = +(balanceClone['bench'] + cost).toFixed(12)
      benchClone.push({
        name: name,
        cost: cost, 
        imageSrc: imageUrl
      })
    }); 
    var newState = {...this.state};
    newState.bench = benchClone;
    newState.balance = balanceClone; 
    this.setState(newState);
  }

  changeSearchText = (val) => {
    this.state.searchString = val;
  }

  render() {
    const { bench } = this.state;
    const isDropDisabled = false;

    return (
      <>
        <Header query={this.query} changeSearchText={this.changeSearchText} />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
              <div className="columns">
                <Dropzone 
                  id="bench" 
                  items={this.state['bench']} 
                  balance={this.state.balance["bench"]}
                  isDropDisabled={isDropDisabled} 
                />
                <Dropzone
                  id={ROOMMATES.LI}
                  items={this.state[ROOMMATES.LI]}
                  balance={this.state.balance[ROOMMATES.LI]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  id={ROOMMATES.JOANNA}
                  items={this.state[ROOMMATES.JOANNA]}
                  balance={this.state.balance[ROOMMATES.JOANNA]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  id={ROOMMATES.KAIZEN}
                  items={this.state[ROOMMATES.KAIZEN]}
                  balance={this.state.balance[ROOMMATES.KAIZEN]}
                  isDropDisabled={isDropDisabled}
                />
              </div>
            </div>
          </DragDropContext>
        <Footer/>
      </>
    );
  }

  componentWillUnmount() {
  }
}

export default App;
