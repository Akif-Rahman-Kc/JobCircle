import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/store/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const theme = createTheme();

export default function SignUpDetails() {
  const router = useRouter()

  const { userDetails, setUserDetails } = useContext(AuthContext)
  const { otpConf, setOtpConf } = useContext(AuthContext)

  useEffect(()=>{
    if (Object.keys(userDetails) == 0) {
      router.push('/auth/signup')
    }
  },[])

  const [ locality, setLocality ] = useState(false)
  const [ localityError, setLocalityError ] = useState('')
  const [ city, setCity ] = useState(false)
  const [ cityError, setCityError ] = useState('')
  const [ state, setState ] = useState(false)
  const [ stateError, setStateError ] = useState('')
  const [ phoneNo, setPhoneNo ] = useState(false)
  const [ phoneNoError, setPhoneNoError ] = useState('')
  const [ flag, setFlag ] = useState(false)
  const [age, setAge] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      phoneNo: data.get('phoneNo'),
      locality: data.get('locality'),
      city: data.get('city'),
      state: data.get('state'),
      ...userDetails
    }

    if(data.phoneNo && data.locality && data.city && data.state){
      let regPhone =/^[0-9]+$/;
      if(regPhone.test(data.phoneNo)){
        setPhoneNo(false)
        setPhoneNoError('')
        if(data.phoneNo.length == 10){
          setPhoneNo(false)
          setPhoneNoError('')

          setUserDetails(data)
          try {
            setUpRecaptcha("+91" + data.phoneNo).then((res)=>{
              setFlag(true)
              setOtpConf(res)
              router.push('/auth/otp')
            })
          } catch (error) {
            toast.warning(`${error.message}`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          }
            
        }else{
          setPhoneNo(true)
          setPhoneNoError('Please enter 10 digit')
        }
     }else{
        setPhoneNo(true)
        setPhoneNoError('Please Enter valid Phone no')
     }
    }else{
      if (data.phoneNo == '') {
        setPhoneNo(true)
        setPhoneNoError('Please enter your Phone no')
      }
      if (data.locality == '') {
        setLocality(true)
        setLocalityError('Please enter your Locality')
      }
      if (data.city == '') {
        setCity(true)
        setCityError('Please enter your City')
      }
      if (data.state == '') {
        setState(true)
        setStateError('Please enter your State')
      }
    }
  }; 
  
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
    <ToastContainer/>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 11,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Grid sx={{ boxShadow: 3, backgroundColor:'#fff' , border:'1px solid lightgray', p:2 , borderRadius:'10px'}} container spacing={2}>
                <Grid item sx={{display: { xs: 'none', sm: 'flex' }}} xs={12} sm={6}>
                    <Box>
                        <img style={{margin:'40px',width:'300px',height:'55vh'}} src="/logo.png" alt="Loading..."/>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop:'50px' }} item xs={12} sm={6}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="locality"
                            label="Locality"
                            name="locality"
                            error={locality}
                            helperText={localityError}
                            autoComplete="family-name"
                            autoFocus
                            />
                            {/* <FormControl sx={{ width:'100%' }}>
                            <InputLabel id="locality">Locality *</InputLabel>
                            <Select
                              labelId="locality"
                              fullWidth
                              id="locality"
                              value={age}
                              name='locality'
                              label="locality"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Malappuram</MenuItem>
                              <MenuItem value={20}>Valapattanam</MenuItem>
                              <MenuItem value={30}>Madakkara</MenuItem>
                            </Select>
                            </FormControl> */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="given-name"
                            name="city"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            error={city}
                            helperText={cityError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            autoComplete="family-name"
                            error={state}
                            helperText={stateError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            autoComplete="given-name"
                            name="phoneNo"
                            required
                            fullWidth
                            id="phoneNo"
                            label="Phone No"
                            error={phoneNo}
                            helperText={phoneNoError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div id='recaptcha-container'/>
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 , p: 1.4 , fontWeight:'900' , display: flag ? 'none' : 'block' }}
                        >
                        Verify
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}