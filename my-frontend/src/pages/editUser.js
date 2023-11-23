import  {React, useState} from "react";
import { useNavigate } from "react-router";
import UserService from "../services/UserData";
import Cookies from "js-cookie";

const styles = {
    container: {
      backgroundColor: "transparent",
      margin: '',
      padding: '3%',
      height: '',
      border: '0px solid black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: '250px'
    },
    innerContainer: {
      paddingTop: '1%',
      paddingBottom: '1%',
      width: '80%',
      minHeight: '',
      height: '25%',
      paddingLeft:'40%',
      paddingRight:'',
      justifyContent: 'center',
      fontSize:'120%'
    },
    input: {
      boxSizing: 'border-box',
      width: '50%',
      minWidth: '200px',
      maxWidth: '350px',
      minHeight: '40px',
      height: '40%',
      border: '0px solid black',    
      backgroundColor: 'rgb(210, 210, 210)',
      paddingLeft:'5%',
      paddingRight: '4%'
    },
    button:{
          boxSizing:'border-box', 
          backgroundColor: "rgba(52, 52, 52, 0.16)",
          paddingTop:'10px', 
          paddingBottom:'10px',
      paddingRight:'10%',
      paddingLeft:'10%',
          color: "black",
          justifyContent:'center',
          border:'0px solid black'
      },
    centerText: {
      paddingLeft:'0%',
      textAlign: 'left',
    },
  }

    const EditUser = () => {
      const [newUsername, setNewUsername] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState('');
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(false);
      const navigate = useNavigate();

      const handleSubmit = async event => {
          event.preventDefault();
          if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return; // Prevent further execution if passwords do not match
          } else {
            setSuccess("Passwords matched and updated successfully");
          }
        
          try {
            const token = Cookies.get('x-auth-token');
            const user = await UserService.getUserbyToken(token);
            console.log('check user recieved')
            console.log(user)
            const res = await UserService.editUserCred(user, newUsername,newPassword, token);
            setSuccess(true);
            //message display sucessful
            setSuccess("Sucess");
          } catch (e) {
            console.error(`handleSubmit failed in editUser.js, ${e}`);
            setError('An error occurred. Please try again');
            navigate('/');
          };
        };

    return(
        <div data-testid="editUserWrapper">
            {error && <div style={{color: 'red'}}>{error}</div>}
            {success && <div style={{color: 'green'}}>{success}</div>}
            <form onSubmit={(e) => handleSubmit(e)} style={styles.container}>
            <div style={{justifyContent: 'center', paddingLeft:'40%', paddingTop:'2%', paddingBottom:'3%'}}>
            </div>

            <div style={styles.innerContainer}>
                <label htmlFor="newUsername" style={styles.text}>New Username</label><br />
                <input
                className="square rounded-pill"
                id="newUsername"
                autoComplete="off"
                onChange={(e) => setNewUsername(e.target.value)}
                style={styles.input}>
                </input>
            </div>

            <div style={styles.innerContainer} data-testid="newPasswordField">
                <label htmlFor="newPassword">New Password</label><br />
                <input
                type="password"
                className="square rounded-pill"
                id="newPassword"
                autoComplete="off"
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}>
                </input>
            </div>
 
            <div style = {styles.innerContainer}>
              <label htmlFor="confirmPassword">Confirm Password</label> <br />
              <input
              type ="password"
              className="square rounded-pill"
              id ='confirmPassword'
              autoComplete ="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              />
            </div>

            <div style={styles.innerContainer}>
                <button name='confirm' className="square rounded-pill"
                style={styles.button}>
                <b>Confirm</b>
                </button>
            </div>
            </form>
        </div>
    );
};

export default EditUser;