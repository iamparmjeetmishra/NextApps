import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";



export default function Login() {
  return (
     <div>
        <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
         <RegisterLink postLoginRedirectURL="/welcome">Sign up</RegisterLink>
    </div>
  )
}
