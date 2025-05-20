import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

function FruitListItem(props) {
  function handleClick(e, id) {
    console.log(e);
    console.log(`removed ${id}`);
  }

  return (
    <li onClick={(e) => handleClick(e, props.fruit.id)}>
      {props.fruit.name}{' '}
    </li>
  );
}

function FruitList(props) {
  const fruitListItems = props.fruits.map((fruit) => (
    <FruitListItem key={fruit.id} fruit={fruit} />
  ));
  return <ul>{fruitListItems}</ul>;
}

const data = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'blueberry' },
  { id: 4, name: 'banana' },
  { id: 5, name: 'kiwi' },
];

createRoot(document.getElementById('root')).render(
  <FruitList fruits={data} />
);