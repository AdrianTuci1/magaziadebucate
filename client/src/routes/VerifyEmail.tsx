import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function VerifyEmail() {
    const { token } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/email/verifica/' + token;

    useEffect(() => {
        fetch(apiUrl)
        .then(response => response.json())
        .catch(error => {
            alert('Failed to verify email.');
            console.error('Verification Error:', error);
        });
    }, [apiUrl]);


    return (
        <div style={{marginTop:'50px', marginLeft:'50px'}}>
            <h2>Adresa ta de email a fost verificata!</h2> <br />
            <Link to='/'>Inapoi la pagina principala</Link>
        </div>
    );
}

export default VerifyEmail;
