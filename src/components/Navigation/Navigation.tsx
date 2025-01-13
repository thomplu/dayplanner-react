import './Navigation.scss';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <ul className="navigation">
            <li className="navigation__item">
                <Link to="/" className="icon-home navigation__link"></Link>
            </li>
            <li className="navigation__item">
                <Link
                    to="/upcoming"
                    className="icon-clock navigation__link"
                ></Link>
            </li>
            <li className="navigation__item">
                <Link
                    to="/completed"
                    className="icon-bar-chart navigation__link"
                ></Link>
            </li>
        </ul>
    );
}
export default Navigation;
