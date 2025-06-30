import {Link} from "react-router-dom";

//TODO: to make it dynam
const Breadcrumbs = ({hotel}) => {
    if (!hotel) {return null;}
    console.log("hotel:",hotel)
    return <nav className="text-sm text-gray-600">
        <ul style={{listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{display: 'inline'}}>
                <Link to="/">Home</Link> <span style={{padding: 10}}>{'   >   '}</span>
            </li>
            <li style={{display: 'inline'}}>
                <Link to="/">{hotel.type}</Link> <span style={{padding: 10}}>{'   >   '}</span>
            </li>
            <li style={{display: 'inline'}}>
                <Link to="/">{hotel.location.country}</Link> <span style={{padding: 10}}>{'   >   '}</span>
            </li>
            <li style={{display: 'inline'}}>
                <Link to="/">{hotel.location.city}</Link> <span style={{padding: 10}}>{'   >   '}</span>
            </li>
            <li style={{display: 'inline'}}>
                <Link to="/">{hotel.location.district}</Link> <span style={{padding: 10}}>{'   >   '}</span>
            </li>
            <li style={{display: 'inline'}}>
                <Link to={`/testing/${hotel.name}`}>{hotel.name}</Link>
            </li>
        </ul>

    </nav>
}

export default Breadcrumbs;