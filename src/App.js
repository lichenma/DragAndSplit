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
    // look into substitute - that is the item which replaces the current item
    console.log(json);
    itemsArr.map((item) => {
      var itemData; 
      if (item.status == 'replaced') {
        // then we want to display the product substitute picture and name
        itemData = item.substitute;
      } else {
        itemData = item.item; 
      }
      var imageUrl = itemData.image_url; 
      var name = itemData.display_name;
      var cost = +(item.final_charge); 
      balanceClone['bench'] = +(balanceClone['bench'] + cost).toFixed(12)
      benchClone.push({
        name: name,
        cost: cost, 
        imageSrc: imageUrl
      })
    }); 

    // for delivery cost 
    benchClone.push({
      name: "Delivery", 
      cost: json.data.shipping_price,
      imageSrc: './hero_icons/delivery.webp'
    })

    // for gratuity (Instacart has a minimum for this value)
    benchClone.push({
      name: "Gratuity",
      cost: json.data.tip_amount,
      imageSrc: "./hero_icons/tip.png"
    })

    // for service fee 
    benchClone.push({
      name: "Service Fee",
      cost: +(json.data.subtotal * json.data.service_fee_rate).toFixed(12), 
      imageSrc: './hero_icons/service.png' 
    })

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
