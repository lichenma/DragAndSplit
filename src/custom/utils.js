import {cloneDeep} from 'lodash'

// the Knuth shuffle algorithm
export function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function sum(array) {
  var res = 0; 
  array.map((item) => res=+(res+item.cost).toFixed(12))
  return res;
}


// method to handle to the item cards movement
export const move = (state, source, destination) => {
  const srcListClone = [...state[source.droppableId]];
  const destListClone =
    source.droppableId === destination.droppableId
      ? srcListClone
      : [...state[destination.droppableId]];

  const [movedElement] = srcListClone.splice(source.index, 1);
  destListClone.splice(destination.index, 0, movedElement);

  const balanceClone = cloneDeep(state.balance)
  if (source.droppableId!=destination.droppableId){
    // we need to update the balances at this point
    balanceClone[source.droppableId] = +(state.balance[source.droppableId] - movedElement.cost).toFixed(12)
    balanceClone[destination.droppableId] = +(state.balance[destination.droppableId] + movedElement.cost).toFixed(12)
    
    console.log(movedElement);
    console.log(source);
  }
  return {
    [source.droppableId]: srcListClone,
    balance: balanceClone,
    ...(source.droppableId === destination.droppableId
      ? {}
      : {
          [destination.droppableId]: destListClone,
        }),
  };
};
