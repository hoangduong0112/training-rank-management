import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AuthFooter from '../../components/auth/AuthFooter';
import AuthForm from '../../components/auth/AuthForm';
import AuthHeader from '../../components/auth/AuthHeader';
import DismissKeyboard from '../../components/common/DismissKeyboard';
import APIs, { authAPI, endpoints } from '../../configs/APIs';
import { statusCode } from '../../configs/Constants';
import { SignInAction } from '../../stores/actions/UserAction';
import MyStyles from '../../styles/MyStyles';
import Theme from '../../styles/MyTheme';
import { signInFields } from '../../utils/Fields';
import { setTokens } from '../../utils/utils';
import { useUserDispatch } from '../../stores/contexts/UserContext';
import { CLIENT_ID, CLIENT_SECRET } from '@env';

const SignIn = ({ navigation }) => {
   const [loading, setLoading] = useState(false);
   const dispatch = useUserDispatch();
   const [account, setAccount] = useState({});
   const [errorMessage, setErrorMessage] = useState('');
   const [errorVisible, setErrorVisible] = useState(false);

   const handleSignIn = async () => {
      for (let field of signInFields) {
         if (!account[field.name]) {
            setErrorVisible(true);
            setErrorMessage(field.errorMessage);
            return;
         }
      }

      setLoading(true);
      setErrorVisible(false);

      try {
         let tokens = await APIs.post(endpoints['token'],
            new URLSearchParams({
               ...account,
               grant_type: 'password',
               client_id: CLIENT_ID,
               client_secret: CLIENT_SECRET
            }),
         );

         const { accessToken } = await setTokens(tokens);

         setTimeout(async () => {
            let user = await authAPI(accessToken).get(endpoints['me']);

            if (user.status === statusCode.HTTP_200_OK) dispatch(SignInAction(user.data));
         }, 100);
      } catch (error) {
         if (error.response) {
            setErrorVisible(true);
            setErrorMessage('Email hoặc mật khẩu không chính xác');
         } else {
            console.error(error);
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <ScrollView style={MyStyles.BackGround}>
         <DismissKeyboard>
            <LinearGradient colors={Theme.LinearColors2}>
               <AuthHeader title="Đăng nhập" content="Hệ thống điểm rèn luyện sinh viên" />
               <AuthForm
                  fields={signInFields}
                  account={account}
                  setAccount={setAccount}
                  errorVisible={errorVisible}
                  errorMessage={errorMessage}
                  loading={loading}
                  onPressFunc={handleSignIn}
                  buttonText="Đăng nhập"
               />
               <AuthFooter navigation={navigation} content="Chưa có tài khoản?" screen="SignUp" linkText="Đăng ký" />
            </LinearGradient>
         </DismissKeyboard>
      </ScrollView>
   );
};

export default SignIn;
