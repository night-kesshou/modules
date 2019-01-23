# modules
API:
 - login
   - main
     ```
     {
       error:{{登入失敗資訊}},
       message:"login success"
     }
     ```
   - captcha
     ```
      {
        error:["Get CAPTCHA error", "Set cookie error"],
        CAPTCHA:{{base64 image}},
        cookie:{{就是Cookie}}
      }
     ```
   - query
     - grade:
      ```
      {
        error:["cookie is not define", "Useless request", "connect server error"]
        status:serverResponseStatus,
        grade:{
          0:[{type:"必修"||"選修", credit:int, score:int}]
          1:[{type:"必修"||"選修", credit:int, score:int}]
          total:[int]
          subject:"科目"
        }
      }
      ```
     - performance
       ```
       {
         error:['目標伺服器錯誤', ...],
         data:STRING,
         buffer:buffer object
         result:{
           genre,
           occur,
           approve,
           cause,
           method,
           offset
         }
       }
 - /*other function (待開發)*/
