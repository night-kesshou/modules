# modules
API:
 - login
   - main
     - {
       error:{{登入失敗資訊}},
       message:"login success"
     } 
   - captcha
     - {
         error:["Get CAPTCHA error", "Set cookie error"],
         CAPTCHA:{{base64 image}},
         cookie:{{就是Cookie}}
     }
 - /*other function (待開發)*/
