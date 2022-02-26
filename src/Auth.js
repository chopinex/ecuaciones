import React, {useState} from 'react'
import app from './config'
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState({});


	onAuthStateChanged(app,(currentUser) =>{
		setUser(currentUser);
	});

	return(
		<AuthContext.Provider
			value={{
				user
			}}
		>
		 {children}
		</AuthContext.Provider>
	);
};
