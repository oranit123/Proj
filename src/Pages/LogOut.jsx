import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
    
        const handleLogout = () => {
           
            localStorage.removeItem('currentUser');
            
        
            navigate('/login');
        };

       
        handleLogout();
    }, [navigate]); 

 
    return null;
}
