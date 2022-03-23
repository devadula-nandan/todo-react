import Nav from './Nav';
export default function layout(props) {
  return (
      <div>
          <Nav isLogged={props.isLogged} setIsLogged={props.setIsLogged} />
          {props.children}
      </div>
      
  );
}