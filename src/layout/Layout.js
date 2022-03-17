import Nav from './Nav';
export default function layout(props) {
  return (
      <div>
          <Nav />
          {props.children}
      </div>
      
  );
}