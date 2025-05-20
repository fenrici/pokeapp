import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul className="nav">
        <li className="nav-link active">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/new">Nuevo Pokemon</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 