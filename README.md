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
   - getGrade
     - {
       error:["cookie is not define", "Useless request", "connect server error"]
       status:serverResponseStatus,
       grade:{
         0:[{type:"必修"||"選修", credit:int, score:int}]
         1:[{type:"必修"||"選修", credit:int, score:int}]
         total:[int]
         subject:"科目"
       }
     }
 - /*other function (待開發)*/
