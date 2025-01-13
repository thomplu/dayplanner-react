import './Navigation.scss';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <ul className="navigation">
            <li className="navigation__item">
                <Link to="/" className="icon-home navigation__link"></Link>
            </li>
            <li className="navigation__item">
                <a className="icon-calendar navigation__link" href=""></a>
            </li>
            <li className="navigation__item">
                <a className="icon-archive navigation__link" href=""></a>
            </li>
        </ul>
    );
}
export default Navigation;
