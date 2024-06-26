import { Link } from 'react-router-dom';


function Artists(props){
    return(
        <>
            <div>
                <h1>{props.name}</h1>
                <Link to="/">Artists</Link>

                <Link to="/">{props.genre}</Link>


                
            </div>
        </>
    );
}

export default Artists;

