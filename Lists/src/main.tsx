import { createRoot } from 'react-dom/client'


function FruitListItem(props) {
  return <li>{props.fruit.name}</li>;
}

function FruitList(props) {

  return <ul>{props.fruits.map((fruit) => (
        <FruitListItem key={fruit.id} fruit={fruit} />
      ))}</ul>;
}

const data = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'orange' },
  { id: 3, name: 'blueberry' },
  { id: 4, name: 'banana' },
  { id: 5, name: 'kiwi' },
];

createRoot(document.getElementById('root')!).render(
  <FruitList fruits={data}/>,
)
